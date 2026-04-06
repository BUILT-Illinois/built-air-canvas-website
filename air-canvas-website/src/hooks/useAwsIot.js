import { useState, useEffect, useRef, useCallback } from 'react';
// Use the pre-bundled browser build to avoid CRA/webpack-5 Node.js polyfill errors
// eslint-disable-next-line import/no-unresolved
import mqtt from 'mqtt/dist/mqtt.min.js';
import {
  CognitoIdentityClient,
  GetIdCommand,
  GetCredentialsForIdentityCommand,
} from '@aws-sdk/client-cognito-identity';
import { IoTClient, AttachPolicyCommand } from '@aws-sdk/client-iot';

// ---------------------------------------------------------------------------
// SigV4 helpers (browser-native Web Crypto — no AWS SDK needed)
// ---------------------------------------------------------------------------

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sha256(message) {
  const data = typeof message === 'string' ? new TextEncoder().encode(message) : message;
  return crypto.subtle.digest('SHA-256', data);
}

async function hmacSha256(key, message) {
  const keyData = key instanceof ArrayBuffer ? key : new TextEncoder().encode(key);
  const msgData = typeof message === 'string' ? new TextEncoder().encode(message) : message;
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return crypto.subtle.sign('HMAC', cryptoKey, msgData);
}

async function getSigningKey(secretKey, dateStamp, region, service) {
  const kDate    = await hmacSha256('AWS4' + secretKey, dateStamp);
  const kRegion  = await hmacSha256(kDate, region);
  const kService = await hmacSha256(kRegion, service);
  return hmacSha256(kService, 'aws4_request');
}

// Builds a SigV4-signed wss:// URL for AWS IoT Core MQTT over WebSockets.
export async function createSignedUrl({ endpoint, region, accessKeyId, secretAccessKey, sessionToken }) {
  const now = new Date();
  // e.g. "20240101T120000Z"
  const amzDate   = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8); // "20240101"

  const service        = 'iotdevicegateway';
  const algorithm      = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  // For AWS IoT WebSocket, X-Amz-Security-Token must NOT be included in the
  // canonical query string used for signing — it is appended to the final URL
  // after the signature. Including it in the signing params causes a 403.
  const params = [
    ['X-Amz-Algorithm',    algorithm],
    ['X-Amz-Credential',   `${accessKeyId}/${credentialScope}`],
    ['X-Amz-Date',         amzDate],
    ['X-Amz-Expires',      '86400'],
    ['X-Amz-SignedHeaders', 'host'],
  ].sort((a, b) => a[0].localeCompare(b[0]));

  // encodeURIComponent encodes '/' → '%2F', which is required for the Credential value
  const canonicalQueryString = params
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const canonicalHeaders = `host:${endpoint}\n`;
  // SHA-256 of empty string (GET request has no body)
  const emptyHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const canonicalRequest = [
    'GET',
    '/mqtt',
    canonicalQueryString,
    canonicalHeaders,
    'host',
    emptyHash,
  ].join('\n');

  const canonicalRequestHash = toHex(await sha256(canonicalRequest));

  const stringToSign = [
    algorithm,
    amzDate,
    credentialScope,
    canonicalRequestHash,
  ].join('\n');

  const signingKey = await getSigningKey(secretAccessKey, dateStamp, region, service);
  const signature  = toHex(await hmacSha256(signingKey, stringToSign));

  let url = `wss://${endpoint}/mqtt?${canonicalQueryString}&X-Amz-Signature=${signature}`;
  if (sessionToken) {
    url += `&X-Amz-Security-Token=${encodeURIComponent(sessionToken)}`;
  }
  return url;
}

// ---------------------------------------------------------------------------
// React hook
// ---------------------------------------------------------------------------

const IOT_ENDPOINT      = process.env.REACT_APP_AWS_IOT_ENDPOINT;
const AWS_REGION        = process.env.REACT_APP_AWS_REGION;
const IDENTITY_POOL_ID  = process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID;
const IOT_POLICY_NAME   = process.env.REACT_APP_AWS_IOT_POLICY_NAME;

// Gets a Cognito identity ID + short-lived credentials.
// Returns identityId so we can attach the IoT policy to this specific identity.
async function getTempCredentials() {
  const client = new CognitoIdentityClient({ region: AWS_REGION });

  const { IdentityId } = await client.send(
    new GetIdCommand({ IdentityPoolId: IDENTITY_POOL_ID })
  );

  const { Credentials } = await client.send(
    new GetCredentialsForIdentityCommand({ IdentityId })
  );

  return {
    identityId:      IdentityId,
    accessKeyId:     Credentials.AccessKeyId,
    secretAccessKey: Credentials.SecretKey,
    sessionToken:    Credentials.SessionToken,
  };
}

/**
 * useAwsIot — connects to AWS IoT Core over MQTT/WebSocket with manual SigV4 signing.
 *
 * @param {string[]} topics  MQTT topics to subscribe to on connect
 * @returns {{ isConnected, messages, error, publish }}
 *   messages: Record<topic, lastParsedPayload>
 */
export function useAwsIot(topics = []) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages]       = useState({});
  const [error, setError]             = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!IOT_ENDPOINT || !IDENTITY_POOL_ID) {
      setError('AWS IoT env vars not configured. See .env.example.');
      return;
    }

    let client;
    let cancelled = false;

    async function connect() {
      try {
        console.log('[IoT] step 1: fetching Cognito credentials…');
        const { identityId, accessKeyId, secretAccessKey, sessionToken } = await getTempCredentials();
        console.log('[IoT] step 1 ok — identityId:', identityId, '| keyId prefix:', accessKeyId?.slice(0, 4));

        // Attach the IoT Core policy to this Cognito identity.
        // IoT Core requires its own policy in addition to the IAM role policy.
        // This call is idempotent — safe to run on every connection.
        console.log('[IoT] step 2: attaching IoT policy', IOT_POLICY_NAME, 'to', identityId);
        const iotClient = new IoTClient({
          region: AWS_REGION,
          credentials: { accessKeyId, secretAccessKey, sessionToken },
        });
        await iotClient.send(new AttachPolicyCommand({
          policyName: IOT_POLICY_NAME,
          target:     identityId,
        }));
        console.log('[IoT] step 2 ok — policy attached');

        console.log('[IoT] step 3: building signed URL for', IOT_ENDPOINT);
        const url = await createSignedUrl({
          endpoint:        IOT_ENDPOINT,
          region:          AWS_REGION,
          accessKeyId,
          secretAccessKey,
          sessionToken,
        });
        console.log('[IoT] step 3 ok — url prefix:', url.slice(0, 80));

        if (cancelled) return;

        console.log('[IoT] step 4: connecting via mqtt…');
        client = mqtt.connect(url, {
          clientId:        `air-canvas-${Math.random().toString(16).slice(2, 10)}`,
          reconnectPeriod: 5000,
          keepalive:       30,
        });

        clientRef.current = client;

        client.on('connect', () => {
          setIsConnected(true);
          setError(null);
          topics.forEach(t => client.subscribe(t, err => {
            if (err) console.warn(`[IoT] subscribe error on "${t}":`, err);
          }));
        });

        client.on('message', (topic, payload) => {
          let parsed;
          try   { parsed = JSON.parse(payload.toString()); }
          catch { parsed = payload.toString(); }
          setMessages(prev => ({ ...prev, [topic]: parsed }));
        });

        client.on('error', err => {
          setError(err.message);
          setIsConnected(false);
        });

        client.on('close', () => setIsConnected(false));
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }

    connect();

    return () => {
      cancelled = true;
      if (client) client.end(true);
      clientRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publish = useCallback((topic, payload) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish(topic, JSON.stringify(payload));
    }
  }, []);

  return { isConnected, messages, error, publish };
}

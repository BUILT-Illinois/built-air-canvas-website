import { useState, useEffect } from 'react';
import { useAwsIot } from '../hooks/useAwsIot';
import '../assets/Data.css';

const REQUESTS_TOPIC = 'air-canvas/requests';
const DATA_TOPICS = ['air-canvas/data/#', REQUESTS_TOPIC];
const MAX_REQUEST_LOG = 5;

// Component to display a single data value in a large, readable format
function DataDisplay({ label, value, unit = '' }) {
  return (
    <div className="data-display">
      <div className="data-label">{label}</div>
      <div className="data-value">
        {typeof value === 'number' ? value.toFixed(2) : value ?? '--'}
        {unit && <span className="data-unit">{unit}</span>}
      </div>
    </div>
  );
}

// Component to display vector data (x, y, z)
function VectorDisplay({ label, vector, description }) {
  return (
    <div className="vector-display">
      <h2 className="vector-label">{label}</h2>
      {description && <p className="vector-description">{description}</p>}
      <div className="vector-grid">
        <DataDisplay label="X" value={vector?.x} />
        <DataDisplay label="Y" value={vector?.y} />
        <DataDisplay label="Z" value={vector?.z} />
      </div>
    </div>
  );
}

// Component to display quaternion data (w, x, y, z)
function QuaternionDisplay({ label, quat, description }) {
  return (
    <div className="quaternion-display">
      <h2 className="quaternion-label">{label}</h2>
      {description && <p className="quaternion-description">{description}</p>}
      <div className="quaternion-grid">
        <DataDisplay label="W" value={quat?.w} />
        <DataDisplay label="X" value={quat?.x} />
        <DataDisplay label="Y" value={quat?.y} />
        <DataDisplay label="Z" value={quat?.z} />
      </div>
    </div>
  );
}

export default function Data() {
  const { isConnected, messages, error } = useAwsIot(DATA_TOPICS);
  const [requestLog, setRequestLog] = useState([]);

  useEffect(() => {
    const msg = messages[REQUESTS_TOPIC];
    if (!msg) return;
    setRequestLog(prev => {
      const entry = { ...msg, timestamp: new Date().toLocaleString() };
      const next = [entry, ...prev];
      return next.slice(0, MAX_REQUEST_LOG);
    });
  }, [messages[REQUESTS_TOPIC]]);

  const statusLabel = error
    ? 'Error'
    : isConnected
      ? 'Connected'
      : 'Connecting\u2026';

  const statusClass = error
    ? 'disconnected'
    : isConnected
      ? 'connected'
      : 'connecting';

  // Extract data from messages
  const cvData = messages['air-canvas/data/cv'];
  const wandRawData = messages['air-canvas/data/wand'] || messages['wand'] || null;
  const handData = messages['air-canvas/data/hand'] || messages['hand'] || null;

  // For debugging - get all message data
  const allTopics = Object.keys(messages);

  // Process CV landmarks data (hand tracking) - extract index finger only
  let indexFingerLandmarks = null;
  if (cvData && cvData.data && cvData.data.landmarks && Array.isArray(cvData.data.landmarks)) {
    const landmarks = cvData.data.landmarks;
    if (landmarks.length >= 9) {
      indexFingerLandmarks = {
        mcp: landmarks[5],
        pip: landmarks[6],
        dip: landmarks[7],
        tip: landmarks[8]
      };
    }
  }

  // Process wand data
  let wandData = null;
  if (wandRawData && wandRawData.data) {
    wandData = wandRawData.data;
  }

  return (
    <div className="data-container">
      <h1>Live Device Data</h1>

      <div className={`iot-status ${statusClass}`}>
        <span className="status-dot" />
        AWS IoT Core &mdash; {statusLabel}
      </div>

      {error && (
        <div className="iot-error">
          <strong>Connection error:</strong> {error}
        </div>
      )}

      <h2 className="section-title request-log-title">Recent Brush Requests</h2>
      {requestLog.length > 0 ? (
        <div className="request-log-list">
          {requestLog.map((entry, i) => (
            <div key={i} className="request-card">
              <h3 className="request-card-time">{entry.timestamp}</h3>
              <pre className="request-card-pre">{JSON.stringify({ color: entry.color, brushSize: entry.brushSize }, null, 2)}</pre>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data" style={{ padding: '1rem' }}>
          {isConnected ? 'Waiting for brush requests\u2026' : 'Not connected'}
        </p>
      )}

      {(indexFingerLandmarks || wandData || handData) ? (
        <div className="data-grid">
          {indexFingerLandmarks && (
            <div className="device-section hand-section">
              <h2 className="section-title">Hand Tracking Data</h2>
              <div className="data-content">
                <VectorDisplay
                  label="Fingertip"
                  vector={indexFingerLandmarks.tip}
                  description="The tip of the index finger"
                />
                <VectorDisplay
                  label="DIP Joint"
                  vector={indexFingerLandmarks.dip}
                  description="Distal interphalangeal joint (closest to tip)"
                />
                <VectorDisplay
                  label="PIP Joint"
                  vector={indexFingerLandmarks.pip}
                  description="Proximal interphalangeal joint (middle)"
                />
                <VectorDisplay
                  label="MCP Joint"
                  vector={indexFingerLandmarks.mcp}
                  description="Metacarpophalangeal joint (knuckle/base)"
                />
              </div>
            </div>
          )}

          {wandData && (
            <div className="device-section wand-section">
              <h2 className="section-title">Wand Data</h2>
              <div className="data-content">
                {wandData.tip && wandData.tip.quaternion && (
                  <QuaternionDisplay
                    label="Tip Orientation"
                    quat={wandData.tip.quaternion}
                    description="Orientation of the wand tip sensor"
                  />
                )}
                {wandData.base && wandData.base.quaternion && (
                  <QuaternionDisplay
                    label="Base Orientation"
                    quat={wandData.base.quaternion}
                    description="Orientation of the wand base sensor"
                  />
                )}
              </div>
            </div>
          )}

          {handData && (
            <div className="device-section hand-section">
              <h2 className="section-title">Hand Tracking</h2>
              <div className="data-content">
                {handData.position && <VectorDisplay label="Position" vector={handData.position} />}
                {handData.rotation && <QuaternionDisplay label="Rotation" quat={handData.rotation} />}
                {handData.velocity && <VectorDisplay label="Velocity" vector={handData.velocity} />}
                {handData.gesture && (
                  <div className="gesture-display">
                    <DataDisplay label="Gesture" value={handData.gesture} />
                  </div>
                )}
                {handData.confidence !== undefined && (
                  <div className="confidence-display">
                    <DataDisplay label="Confidence" value={handData.confidence} unit="%" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        !error && (
          allTopics.filter(t => t !== REQUESTS_TOPIC).length > 0 ? (
            <div className="no-specific-data">
              <p>Receiving data but format not recognized</p>
              <div className="raw-topics">
                <h3>Active topics ({allTopics.length}):</h3>
                <ul>
                  {allTopics.map(topic => (
                    <li key={topic}>
                      <strong>{topic}</strong>
                      <pre style={{fontSize: '0.75rem', marginTop: '0.5rem'}}>
                        {JSON.stringify(messages[topic], null, 2)}
                      </pre>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="no-data">
              {isConnected
                ? 'Connected \u2014 waiting for messages\u2026'
                : 'Establishing secure WebSocket connection to AWS IoT Core\u2026'}
            </p>
          )
        )
      )}

      {error && (
        <div className="config-note">
          Add the following to a <code>.env</code> file in the project root:
          <br /><br />
          <code>REACT_APP_AWS_IOT_ENDPOINT=xxxxx-ats.iot.us-east-1.amazonaws.com</code><br />
          <code>REACT_APP_AWS_REGION=us-east-1</code><br />
          <code>REACT_APP_COGNITO_IDENTITY_POOL_ID=us-east-1:xxxx-...</code><br />
          <code>REACT_APP_AWS_IOT_TOPICS=air-canvas/data</code>
        </div>
      )}
    </div>
  );
}

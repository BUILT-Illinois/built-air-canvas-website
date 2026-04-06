import { useAwsIot } from '../hooks/useAwsIot';
import '../assets/Data.css';

// Topics your air-canvas device publishes to.
// Override with REACT_APP_AWS_IOT_TOPICS (comma-separated) in your .env file.
let topics = ["air-canvas/data"]

export default function Data() {
  const { isConnected, messages, error } = useAwsIot(topics);

  const statusLabel = error
    ? 'Error'
    : isConnected
      ? 'Connected'
      : 'Connecting…';

  const statusClass = error
    ? 'disconnected'
    : isConnected
      ? 'connected'
      : 'connecting';

  const hasMessages = Object.keys(messages).length > 0;

  return (
    <div className="data-container">
      <h1>Live Device Data</h1>

      <div className={`iot-status ${statusClass}`}>
        <span className="status-dot" />
        AWS IoT Core — {statusLabel}
      </div>

      {error && (
        <div className="iot-error">
          <strong>Connection error:</strong> {error}
        </div>
      )}

      {hasMessages ? (
        <div className="topic-grid">
          {Object.entries(messages).map(([topic, payload]) => (
            <div key={topic} className="topic-card">
              <h3>{topic}</h3>
              <pre>{JSON.stringify(payload, null, 2)}</pre>
            </div>
          ))}
        </div>
      ) : (
        !error && (
          <p className="no-data">
            {isConnected
              ? 'Connected — waiting for messages…'
              : 'Establishing secure WebSocket connection to AWS IoT Core…'}
          </p>
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

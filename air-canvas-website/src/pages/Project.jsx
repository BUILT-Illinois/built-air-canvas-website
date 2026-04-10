import "../assets/Project.css";

export default function Project() {
  return (
    <div className="project-container">
      <h1 className="project-title">How It Works</h1>
      <p className="project-subtitle">
        Air Canvas is an interactive drawing system that combines hand tracking
        and an IMU wand to let you draw in the air on a shared canvas.
      </p>

      <div className="project-section">
        <h2>Gestures</h2>
        <div className="gesture-cards">
          <div className="gesture-card draw-card">
            <div className="gesture-icon">&#9757;</div>
            <h3>Draw</h3>
            <p>Point your index finger straight up to draw on the canvas. Move your hand to create strokes.</p>
          </div>
          <div className="gesture-card clear-card">
            <div className="gesture-icon">&#9995;</div>
            <h3>Clear</h3>
            <p>Show an open palm to clear the entire canvas and start fresh.</p>
          </div>
          <div className="gesture-card thickness-card">
            <div className="gesture-icon">&#128077;</div>
            <h3>Adjust Thickness</h3>
            <p>Thumbs up increases line thickness. Thumbs down decreases it.</p>
          </div>
          <div className="gesture-card save-card">
            <div className="gesture-icon">&#129311;</div>
            <h3>Save Drawing</h3>
            <p>Make the "I Love You" sign to save your drawing as a PNG.</p>
          </div>
          <div className="gesture-card stop-card">
            <div className="gesture-icon">&#9994;</div>
            <h3>Stop Drawing</h3>
            <p>Make a closed fist to stop drawing without clearing the canvas.</p>
          </div>
        </div>
      </div>

      <div className="project-section">
        <h2>System Architecture</h2>
        <div className="arch-flow">
          <div className="arch-card">
            <h3>Hand Tracking</h3>
            <p>MediaPipe webcam processes up to 6 hands with gesture recognition and finger tracking.</p>
          </div>
          <div className="arch-arrow">&#8595;</div>
          <div className="arch-card">
            <h3>IMU Wand</h3>
            <p>Dual BNO085 sensors on a Disney-style ESP32 wand fuse quaternion data for pressure-sensitive drawing.</p>
          </div>
          <div className="arch-arrow">&#8595;</div>
          <div className="arch-card highlight-card">
            <h3>AWS IoT Core</h3>
            <p>MQTT broker connects all devices in real time. Hand data, wand data, and brush requests flow through dedicated topics.</p>
          </div>
          <div className="arch-arrow">&#8595;</div>
          <div className="arch-card">
            <h3>Combined Viewer</h3>
            <p>OpenCV unifies both inputs onto a single canvas with a green hand cursor and cyan wand crosshair.</p>
          </div>
        </div>
      </div>

      <div className="project-section">
        <h2>Web Controls</h2>
        <p className="section-desc">
          Visitors can use this website to change the brush color and size in real time.
          Selections are published over MQTT to the <code>air-canvas/requests</code> topic
          and picked up instantly by the drawing system.
        </p>
      </div>

      <div className="project-section">
        <h2>IMU Wand</h2>
        <p className="section-desc">
          The wand uses two BNO085 inertial sensors — one at the tip and one at the base.
          Tilting the wand controls cursor position (yaw for X, pitch for Y) and rolling it
          controls drawing pressure. The system auto-calibrates on startup — just hold the
          wand still for 2 seconds.
        </p>
      </div>

      <div className="project-section">
        <h2>Data Flow</h2>
        <div className="data-flow-cards">
          <div className="data-flow-card">
            <h3>Hand &rarr; Cloud</h3>
            <p>Landmarks, color, and drawing state are published as JSON to AWS IoT Core from the webcam system.</p>
          </div>
          <div className="data-flow-card">
            <h3>Wand &rarr; Cloud</h3>
            <p>Quaternion orientation and sample count are published from the Raspberry Pi controlling the wand sensors.</p>
          </div>
          <div className="data-flow-card">
            <h3>Web &rarr; Cloud</h3>
            <p>Color and brush size requests are published from this website so visitors can control the canvas remotely.</p>
          </div>
        </div>
      </div>

      <div className="project-footer">
        Built by <strong>BUILT @ Illinois</strong> for EOH 2026
      </div>
    </div>
  );
}

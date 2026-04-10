import "../assets/Home.css";
import { useState } from "react";
import { useAwsIot } from "../hooks/useAwsIot";

const REQUESTS_TOPIC = "air-canvas/requests";

export default function Home() {
    const [selectedColor, setSelectedColor] = useState("black");
    const [brushSize, setBrushSize] = useState("medium");
    const { publish, isConnected, error } = useAwsIot();

    function handleColorChange(color) {
        setSelectedColor(color);
        publish(REQUESTS_TOPIC, { color, brushSize });
    }

    function handleBrushSizeChange(size) {
        setBrushSize(size);
        publish(REQUESTS_TOPIC, { color: selectedColor, brushSize: size });
    }

    return (
        <div className="home-container">
            <div className="canvas-area">
                <div className="toolbar">
                    <div className="palette-section">
                        <button
                            className={`color-btn black ${selectedColor === "black" ? "selected" : ""}`}
                            onClick={() => handleColorChange("black")}
                        ></button>
                        <button
                            className={`color-btn blue ${selectedColor === "blue" ? "selected" : ""}`}
                            onClick={() => handleColorChange("blue")}
                        ></button>
                        <button
                            className={`color-btn orange ${selectedColor === "orange" ? "selected" : ""}`}
                            onClick={() => handleColorChange("orange")}
                        ></button>
                        <button
                            className={`color-btn yellow ${selectedColor === "yellow" ? "selected" : ""}`}
                            onClick={() => handleColorChange("yellow")}
                        ></button>
                        <button
                            className={`color-btn lime ${selectedColor === "lime" ? "selected" : ""}`}
                            onClick={() => handleColorChange("lime")}
                        ></button>
                        <button
                            className={`color-btn green ${selectedColor === "green" ? "selected" : ""}`}
                            onClick={() => handleColorChange("green")}
                        ></button>
                    </div>

                    <div className="divider"></div>

                    <div className={`iot-status-mini ${error ? 'disconnected' : isConnected ? 'connected' : 'connecting'}`}>
                        <span className="status-dot" />
                        {error ? 'Error' : isConnected ? 'Connected' : 'Connecting…'}
                    </div>

                    <div className="divider"></div>

                    <div className="brush-section">
                        <button
                            className={`brush-btn ${brushSize === "small" ? "selected" : ""}`}
                            onClick={() => handleBrushSizeChange("small")}
                        >
                            <span className="brush-dot small-dot"></span>
                        </button>

                        <button
                            className={`brush-btn ${brushSize === "medium" ? "selected" : ""}`}
                            onClick={() => handleBrushSizeChange("medium")}
                        >
                            <span className="brush-dot medium-dot"></span>
                        </button>

                        <button
                            className={`brush-btn ${brushSize === "large" ? "selected" : ""}`}
                            onClick={() => handleBrushSizeChange("large")}
                        >
                            <span className="brush-dot large-dot"></span>
                        </button>
                    </div>
                </div>

                <div className="video-wrapper">
                    <iframe
                        src="https://www.youtube.com/embed/live_stream?channel=UCxR33y687Sj8Lx6M2nAg8Lw"
                        title="Air Canvas Livestream"
                        style={{ border: 0 }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
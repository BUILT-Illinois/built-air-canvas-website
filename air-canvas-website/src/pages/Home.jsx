import "../assets/Home.css";
import { useState } from "react";
import { useAwsIot } from "../hooks/useAwsIot";

const REQUESTS_TOPIC = "air-canvas/requests";

const COLORS = [
    "red",
    "green",
    "blue",
    "yellow",
    "magenta",
    "cyan",
    "black",
    "orange",
    "lime",
];

const BRUSH_SIZES = ["small", "medium", "large"];

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
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                className={`color-btn ${color} ${selectedColor === color ? "selected" : ""}`}
                                onClick={() => handleColorChange(color)}
                                aria-label={`Select ${color}`}
                                title={color}
                            />
                        ))}
                    </div>

                    <div className="divider"></div>

                    <div className={`iot-status-mini ${error ? "disconnected" : isConnected ? "connected" : "connecting"}`}>
                        <span className="status-dot" />
                        {error ? "Error" : isConnected ? "Connected" : "Connecting..."}
                    </div>

                    <div className="divider"></div>

                    <div className="brush-section">
                        {BRUSH_SIZES.map((size) => (
                            <button
                                key={size}
                                className={`brush-btn ${brushSize === size ? "selected" : ""}`}
                                onClick={() => handleBrushSizeChange(size)}
                                aria-label={`Select ${size} brush`}
                                title={size}
                            >
                                <span
                                    className={`brush-dot ${
                                        size === "small"
                                            ? "small-dot"
                                            : size === "medium"
                                            ? "medium-dot"
                                            : "large-dot"
                                    }`}
                                ></span>
                            </button>
                        ))}
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
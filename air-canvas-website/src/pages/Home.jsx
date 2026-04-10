import "../assets/Home.css";
import { useState } from "react";

export default function Home() {
    const [selectedColor, setSelectedColor] = useState("black");
    const [brushSize, setBrushSize] = useState("medium");

    return (
        <div className="home-container">
            <div className="canvas-area">
                <div className="toolbar">
                    <div className="palette-section">
                        <button
                            className={`color-btn black ${selectedColor === "black" ? "selected" : ""}`}
                            onClick={() => setSelectedColor("black")}
                        ></button>
                        <button
                            className={`color-btn blue ${selectedColor === "blue" ? "selected" : ""}`}
                            onClick={() => setSelectedColor("blue")}
                        ></button>
                        <button
                            className={`color-btn orange ${selectedColor === "orange" ? "selected" : ""}`}
                            onClick={() => setSelectedColor("orange")}
                        ></button>
                        <button
                            className={`color-btn yellow ${selectedColor === "yellow" ? "selected" : ""}`}
                            onClick={() => setSelectedColor("yellow")}
                        ></button>
                        <button
                            className={`color-btn lime ${selectedColor === "lime" ? "selected" : ""}`}
                            onClick={() => setSelectedColor("lime")}
                        ></button>
                        <button
                            className={`color-btn green ${selectedColor === "green" ? "selected" : ""}`}
                            onClick={() => setSelectedColor("green")}
                        ></button>
                    </div>

                    <div className="divider"></div>

                    <div className="brush-section">
                        <button
                            className={`brush-btn ${brushSize === "small" ? "selected" : ""}`}
                            onClick={() => setBrushSize("small")}
                        >
                            <span className="brush-dot small-dot"></span>
                        </button>

                        <button
                            className={`brush-btn ${brushSize === "medium" ? "selected" : ""}`}
                            onClick={() => setBrushSize("medium")}
                        >
                            <span className="brush-dot medium-dot"></span>
                        </button>

                        <button
                            className={`brush-btn ${brushSize === "large" ? "selected" : ""}`}
                            onClick={() => setBrushSize("large")}
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
import "../assets/Home.css";

export default function Home() {
    return(
        <div className="home-container">
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
    );
}

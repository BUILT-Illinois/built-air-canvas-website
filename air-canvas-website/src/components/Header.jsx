import { useState } from "react";
import "../assets/Header.css";
import { Link } from "react-router";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="container">
        <div className="img-container">
          <Link className="image-link" to="/">
            <img
              className="built-img"
              alt="built logo"
              src="https://built-illinois.org/built-logo.png"
            />
          </Link>
          <h1 className="title">Air Canvas</h1>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`right-container ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <h2 className="header-button">Home</h2>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <h2 className="header-button">About</h2>
          </Link>
          <Link to="/data" onClick={() => setMenuOpen(false)}>
            <h2 className="header-button">Data</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;

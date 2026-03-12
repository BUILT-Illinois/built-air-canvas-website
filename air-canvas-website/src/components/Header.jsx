import "../assets/Header.css";
import { Link, useLocation } from "react-router";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link className="image-link" to="/">
          <img
            className="built-img"
            alt="built logo"
            src="https://built-illinois.org/built-logo.png"
          />
        </Link>
        <h1>Air Canvas</h1>

        <Link to="/about">
          <h2 className="header-button">About</h2>
        </Link>
        <Link to="/data">
          <h2 className="header-button">Data</h2>
        </Link>
      </div>
    </div>
  );
}

export default Header;
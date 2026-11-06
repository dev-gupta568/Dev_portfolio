import React from "react";

function Footer() {
  return (
    <footer className="wrap">
      <div className="footer-row">
        <span>© <span id="year">{new Date().getFullYear()}</span> Dev Gupta. Built with curiosity.</span>
        <div className="footer-links">
          <a href="https://github.com/dev-gupta568" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:gupdev4@gmail.com">Email ↗</a>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

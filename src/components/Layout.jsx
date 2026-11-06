import React from "react";

function BackgroundEffects() {
  return (
    <>
      <div className="background" aria-hidden="true">
        <span className="blob blob-one" />
        <span className="blob blob-two" />
        <span className="blob blob-three" />
        <span className="grid-overlay" />
      </div>
      <canvas id="particles" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor" aria-hidden="true">
        <span className="cursor-dot" />
        <span className="cursor-ring" />
      </div>
      <div className="loader" id="loader" hidden aria-hidden="true">
        <div className="loader-inner">
          <div className="loader-top">
            <span className="loader-count" id="loader-count">0</span>
            <span className="loader-percent">%</span>
          </div>
          <div className="loader-track">
            <div className="loader-bar" id="loader-bar" />
          </div>
          <div className="loader-label">
            <span>Dev Gupta®</span>
            <span>Loading experience</span>
          </div>
        </div>
      </div>
    </>
  );
}

function Navigation() {
  return (
    <header className="nav-shell">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Dev Gupta home">
          <span className="brand-mark">D</span>Dev Gupta<sup>®</sup>
        </a>
        <div className="nav-links" id="nav-links">
          <a href="#home" data-section="home">Home</a>
          <a href="#about" data-section="about">About</a>
          <a href="#work" data-section="work">Work</a>
          <a href="#skills" data-section="skills">Expertise</a>
          <a href="#contact" data-section="contact">Contact</a>
        </div>
        <div className="nav-actions">
          <a className="nav-cta" href="#contact">Let’s talk <span>↗</span></a>
          <button
            className="menu-button"
            type="button"
            aria-label="Open navigation"
            aria-expanded="false"
            aria-controls="nav-links"
          >
            <span>☰</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export { BackgroundEffects, Navigation };

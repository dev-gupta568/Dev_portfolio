import React from "react";

function Hero() {
  return (
    <section className="hero section" id="home" aria-labelledby="hero-title">
      <div className="wrap hero-inner">
        <div className="hero-orbit" aria-hidden="true"><span className="orbit-dot" /></div>
        <div className="hero-tag reveal">
          <span className="tag-spark">✳</span>
          <span id="scramble-tag">FRONTEND DEVELOPER · DELHI NCR</span>
        </div>
        <h1 id="hero-title" aria-label="Ideas made into digital experiences">
          <span className="hero-line"><span className="hero-line-inner">Ideas made</span></span>
          <span className="hero-line gradient"><span className="hero-line-inner">into digital</span></span>
          <span className="hero-line"><span className="hero-line-inner">experiences.</span></span>
        </h1>
        <div className="hero-bottom">
          <div className="reveal">
            <p className="hero-copy">
              I’m Dev — a creative frontend developer turning curious ideas into thoughtful,
              interactive experiences for the web.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <span className="button-arrow">↗</span>
              </a>
              <a className="button secondary" href="#about">
                A little about me <span className="button-arrow">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-note reveal">
            <span className="availability-dot" /> Open to opportunities
          </div>
        </div>
        <span className="hero-index">INDEPENDENT DEVELOPER &nbsp;·&nbsp; 2026</span>
      </div>
      <a className="scroll-cue" href="#about">
        <span>SCROLL TO EXPLORE</span><i>↓</i>
      </a>
    </section>
  );
}

export default Hero;

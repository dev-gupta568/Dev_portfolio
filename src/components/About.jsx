import React from "react";

function About() {
  return (
    <section className="section wrap" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <div>
          <div className="section-heading">
            <span className="eyebrow">A LITTLE ABOUT ME</span>
            <h2 id="about-title">Curiosity is my <em>creative fuel.</em></h2>
          </div>
          <p className="about-copy" id="about-copy">
            I’m a frontend developer who believes the best digital experiences feel effortless,
            thoughtful, and just a little bit unexpected.
          </p>
        </div>
        <div className="about-aside">
          <p>
            From the first sketch to the final interaction, I love bringing ideas to life with
            code, motion, and a thoughtful eye for detail.
          </p>
          <p>
            Currently exploring creative development, interactive design, and the many ways
            technology can make the everyday feel extraordinary.
          </p>
          <a className="text-link" href="https://github.com/dev-gupta568" target="_blank" rel="noreferrer">
            More about my work <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;

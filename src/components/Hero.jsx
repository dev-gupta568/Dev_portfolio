import { ArrowDown, ArrowDownToLine, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { emailHref, profile } from "../data/profile.js";

function Hero() {
  return (
    <section className="hero-section section-pad" id="home" aria-labelledby="hero-title">
      <div className="container hero-layout">
        <div className="hero-content">
          <span className="availability"><span /> OPEN TO ENTRY-LEVEL OPPORTUNITIES</span>
          <h1 id="hero-title">Hi, I'm <span>Dev Gupta</span></h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View My Projects <ArrowRight size={16} /></a>
            <a className="button button-outline" href={profile.resumePath} download>
              Download Resume <ArrowDownToLine size={16} />
            </a>
            <a className="button button-quiet" href="#contact">Contact Me</a>
          </div>
          <div className="social-row" aria-label="Contact and social links">
            <a href={profile.github || "https://github.com/dev-gupta568/HTML-CSS-Javascript-project.git"} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <Github size={17} />
            </a>
            <a href={profile.linkedin || "https://www.linkedin.com/in/dev-gupta-1676bb245"} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <Linkedin size={17} />
            </a>
            <a href={emailHref} aria-label="Email Dev Gupta"><Mail size={17} /></a>
            <span className="social-note">Let’s connect</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Decorative code editor illustration">
          <div className="visual-glow" />
          <div className="code-window">
            <div className="code-window-bar">
              <div className="window-dots"><i /><i /><i /></div>
              <span>dev-gupta.jsx</span>
              <span className="code-status">● online</span>
            </div>
            <div className="code-body" aria-hidden="true">
              <div><span className="line-number">01</span><span className="code-muted">const</span> <span className="code-blue">developer</span> = {"{"}</div>
              <div><span className="line-number">02</span>&nbsp;&nbsp;name: <span className="code-green">"Dev Gupta"</span>,</div>
              <div><span className="line-number">03</span>&nbsp;&nbsp;education: <span className="code-green">"BCA"</span>,</div>
              <div><span className="line-number">04</span>&nbsp;&nbsp;interests: [</div>
              <div><span className="line-number">05</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">"Frontend"</span>,</div>
              <div><span className="line-number">06</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">"Problem Solving"</span>,</div>
              <div><span className="line-number">07</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">"Learning"</span></div>
              <div><span className="line-number">08</span>&nbsp;&nbsp;],</div>
              <div><span className="line-number">09</span>&nbsp;&nbsp;mindset: <span className="code-purple">"curious"</span>,</div>
              <div><span className="line-number">10</span>&nbsp;&nbsp;openToWork: <span className="code-orange">true</span></div>
              <div><span className="line-number">11</span>{"}"};</div>
              <div className="code-cursor"><span className="line-number">12</span><span /></div>
            </div>
            <div className="code-window-footer"><span>JavaScript (ES6+)</span><span>UTF-8&nbsp;&nbsp; LF</span></div>
          </div>
          <div className="floating-card"><span className="floating-icon">{"</>"}</span><div><strong>Building & learning</strong><span>One project at a time</span></div></div>
          <span className="visual-orbit orbit-one" />
          <span className="visual-orbit orbit-two" />
        </div>
      </div>
      <a className="scroll-hint" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
    </section>
  );
}

export default Hero;

import { BookOpen, BriefcaseBusiness, Lightbulb, Sparkles } from "lucide-react";
import { aboutStats } from "../data/profile.js";

const qualities = [
  { icon: BookOpen, title: "BCA foundation", text: "A computing background and a growing interest in how software works." },
  { icon: BriefcaseBusiness, title: "Frontend development", text: "Motivated to build useful, accessible interfaces and practical web applications." },
  { icon: Lightbulb, title: "Practical problem solving", text: "Patient, curious, and ready to break a problem into manageable steps." },
  { icon: Sparkles, title: "Ready to learn", text: "Looking for an opportunity to contribute, learn from a team, and grow." },
];

function About() {
  return (
    <section className="section-pad section-muted" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">ABOUT ME</span>
          <h2 id="about-title">A practical mindset, <span className="text-accent">a curious approach.</span></h2>
          <p>I’m a BCA fresher focused on frontend development and building a career creating useful, responsive web experiences.</p>
        </div>
        <div className="about-grid">
          {qualities.map(({ icon: Icon, title, text }) => (
            <article className="info-card" key={title}>
              <span className="card-icon"><Icon size={19} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="stats-grid" aria-label="Editable portfolio statistics">
          {aboutStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong><span>{stat.label}</span>
            </div>
          ))}
        </div>
        {/* <p className="placeholder-note">Replace bracketed values with your current, verifiable details.</p> */}
      </div>
    </section>
  );
}

export default About;

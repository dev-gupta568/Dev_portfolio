import { ArrowUpRight, CircleDot } from "lucide-react";
import { experienceItems } from "../data/education.js";

function Experience() {
  return (
    <section className="section-pad" id="experience" aria-labelledby="experience-title">
      <div className="container experience-layout">
        <div className="section-heading experience-heading">
          <span className="eyebrow">EXPERIENCE</span>
          <h2 id="experience-title">Starting with <span className="text-accent">the right foundations.</span></h2>
          <p>I’m a fresher, so this section highlights project work, practice, and academic learning—not professional employment.</p>
          <a className="inline-link" href="#contact">Open to entry-level roles <ArrowUpRight size={15} /></a>
        </div>
        <div className="experience-list">
          <div className="experience-label"><CircleDot size={15} /> FRESHER / PROJECT EXPERIENCE</div>
          {experienceItems.map((item) => (
            <article className="experience-item" key={item.title}>
              <span className="timeline-dot" />
              <div><span className="experience-type">{item.type}</span><h3>{item.title}</h3><p>{item.description}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

import { GraduationCap } from "lucide-react";
import { education } from "../data/education.js";

function Education() {
  return (
    <section className="section-pad section-muted" id="education" aria-labelledby="education-title">
      <div className="container education-layout">
        <div className="section-heading">
          <span className="eyebrow">EDUCATION</span>
          <h2 id="education-title">Learning is <span className="text-accent">ongoing.</span></h2>
          <p>My academic background and the foundations behind my interest in technology.</p>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <article className="education-card" key={item.qualification}>
              <span className="education-icon"><GraduationCap size={22} /></span>
              <div className="education-main"><span className="education-year">{item.year}</span><h3>{item.qualification}</h3><p>{item.institution}</p><span className="education-details">{item.details}</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;

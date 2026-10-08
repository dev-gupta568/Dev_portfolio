import { Code2, Computer, Laptop, Wrench } from "lucide-react";
import { skillGroups } from "../data/skills.js";

const icons = [Code2, Laptop, Wrench, Computer];

function Skills() {
  return (
    <section className="section-pad" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">SKILLS & TOOLKIT</span>
          <h2 id="skills-title">Foundations for <span className="text-accent">getting things done.</span></h2>
          <p>A growing, hands-on toolkit across frontend development and programming.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[index];
            return (
              <article className="skill-card" key={group.title}>
                <div className="skill-card-heading"><span className="card-icon"><Icon size={19} /></span><span className="skill-count">{String(group.skills.length).padStart(2, "0")} skills</span></div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul className="skill-badges">
                  {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
        {/* <p className="placeholder-note">Skill lists are editable in <code>src/data/skills.js</code>. Add proficiency levels only when you can confidently support them.</p> */}
      </div>
    </section>
  );
}

export default Skills;

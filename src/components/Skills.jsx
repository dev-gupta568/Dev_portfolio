import React from "react";

const skills = [
  "Creative code",
  "React",
  "Motion design",
  "JavaScript",
  "Three.js",
  "Digital craft",
];

function Skills() {
  const renderSkills = () => skills.map((skill) => (
    <span className="marquee-word" key={skill}>{skill} <i>✳</i></span>
  ));

  return (
    <section className="marquee-section" id="skills" aria-label="Skills and technologies">
      <div className="marquee" id="marquee">
        <div className="marquee-group">{renderSkills()}</div>
        <div className="marquee-group" aria-hidden="true">{renderSkills()}</div>
      </div>
    </section>
  );
}

export default Skills;

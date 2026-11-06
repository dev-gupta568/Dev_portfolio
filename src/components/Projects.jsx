import React from "react";

const projects = [
  {
    title: "Interactive Portfolio",
    description: "A personal corner of the internet, brought to life.",
    variant: "portfolio",
    href: "https://github.com/dev-gupta568",
    label: "Explore portfolio project",
  },
  {
    title: "Expense Tracker",
    description: "A clearer view of everyday spending.",
    variant: "expense",
    href: "#contact",
    label: "Discuss the expense tracker",
  },
  {
    title: "Daily To-do",
    description: "A small, calm space to plan the day.",
    variant: "todo",
    href: "#contact",
    label: "Discuss the to-do project",
  },
  {
    title: "Product Explorer",
    description: "A playful way to discover everyday essentials.",
    variant: "product",
    href: "#contact",
    label: "Discuss the product explorer",
  },
];

function ProjectArtwork({ variant }) {
  const windowClass = {
    portfolio: "art-window",
    expense: "art-window art-window--tilt-right art-window--narrow",
    todo: "art-window art-window--tilt-slight art-window--wide",
    product: "art-window art-window--tilt-right art-window--narrow art-window--tall",
  }[variant];

  return (
    <div className="project-art">
      <span className="project-orb" />
      <span className="art-orbit" />
      <div className={windowClass}>
        <div className="art-window-bar"><i /><i /><i /></div>
        <div className={`art-window-title${variant === "expense" ? " art-window-title--short" : variant === "todo" ? " art-window-title--medium" : ""}`} />
        {variant !== "product" && (
          <div className={`art-window-line${variant === "expense" || variant === "todo" ? " art-window-line--wide" : ""}`} />
        )}
        {variant === "expense" && <div className="art-window-line art-window-line--medium" />}
        {(variant === "portfolio" || variant === "expense") && <div className="art-window-line short" />}
        <div className="art-pills">
          <i /><i />
          {variant !== "expense" && <i />}
        </div>
        {(variant === "todo" || variant === "product") && (
          <div className={`art-window-line${variant === "todo" ? " art-window-line--short" : " short"}`} />
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const external = project.href.startsWith("https://");

  return (
    <article className="project-card">
      <div className="project-card-inner">
        <ProjectArtwork variant={project.variant} />
        <div className="project-info">
          <div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <a
            className="project-arrow"
            href={project.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            aria-label={project.label}
          >
            ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section className="section wrap projects-section" id="work" aria-labelledby="work-title">
      <div className="projects-heading">
        <div className="section-heading">
          <span className="eyebrow">SELECTED PROJECTS · 2024—26</span>
          <h2 id="work-title">Made with <em>intention.</em></h2>
        </div>
        <p>A few experiments and ideas shaped into useful, playful digital experiences.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
      </div>
    </section>
  );
}

export default Projects;

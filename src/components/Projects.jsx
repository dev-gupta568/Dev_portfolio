import { ArrowUpRight, Check, Github, Search, Wallet } from "lucide-react";
import { projects } from "../data/projects.js";
import { profile } from "../data/profile.js";

function ProjectPreview({ type }) {
  if (type === "calculator") {
    return (
      <div className="preview-calculator" aria-hidden="true">
        <div className="calculator-screen">1,248<span>+</span></div>
        <div className="calculator-keys">{["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+"].map((key) => <i key={key}>{key}</i>)}</div>
      </div>
    );
  }

  if (type === "tasks") {
    return (
      <div className="preview-panel preview-tasks" aria-hidden="true">
        <div className="preview-topline"><span>Today’s tasks</span><span>•••</span></div>
        {["Review project notes", "Practice React components", "Plan the week"].map((task, index) => (
          <div className="preview-task" key={task}><span className={index === 0 ? "task-check task-checked" : "task-check"}>{index === 0 && <Check size={10} />}</span><span className={index === 0 ? "task-done" : ""}>{task}</span></div>
        ))}
        <div className="preview-add">＋ Add a task</div>
      </div>
    );
  }

  if (type === "products") {
    return (
      <div className="preview-panel preview-products" aria-hidden="true">
        <div className="preview-topline"><span>Products</span><span className="preview-search"><Search size={11} /> Search</span></div>
        <div className="preview-categories"><i>All</i><i>Tech</i><i>Home</i><i>Accessories</i></div>
        <div className="preview-product-grid">{["#dce6e9", "#e6e1d7", "#dfe5d8"].map((color, index) => <div className="preview-product" key={color}><span style={{ background: color }} /><i>{["Everyday essentials", "Desk companion", "Daily carry"][index]}</i></div>)}</div>
      </div>
    );
  }

  return (
    <div className="preview-panel preview-expenses" aria-hidden="true">
      <div className="preview-topline"><span>Expense overview</span><span>•••</span></div>
      <div className="preview-balance"><span>Total this month</span><strong>₹ —</strong><i>Monthly summary</i></div>
      <div className="preview-chart"><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="preview-expense-row"><span className="expense-dot"><Wallet size={13} /></span><span>Recent expenses</span><span className="expense-rule" /></div>
    </div>
  );
}

function Projects() {
  return (
    <section className="section-pad section-muted" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div><span className="eyebrow">SELECTED PROJECTS</span><h2 id="projects-title">Learning by <span className="text-accent">building.</span></h2></div>
          <p>Practice projects that demonstrate my growing frontend skills and problem-solving approach.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.id}>
              <div className={`project-preview preview-${project.preview}`}>
                <ProjectPreview type={project.preview} />
                <span className="project-number">PROJECT {String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                <ul className="project-tech" aria-label="Technologies">
                  {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="project-links">
                  <a className="button button-outline button-small" href={profile.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a>
                  <a className="button button-primary button-small" href={project.demo} target="_blank" rel="noreferrer">Live Demo <ArrowUpRight size={13} /></a>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* <p className="placeholder-note">Project repository and demo links are editable placeholders. Replace them with your own URLs in <code>src/data/projects.js</code>.</p> */}
      </div>
    </section>
  );
}

export default Projects;

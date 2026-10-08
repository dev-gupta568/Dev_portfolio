import { ArrowDownToLine, Eye, FileText } from "lucide-react";
import { profile } from "../data/profile.js";

function Resume() {
  return (
    <section className="section-pad resume-section" id="resume" aria-labelledby="resume-title">
      <div className="container resume-card">
        <div className="resume-symbol"><FileText size={24} /></div>
        <div className="resume-copy">
          <span className="eyebrow">LET’S WORK TOGETHER</span>
          <h2 id="resume-title">Looking for a motivated fresher who is ready to learn and contribute?</h2>
          <p>Take a look at my resume and get in touch about a suitable entry-level opportunity.</p>
          {/* <span className="resume-note">Add your PDF as <code>public/resume.pdf</code> to activate these links.</span> */}
        </div>
        <div className="resume-actions">
          <a className="button button-primary" href={profile.resumePath} download>Download Resume <ArrowDownToLine size={16} /></a>
          <a className="button button-outline" href={profile.resumePath} target="_blank" rel="noreferrer">View Resume <Eye size={16} /></a>
        </div>
      </div>
    </section>
  );
}

export default Resume;

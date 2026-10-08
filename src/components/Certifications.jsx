import { ArrowUpRight, Award } from "lucide-react";
import { certifications } from "../data/education.js";

function Certifications() {
  const hasCredentials = certifications.some((item) => item.name !== "[Certification Name]");

  return (
    <section className="section-pad" id="certifications" aria-labelledby="certifications-title">
      <div className="container certifications-layout">
        <div className="section-heading">
          <span className="eyebrow">CERTIFICATIONS</span>
          <h2 id="certifications-title">Credentials & <span className="text-accent">learning.</span></h2>
          {/* <p>Only add certifications you have completed and can verify.</p> */}
        </div>
        <div className="certification-list">
          {hasCredentials ? certifications.map((item) => (
            <article className="certification-card" key={`${item.name}-${item.organization}`}>
              <span className="education-icon"><Award size={20} /></span>
              <div><h3>{item.name}</h3><p>{item.organization} <span>·</span> {item.date}</p></div>
              {item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer" aria-label={`View ${item.name} credential`}><ArrowUpRight size={17} /></a>}
            </article>
          )) : (
            <div className="empty-state"><Award size={20} /><p>No certifications added yet.</p><span>Add completed credentials to <code>src/data/education.js</code>.</span></div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Certifications;

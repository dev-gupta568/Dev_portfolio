import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { emailHref, profile } from "../data/profile.js";

const footerLinks = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-about">
            <a className="brand" href="#home"><span className="brand-mark">D</span><span>Dev Gupta<span className="brand-period">.</span></span></a>
            <p>BCA fresher focused on frontend development and building practical web applications.</p>
          </div>
          <div className="footer-navigation">
            <h2>Explore</h2>
            <nav aria-label="Footer navigation">{footerLinks.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav>
          </div>
          <div className="footer-connect">
            <h2>Connect</h2>
            <a href={profile.github || "https://github.com/dev-gupta568/HTML-CSS-Javascript-project.git"} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a>
            <a href={profile.linkedin || "https://www.linkedin.com/in/dev-gupta-1676bb245"} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a>
            <a href={emailHref}><Mail size={16} /> Email</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Dev Gupta. All rights reserved.</span><a href="#home">Back to top ↑</a></div>
      </div>
    </footer>
  );
}

export default Footer;

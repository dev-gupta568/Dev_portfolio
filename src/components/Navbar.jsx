import { useState } from "react";
import { ArrowDownToLine, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "../data/profile.js";

const navigation = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Contact", "contact"],
];

function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container navbar-inner">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Dev Gupta, home">
          <span className="brand-mark">D</span>
          <span>Dev Gupta<span className="brand-period">.</span></span>
        </a>
        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav
          className={`nav-panel ${menuOpen ? "nav-panel-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <div className="nav-links">
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <a className="button button-small button-primary" href={profile.resumePath} download>
              Resume <ArrowDownToLine size={15} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

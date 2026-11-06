import React, { useEffect } from "react";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import { BackgroundEffects, Navigation } from "./components/Layout.jsx";
import { initAnimations } from "./js/animations.js";
import { initContact } from "./js/contact.js";
import { initCursor } from "./js/cursor.js";
import { initNavbar } from "./js/navbar.js";
import { initParticles } from "./js/particles.js";

function App() {
  useEffect(() => {
    initAnimations();
    initNavbar();
    initParticles();
    initCursor();
    initContact();
  }, []);

  return (
    <>
      <BackgroundEffects />
      <div className="page">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;

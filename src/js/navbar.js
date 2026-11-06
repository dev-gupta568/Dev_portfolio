export function initNavbar() {
  const nav = document.querySelector(".nav");
  const links = [...document.querySelectorAll(".nav-links a[data-section]")];
  const menuButton = document.querySelector(".menu-button");
  const menu = document.querySelector("#nav-links");
  const sections = links
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  const setScrolled = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  const closeMenu = () => {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.querySelector("span").textContent = "☰";
  };

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    menu.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    menuButton.querySelector("span").textContent = isOpen ? "×" : "☰";
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  const setActiveLink = () => {
    const candidates = sections.filter((section) => {
      const bounds = section.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    });
    if (!candidates.length) return;
    const referencePoint = window.innerHeight * .08;
    const sectionsAtReference = candidates.filter((section) => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= referencePoint && bounds.bottom > referencePoint;
    });
    const activeSection = sectionsAtReference.length
      ? sectionsAtReference.reduce((latest, section) => (
        section.getBoundingClientRect().top > latest.getBoundingClientRect().top ? section : latest
      ))
      : candidates.reduce((closest, section) => (
        Math.abs(section.getBoundingClientRect().top - referencePoint)
          < Math.abs(closest.getBoundingClientRect().top - referencePoint)
          ? section
          : closest
      ));

    links.forEach((link) => {
      if (link.dataset.section === activeSection.id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      setActiveLink();
    }, { threshold: [0, .01, .1, .25, .5] });

    sections.forEach((section) => activeObserver.observe(section));
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
}

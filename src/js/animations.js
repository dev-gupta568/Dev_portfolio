import anime from "animejs";

export function initAnimations() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loader = document.querySelector("#loader");
  const about = document.querySelector("#about-copy");
  const progress = document.querySelector(".scroll-progress");
  const headlineLines = document.querySelectorAll(".hero-line-inner");

  const revealEverything = () => {
    document.querySelectorAll(".reveal, .project-card, .contact-form").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
    loader.hidden = true;
  };

  if (typeof anime !== "function" || reducedMotion) {
    revealEverything();
    return;
  }

  headlineLines.forEach((line) => {
    const text = line.textContent;
    line.innerHTML = Array.from(text, (character) => (
      `<span class="letter">${character === " " ? "&nbsp;" : character}</span>`
    )).join("");
  });

  const aboutWords = about.textContent.trim().split(/\s+/);
  about.innerHTML = aboutWords.map((word) => `<span class="word">${word} </span>`).join("");
  about.setAttribute("aria-label", aboutWords.join(" "));

  loader.hidden = false;
  const count = { value: 0 };
  anime.timeline({
    complete: () => {
      anime({
        targets: loader,
        translateY: "-100%",
        duration: 850,
        easing: "easeInOutExpo",
        complete: () => { loader.hidden = true; },
      });
    },
  })
    .add({
      targets: count,
      value: 100,
      round: 1,
      duration: 1900,
      easing: "easeInOutExpo",
      update: () => { document.querySelector("#loader-count").textContent = count.value; },
    })
    .add({
      targets: "#loader-bar",
      scaleX: [0, 1],
      duration: 1900,
      easing: "easeInOutExpo",
    }, 0);

  const tag = document.querySelector("#scramble-tag");
  const originalTag = tag.textContent;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·";
  const scramble = { progress: 0 };
  anime({
    targets: scramble,
    progress: [0, originalTag.length],
    round: 1,
    duration: 1050,
    delay: 1950,
    easing: "easeOutQuad",
    update: () => {
      const settled = Math.floor(scramble.progress);
      tag.textContent = Array.from(originalTag, (letter, index) => {
        if (index < settled || letter === " " || letter === "·") return letter;
        return characters[Math.floor(Math.random() * characters.length)];
      }).join("");
    },
    complete: () => { tag.textContent = originalTag; },
  });

  anime.timeline({ delay: 1950, easing: "easeOutExpo" })
    .add({
      targets: ".hero-line .letter",
      opacity: [0, 1],
      translateY: ["120%", 0],
      rotate: [10, 0],
      delay: anime.stagger(30),
      duration: 1050,
    })
    .add({
      targets: ".hero-tag",
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 700,
    }, 80)
    .add({
      targets: ".hero-bottom .reveal, .nav",
      opacity: [0, 1],
      translateY: [22, 0],
      delay: anime.stagger(100),
      duration: 800,
    }, 420);

  anime({
    targets: ".blob",
    keyframes: [
      { translateX: () => anime.random(-55, 55), translateY: () => anime.random(-45, 45), scale: () => anime.random(.9, 1.12) },
      { translateX: () => anime.random(-70, 70), translateY: () => anime.random(-60, 60), scale: () => anime.random(.92, 1.16) },
    ],
    duration: () => anime.random(9000, 14000),
    direction: "alternate",
    easing: "easeInOutSine",
    loop: true,
    delay: anime.stagger(550),
  });

  anime({
    targets: ".hero-line.gradient .hero-line-inner",
    backgroundPosition: ["0% 50%", "100% 50%"],
    duration: 6500,
    easing: "linear",
    direction: "alternate",
    loop: true,
    delay: 2800,
  });

  const projectCards = document.querySelectorAll(".project-card");
  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        anime({
          targets: entry.target.querySelector(".project-card-inner"),
          opacity: [0, 1],
          translateY: [90, 0],
          scale: [.94, 1],
          duration: 950,
          easing: "easeOutExpo",
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    projectCards.forEach((card) => projectObserver.observe(card));
  }

  projectCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
      card.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    });
  });

  anime({
    targets: "#marquee",
    translateX: ["0%", "-50%"],
    duration: 28000,
    easing: "linear",
    loop: true,
  });

  if ("IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        anime({
          targets: about.querySelectorAll(".word"),
          opacity: [.18, 1],
          delay: anime.stagger(36),
          duration: 600,
          easing: "easeOutQuad",
        });
        observer.unobserve(about);
      });
    }, { threshold: .35 });
    aboutObserver.observe(about);
  } else {
    about.querySelectorAll(".word").forEach((word) => { word.style.opacity = "1"; });
  }

  const updateScrollProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    progress.style.transform = `scaleX(${Math.min(1, Math.max(0, fraction))})`;
  };
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();
}

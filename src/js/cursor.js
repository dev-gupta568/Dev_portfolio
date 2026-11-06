import anime from "animejs";

export function initCursor() {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const magnetic = document.querySelector(".send-button");
  if (!finePointer.matches || reducedMotion.matches || typeof anime !== "function") return;

  document.documentElement.classList.add("has-cursor");
  let pointerX = -100;
  let pointerY = -100;
  let ringX = pointerX;
  let ringY = pointerY;
  let frame = 0;

  const followPointer = () => {
    ringX += (pointerX - ringX) * .17;
    ringY += (pointerY - ringY) * .17;
    ring.style.setProperty("--cx", `${ringX}px`);
    ring.style.setProperty("--cy", `${ringY}px`);
    if (Math.abs(pointerX - ringX) + Math.abs(pointerY - ringY) > .2) {
      frame = window.requestAnimationFrame(followPointer);
    } else {
      frame = 0;
    }
  };

  const movePointer = (event) => {
    if (event.pointerType !== "mouse") return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    dot.style.left = `${pointerX}px`;
    dot.style.top = `${pointerY}px`;
    dot.classList.add("visible");
    ring.classList.add("visible");
    if (!frame) frame = window.requestAnimationFrame(followPointer);
  };

  const moveMagneticButton = (event) => {
    if (event.pointerType !== "mouse") return;
    const bounds = magnetic.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    anime.remove(magnetic);
    anime({
      targets: magnetic,
      translateX: offsetX * .4,
      translateY: offsetY * .4,
      duration: 280,
      easing: "easeOutQuad",
    });
  };

  const resetMagneticButton = () => {
    anime.remove(magnetic);
    anime({
      targets: magnetic,
      translateX: 0,
      translateY: 0,
      duration: 1100,
      easing: "easeOutElastic(1, .4)",
    });
  };

  const resetPointer = () => {
    dot.classList.remove("visible");
    ring.classList.remove("visible", "hover");
    if (magnetic) {
      resetMagneticButton();
    }
  };

  const setHoverState = (event, isHovering) => {
    if (event.target.closest("a, button, .project-card")) {
      ring.classList.toggle("hover", isHovering);
    }
  };

  window.addEventListener("pointermove", movePointer, { passive: true });
  window.addEventListener("pointerover", (event) => setHoverState(event, true));
  window.addEventListener("pointerout", (event) => setHoverState(event, false));
  document.documentElement.addEventListener("pointerleave", resetPointer);
  if (magnetic) {
    magnetic.addEventListener("pointermove", moveMagneticButton);
    magnetic.addEventListener("pointerleave", resetMagneticButton);
  }
}

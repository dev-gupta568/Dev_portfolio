function hexToRgb(color) {
  const value = color.trim().replace("#", "");
  const hex = value.length === 3 ? [...value].map((part) => part + part).join("") : value;
  if (!/^[\da-f]{6}$/i.test(hex)) return "90, 61, 255";
  return [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16)).join(", ");
}

export function initParticles() {
  const canvas = document.querySelector("#particles");
  const context = canvas?.getContext("2d");
  if (!canvas || !context) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: -1000, y: -1000, active: false };
  let particles = [];
  let width = 0;
  let height = 0;
  let frame = 0;

  const resize = () => {
    window.cancelAnimationFrame(frame);
    const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .34,
      vy: (Math.random() - .5) * .34,
      radius: Math.random() * 1.2 + .5,
    }));
    draw();
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);
    const styles = getComputedStyle(document.documentElement);
    const accent = hexToRgb(styles.getPropertyValue("--acc"));
    const accentTwo = hexToRgb(styles.getPropertyValue("--acc2"));
    const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 210);
    glow.addColorStop(0, `rgba(${accent}, .14)`);
    glow.addColorStop(1, `rgba(${accent}, 0)`);
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      if (!prefersReducedMotion.matches) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      }

      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 135 && distance > 0) {
          const force = (135 - distance) / 135;
          particle.x += (dx / distance) * force * 2;
          particle.y += (dy / distance) * force * 2;
        }
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${accent}, .5)`;
      context.fill();

      for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
        const next = particles[nextIndex];
        const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
        if (distance >= 115) continue;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(next.x, next.y);
        context.strokeStyle = distance < 65 ? `rgba(${accentTwo}, .2)` : `rgba(${accent}, .16)`;
        context.lineWidth = .65;
        context.stroke();
      }
    });

    if (!prefersReducedMotion.matches) frame = window.requestAnimationFrame(draw);
  };

  const movePointer = (event) => {
    if (prefersReducedMotion.matches) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;
  };
  const leavePointer = () => {
    pointer.x = -1000;
    pointer.y = -1000;
    pointer.active = false;
  };
  const updateMotionPreference = () => {
    window.cancelAnimationFrame(frame);
    draw();
  };

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", movePointer, { passive: true });
  document.documentElement.addEventListener("pointerleave", leavePointer);
  prefersReducedMotion.addEventListener("change", updateMotionPreference);
}

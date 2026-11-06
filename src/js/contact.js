import anime from "animejs";

const API_URL = import.meta.env.VITE_API_URL || "";

export function initContact() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const submitButton = form.querySelector(".send-button");
  const submitLabel = form.querySelector(".send-label");
  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    message: form.elements.message,
  };
  const honeypot = form.elements.website;
  const errors = {
    name: document.querySelector("#name-error"),
    email: document.querySelector("#email-error"),
    message: document.querySelector("#message-error"),
  };
  let sending = false;

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && typeof anime === "function") {
    const formObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [35, 0],
          duration: 850,
          easing: "easeOutExpo",
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    formObserver.observe(form);
  }

  const validate = () => {
    const values = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      message: fields.message.value.trim(),
    };
    const messages = {
      name: values.name.length === 0 ? "Please enter your name." : values.name.length > 100 ? "Name must be 100 characters or fewer." : "",
      email: values.email.length === 0 ? "Please enter your email address." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? "Enter a valid email address." : values.email.length > 255 ? "Email must be 255 characters or fewer." : "",
      message: values.message.length < 10 ? "Message must be at least 10 characters." : values.message.length > 2000 ? "Message must be 2,000 characters or fewer." : "",
    };

    Object.keys(fields).forEach((key) => {
      errors[key].textContent = messages[key];
      fields[key].setAttribute("aria-invalid", String(Boolean(messages[key])));
    });

    return { valid: Object.values(messages).every((message) => !message), values };
  };

  Object.entries(fields).forEach(([key, field]) => {
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validate();
      status.textContent = "";
      status.removeAttribute("data-state");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;

    const isBot = Boolean(honeypot.value.trim());
    const result = validate();
    if (!isBot && !result.valid) {
      fields[Object.keys(fields).find((key) => errors[key].textContent)].focus();
      return;
    }

    sending = true;
    submitButton.disabled = true;
    submitLabel.textContent = "Sending…";
    status.textContent = "";
    status.removeAttribute("data-state");

    try {
      let response;
      try {
        response = await fetch(`${API_URL.replace(/\/$/, "")}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: result.values.name,
            email: result.values.email,
            message: result.values.message,
            website: honeypot.value,
          }),
        });
      } catch {
        throw new Error("Could not reach the contact service. Please try again later.");
      }

      let payload;
      try {
        payload = await response.json();
      } catch {
        if (response.status >= 500) {
          throw new Error("The contact service is unavailable right now. Please try again later.");
        }
        throw new Error("The server returned an invalid response.");
      }

      if (!response.ok || !payload.ok) {
        if (response.status === 429) throw new Error("You’ve sent several messages recently. Please try again in 15 minutes.");
        throw new Error(payload.error || "Your message couldn’t be sent. Please try again.");
      }

      form.reset();
      Object.entries(errors).forEach(([key, error]) => {
        error.textContent = "";
        fields[key].removeAttribute("aria-invalid");
      });
      status.textContent = "Thanks for reaching out! Your message has been sent.";
      status.dataset.state = "success";
    } catch (error) {
      console.error("Contact form submission failed.", error);
      status.dataset.state = "error";
      status.replaceChildren(
        document.createTextNode(`${error.message} You can also `),
        Object.assign(document.createElement("a"), {
          href: "mailto:gupdev4@gmail.com",
          textContent: "email me directly",
        }),
        document.createTextNode("."),
      );
    } finally {
      sending = false;
      submitButton.disabled = false;
      submitLabel.textContent = "Send message";
    }
  });
}

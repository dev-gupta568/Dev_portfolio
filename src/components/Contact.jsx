import { useState } from "react";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { emailHref, profile } from "../data/profile.js";

const CONTACT_MESSAGES_KEY = "portfolio-contact-messages";

function Contact() {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMessage = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      submittedAt: new Date().toISOString(),
    };

    try {
      const savedMessages = JSON.parse(window.localStorage.getItem(CONTACT_MESSAGES_KEY) || "[]");
      if (!Array.isArray(savedMessages)) {
        throw new Error("Saved contact messages are not in the expected format.");
      }

      window.localStorage.setItem(
        CONTACT_MESSAGES_KEY,
        JSON.stringify([...savedMessages, newMessage]),
      );
      event.currentTarget.reset();
      setFormStatus("Message saved in this browser. The form is ready for a new message.");
    } catch (error) {
      console.error("Unable to save contact message in local storage.", error);
      setFormStatus("Message could not be saved in this browser. Check browser storage settings and try again.");
    }
  };

  return (
    <section className="section-pad section-muted" id="contact" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div className="contact-copy">
          <span className="eyebrow">CONTACT</span>
          <h2 id="contact-title">Let’s start a <span className="text-accent">conversation.</span></h2>
          <p>I’m open to frontend development opportunities where I can contribute, keep learning, and grow as a developer.</p>
          <div className="contact-details">
            <div><span className="contact-detail-icon"><Mail size={16} /></span><div><span>Email</span><a href={emailHref}>{profile.email}</a></div></div>
            <div><span className="contact-detail-icon"><MapPin size={16} /></span><div><span>Location</span><strong>{profile.location}</strong></div></div>
          </div>
          <div className="contact-socials">
            <a href={profile.github || "https://github.com/dev-gupta568/HTML-CSS-Javascript-project.git"} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
            <a href={profile.linkedin || "https://www.linkedin.com/in/dev-gupta-1676bb245"} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full Name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
            <label>Email<input name="email" type="email" placeholder="your @email.com" autoComplete="email" required /></label>
          </div>
          <label>Subject<input name="subject" type="text" placeholder="What would you like to discuss?" required /></label>
          <label>Message<textarea name="message" placeholder="Write your message..." rows="5" required /></label>
          <button className="button button-primary submit-button" type="submit">Save Message <Send size={15} /></button>
          <p className="form-status" aria-live="polite" role="status">{formStatus}</p>
        </form>
      </div>
    </section>
  );
}

export default Contact;

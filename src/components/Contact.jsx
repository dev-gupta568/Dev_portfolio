import React from "react";

function Contact() {
  return (
    <section className="section wrap contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">LET'S MAKE SOMETHING GOOD</span>
          <h2 id="contact-title">Have an idea? <span>Let's talk.</span></h2>
          <p>I’m open to frontend opportunities and creative collaborations. Send a note and I’ll get back to you.</p>
          <p className="contact-alternative">
            Prefer email? <a href="mailto:gupdev4@gmail.com">gupdev4@gmail.com</a>
          </p>
        </div>
        <form className="contact-form" id="contact-form" noValidate>
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
          </div>
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" maxLength="100" autoComplete="name" required aria-describedby="name-error" />
            <span className="field-error" id="name-error" aria-live="polite" />
          </div>
          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" maxLength="255" autoComplete="email" required aria-describedby="email-error" />
            <span className="field-error" id="email-error" aria-live="polite" />
          </div>
          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="5" minLength="10" maxLength="2000" required aria-describedby="message-error" />
            <span className="field-error" id="message-error" aria-live="polite" />
          </div>
          <button className="button primary send-button" type="submit">
            <span className="send-label">Send message</span>
            <span className="button-arrow" aria-hidden="true">↗</span>
          </button>
          <p className="form-status" id="form-status" aria-live="polite" role="status" />
        </form>
      </div>
    </section>
  );
}

export default Contact;

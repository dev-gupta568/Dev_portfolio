export const profile = {
  name: "Dev Gupta",
  title: "Frontend Developer",
  introduction:
    "I am a motivated BCA fresher focused on frontend development and building practical, responsive web applications.",
  location: "Delhi NCR, India",
  email: "[gupdev4@gmail.com]",
  github: "https://github.com/dev-gupta568/HTML-CSS-Javascript-project.git",
  linkedin: "https://www.linkedin.com/in/dev-gupta-1676bb245",
  resumePath: "/resume.pdf",
};

export const emailHref = profile.email.startsWith("[") ? "#contact" : `mailto:${profile.email}`;

export const aboutStats = [
  // { value: "[Add count]", label: "Projects completed" },
  // { value: "[Add skills]", label: "Technologies learned" },
  // { value: "[Add count]", label: "Certifications" },
  // { value: "Always learning", label: "Learning mindset" },
];

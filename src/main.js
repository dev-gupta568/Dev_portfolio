import "./styles/base.css";
import "./styles/layout.css";
import "./styles/contact.css";
import "./styles/responsive.css";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Missing React root element with id "root".');
}

createRoot(rootElement).render(createElement(App));

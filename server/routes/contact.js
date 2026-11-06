import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getMessagesCollection } from "../db.js";

const router = Router();
const messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_request, response) => {
    response.status(429).json({ ok: false, error: "Too many messages. Please try again in 15 minutes." });
  },
});
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/contact", messageLimiter, async (request, response) => {
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  if (website) {
    response.status(200).json({ ok: true });
    return;
  }

  if (!name || name.length > 100) {
    response.status(400).json({ ok: false, error: "Name is required and must be 100 characters or fewer." });
    return;
  }
  if (email.length > 255 || !emailPattern.test(email)) {
    response.status(400).json({ ok: false, error: "Enter a valid email address." });
    return;
  }
  if (message.length < 10 || message.length > 2000) {
    response.status(400).json({ ok: false, error: "Message must be between 10 and 2,000 characters." });
    return;
  }

  try {
    await getMessagesCollection().insertOne({
      name,
      email,
      message,
      ip: request.ip || null,
      userAgent: typeof request.get("user-agent") === "string" ? request.get("user-agent") : null,
      createdAt: new Date(),
    });
    response.status(201).json({ ok: true });
  } catch (error) {
    console.error("Unable to save contact message.", error);
    response.status(500).json({ ok: false, error: "Your message could not be saved right now. Please try again later." });
  }
});

export default router;

import cors from "cors";
import express from "express";
import helmet from "helmet";
import { closeDatabase, connectDatabase, pingDatabase } from "./db.js";
import contactRoutes from "./routes/contact.js";

const app = express();
const port = Number.parseInt(process.env.PORT || "3001", 10);
const allowedOrigin = process.env.ALLOWED_ORIGIN;

if (process.env.NODE_ENV === "production" || process.env.TRUST_PROXY === "true") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || (allowedOrigin && origin === allowedOrigin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
}));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", async (_request, response) => {
  try {
    await pingDatabase();
    response.json({ ok: true });
  } catch (error) {
    console.error("API health check failed.", error);
    response.status(503).json({ ok: false, error: "Service is temporarily unavailable." });
  }
});

app.use("/api", contactRoutes);
app.use((_request, response) => {
  response.status(404).json({ ok: false, error: "Not found." });
});
app.use((error, _request, response, _next) => {
  if (error.type === "entity.too.large") {
    response.status(413).json({ ok: false, error: "Request body must be 10kb or smaller." });
    return;
  }
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    response.status(400).json({ ok: false, error: "Request body must contain valid JSON." });
    return;
  }
  console.error("Unhandled API error.", error);
  response.status(500).json({ ok: false, error: "An unexpected error occurred." });
});

let server;

const shutdown = () => {
  if (!server) {
    return;
  }
  server.close(() => {
    closeDatabase().then(() => process.exit(0)).catch((error) => {
      console.error("Unable to close MongoDB connection cleanly.", error);
      process.exit(1);
    });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

try {
  await connectDatabase();
  server = app.listen(port, () => {
    console.log(`Contact API listening on http://localhost:${port}`);
  });
} catch (error) {
  console.error("Unable to connect to MongoDB.", error);
  process.exitCode = 1;
}

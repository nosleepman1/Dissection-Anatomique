import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDB } from "./db";
import { responsesRouter } from "./routes/responses";
import { adminRouter } from "./routes/admin";

const PORT = Number(process.env.PORT) || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dissection_event2026";
const CORS_ORIGIN = (process.env.CORS_ORIGIN || "").split(",").filter(Boolean);

const app = express();
//add also https://dissection-anatomique-admin.vercel.app, https://dissection-anatomique-client.vercel.app
app.use(cors({ origin: [...CORS_ORIGIN, "https://dissection-anatomique-admin.vercel.app", "https://dissection-anatomique-client.vercel.app"].length > 0 ? [...CORS_ORIGIN, "https://dissection-anatomique-admin.vercel.app", "https://dissection-anatomique-client.vercel.app"] : true }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/responses", responsesRouter);
app.use("/api/admin", adminRouter);

connectDB(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

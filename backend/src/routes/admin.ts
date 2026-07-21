import { Router } from "express";
import { ResponseModel } from "../models/Response";
import { requireAdmin } from "../middleware/requireAdmin";

export const adminRouter = Router();

adminRouter.post("/login", (req, res) => {
  const { password } = req.body as { password?: string };

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Mot de passe invalide." });
    return;
  }

  res.json({ ok: true });
});

function tally<T extends string>(values: T[]): Record<string, { count: number; rate: number }> {
  const total = values.length;
  const counts: Record<string, number> = {};

  for (const value of values) {
    counts[value] = (counts[value] ?? 0) + 1;
  }

  const result: Record<string, { count: number; rate: number }> = {};
  for (const [key, count] of Object.entries(counts)) {
    result[key] = { count, rate: total === 0 ? 0 : Math.round((count / total) * 1000) / 10 };
  }
  return result;
}

adminRouter.get("/stats", requireAdmin, async (_req, res) => {
  const responses = await ResponseModel.find().sort({ createdAt: -1 }).lean();
  const total = responses.length;

  res.json({
    total,
    questions: {
      hasDissectionCourse: tally(responses.map((r) => r.hasDissectionCourse)),
      comfortableWithMaterial: tally(responses.map((r) => r.comfortableWithMaterial)),
      safetyAgreement: tally(responses.map((r) => r.safetyAgreement)),
    },
    responses,
  });
});

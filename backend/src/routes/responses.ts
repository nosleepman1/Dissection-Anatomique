import { Router } from "express";
import { ResponseModel } from "../models/Response";
import type { SurveyResponseInput } from "../types";

export const responsesRouter = Router();

const REQUIRED_FIELDS: Array<keyof SurveyResponseInput> = [
  "fullName",
  "firstName",
  "birthDate",
  "nationality",
  "address",
  "phone",
  "email",
  "level",
  "hasDissectionCourse",
  "comfortableWithMaterial",
  "safetyAgreement",
];

responsesRouter.post("/", async (req, res) => {
  const body = req.body as Partial<SurveyResponseInput>;

  const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
  if (missing.length > 0) {
    res.status(400).json({ error: "Champs manquants", missing });
    return;
  }

  if (body.safetyAgreement === "Autre" && !body.safetyAgreementOther) {
    res.status(400).json({ error: "Veuillez préciser votre réponse pour la question 11." });
    return;
  }

  if (body.hasDissectionCourse === "Oui" && !body.dissectionExperience) {
    res.status(400).json({ error: "Veuillez décrire brièvement votre expérience pour la question 9." });
    return;
  }

  const created = await ResponseModel.create(body);
  res.status(201).json({ id: created.id });
});

import { Schema, model } from "mongoose";
import type { SurveyResponseInput } from "../types";

interface SurveyResponseDoc extends SurveyResponseInput {
  createdAt: Date;
}

const responseSchema = new Schema<SurveyResponseDoc>({
  fullName: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  birthDate: { type: String, required: true },
  nationality: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  level: { type: String, required: true, trim: true },
  hasDissectionCourse: { type: String, enum: ["Oui", "Non"], required: true },
  dissectionExperience: { type: String, trim: true, default: "" },
  comfortableWithMaterial: { type: String, enum: ["Oui", "Non"], required: true },
  safetyAgreement: {
    type: String,
    enum: ["Je m'engage à respecter ces consignes", "Autre"],
    required: true,
  },
  safetyAgreementOther: { type: String, trim: true, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export const ResponseModel = model<SurveyResponseDoc>("Response", responseSchema);

export type YesNo = "Oui" | "Non";

export type SafetyAgreement = "Je m'engage à respecter ces consignes" | "Autre";

export interface SurveyResponseInput {
  fullName: string;
  firstName: string;
  birthDate: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  level: string;
  hasDissectionCourse: YesNo;
  dissectionExperience?: string;
  comfortableWithMaterial: YesNo;
  safetyAgreement: SafetyAgreement;
  safetyAgreementOther?: string;
}

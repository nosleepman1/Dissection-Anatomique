export interface SurveyResponse {
  _id: string;
  fullName: string;
  firstName: string;
  birthDate: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  level: string;
  hasDissectionCourse: "Oui" | "Non";
  dissectionExperience?: string;
  comfortableWithMaterial: "Oui" | "Non";
  safetyAgreement: string;
  safetyAgreementOther?: string;
  createdAt: string;
}

export interface Tally {
  [key: string]: { count: number; rate: number };
}

export interface StatsResponse {
  total: number;
  questions: {
    hasDissectionCourse: Tally;
    comfortableWithMaterial: Tally;
    safetyAgreement: Tally;
  };
  responses: SurveyResponse[];
}

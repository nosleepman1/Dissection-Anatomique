export type YesNo = "Oui" | "Non";

export type SafetyAgreement = "Je m'engage à respecter ces consignes" | "Autre";

export interface SurveyFormData {
  fullName: string;
  firstName: string;
  birthDate: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  level: string;
  hasDissectionCourse: YesNo | "";
  dissectionExperience: string;
  comfortableWithMaterial: YesNo | "";
  safetyAgreement: SafetyAgreement | "";
  safetyAgreementOther: string;
}

export const emptyForm: SurveyFormData = {
  fullName: "",
  firstName: "",
  birthDate: "",
  nationality: "",
  address: "",
  phone: "",
  email: "",
  level: "",
  hasDissectionCourse: "",
  dissectionExperience: "",
  comfortableWithMaterial: "",
  safetyAgreement: "",
  safetyAgreementOther: "",
};

import type { SurveyFormData } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function submitResponse(data: SurveyFormData): Promise<void> {
  const res = await fetch(`${API_URL}/api/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Une erreur est survenue lors de l'envoi.");
  }
}

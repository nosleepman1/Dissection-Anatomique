import type { StatsResponse } from "./types";

const API_URL = import.meta.env.VITE_API_URL as string;

export async function login(password: string): Promise<boolean> {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  return res.ok;
}

export async function fetchStats(password: string): Promise<StatsResponse> {
  const res = await fetch(`${API_URL}/api/admin/stats`, {
    headers: { "x-admin-password": password },
  });

  if (!res.ok) {
    throw new Error("Session invalide, veuillez vous reconnecter.");
  }

  return res.json();
}

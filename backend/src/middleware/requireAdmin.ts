import type { NextFunction, Request, Response } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const password = req.header("x-admin-password");

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Mot de passe administrateur invalide." });
    return;
  }

  next();
}

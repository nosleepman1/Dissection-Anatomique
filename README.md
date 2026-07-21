# Cours de Dissection Anatomique — Questionnaire

Monorepo TypeScript avec 3 dossiers :

- `backend/` — API Express + MongoDB (Mongoose)
- `client/` — Formulaire React (candidats)
- `admin/` — Tableau de bord React protégé par mot de passe (statistiques)

## Démarrage

1. Copier `backend/.env.example` en `backend/.env` si besoin (déjà fourni avec `ADMIN_PASSWORD=EVENT2026`).
2. S'assurer qu'une instance MongoDB tourne sur `MONGODB_URI` (par défaut `mongodb://127.0.0.1:27017/dissection_event2026`).
3. Installer les dépendances à la racine : `npm install` (workspaces npm).
4. Lancer chaque app dans un terminal séparé :
   - `npm run dev:backend` → http://localhost:4000
   - `npm run dev:client` → http://localhost:5173 (formulaire)
   - `npm run dev:admin` → http://localhost:5174 (admin, mot de passe `EVENT2026`)

## Notes

- Le mot de passe admin est vérifié côté backend via la variable d'environnement `ADMIN_PASSWORD` (`backend/.env`) — jamais stocké dans le code front.
- `GET /api/admin/stats` retourne, pour chaque question à choix (radio/checkbox), le nombre de réponses et le taux (%) par option, ainsi que la liste brute des réponses pour les champs texte.
- Les deux frontends sont responsive (mobile-first).

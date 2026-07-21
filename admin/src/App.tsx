import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { fetchStats, login } from "./api";
import type { StatsResponse } from "./types";
import { QuestionStats } from "./components/QuestionStats";

const STORAGE_KEY = "larafest_admin_password";

function App() {
  const [password, setPassword] = useState(() => sessionStorage.getItem(STORAGE_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (password) {
      login(password).then((ok) => {
        if (ok) setAuthed(true);
        else sessionStorage.removeItem(STORAGE_KEY);
      });
    }
  }, [password]);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetchStats(password)
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [authed, password]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    const ok = await login(passwordInput);
    if (!ok) {
      setLoginError("Mot de passe incorrect.");
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, passwordInput);
    setPassword(passwordInput);
    setAuthed(true);
  }

  if (!authed) {
    return (
      <main className="page">
        <form className="card login-card" onSubmit={handleLogin}>
          <h1>Administration</h1>
          <p>Cours de Dissection Anatomique — accès réservé</p>
          <label className="field">
            <span>Mot de passe</span>
            <input
              type="password"
              autoFocus
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </label>
          {loginError && <p className="error">{loginError}</p>}
          <button className="submit" type="submit">
            Se connecter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="page admin-page">
      <div className="card wide">
        <header className="form-header">
          <h1>Tableau de bord — Cours de Dissection Anatomique</h1>
          <p>{stats ? `${stats.total} réponse(s) reçue(s)` : "Chargement..."}</p>
        </header>

        {error && <p className="error">{error}</p>}
        {loading && <p className="muted">Chargement des statistiques...</p>}

        {stats && (
          <>
            <section className="stats-grid">
              <QuestionStats
                title="9. Cours de dissection anatomique suivi ?"
                tally={stats.questions.hasDissectionCourse}
              />
              <QuestionStats
                title="10. À l'aise avec le matériel anatomique et les os ?"
                tally={stats.questions.comfortableWithMaterial}
              />
              <QuestionStats
                title="11. Engagement sur les recommandations de sécurité"
                tally={stats.questions.safetyAgreement}
              />
            </section>

            <section className="section">
              <h2>Réponses détaillées</h2>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Naissance</th>
                      <th>Nationalité</th>
                      <th>Adresse</th>
                      <th>Téléphone</th>
                      <th>Email</th>
                      <th>Niveau</th>
                      <th>Q9</th>
                      <th>Expérience</th>
                      <th>Q10</th>
                      <th>Q11</th>
                      <th>Précision Q11</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.responses.map((r) => (
                      <tr key={r._id}>
                        <td>{new Date(r.createdAt).toLocaleString("fr-FR")}</td>
                        <td>{r.fullName}</td>
                        <td>{r.firstName}</td>
                        <td>{r.birthDate}</td>
                        <td>{r.nationality}</td>
                        <td>{r.address}</td>
                        <td>{r.phone}</td>
                        <td>{r.email}</td>
                        <td>{r.level}</td>
                        <td>{r.hasDissectionCourse}</td>
                        <td>{r.dissectionExperience || "-"}</td>
                        <td>{r.comfortableWithMaterial}</td>
                        <td>{r.safetyAgreement}</td>
                        <td>{r.safetyAgreementOther || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default App;

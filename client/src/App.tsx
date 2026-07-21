import { useState } from "react";
import type { FormEvent } from "react";
import { emptyForm } from "./types";
import type { SurveyFormData } from "./types";
import { submitResponse } from "./api";

function App() {
  const [form, setForm] = useState<SurveyFormData>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [error, setError] = useState<string>("");

  function update<K extends keyof SurveyFormData>(key: K, value: SurveyFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await submitResponse(form);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  if (status === "done") {
    return (
      <main className="page">
        <div className="card success">
          <h1>Merci !</h1>
          <p>Votre réponse a bien été enregistrée pour le cours de dissection anatomique.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <form className="card" onSubmit={handleSubmit}>
        <header className="form-header">
          <h1>Questionnaire — Cours de Dissection Anatomique</h1>
          <p>Inscription au cours — merci de répondre à toutes les questions.</p>
        </header>

        <section className="section">
          <h2>Section 1 : Informations personnelles</h2>

          <label className="field">
            <span>1. Nom complet</span>
            <input
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
          </label>

          <label className="field">
            <span>2. Prénom</span>
            <input
              required
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </label>

          <label className="field">
            <span>3. Date de naissance</span>
            <input
              type="date"
              required
              value={form.birthDate}
              onChange={(e) => update("birthDate", e.target.value)}
            />
          </label>

          <label className="field">
            <span>4. Nationalité</span>
            <input
              required
              value={form.nationality}
              onChange={(e) => update("nationality", e.target.value)}
            />
          </label>

          <label className="field">
            <span>5. Adresse (ville et pays)</span>
            <input
              required
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </label>
        </section>

        <section className="section">
          <h2>Section 2 : Contact</h2>

          <label className="field">
            <span>6. Numéro de téléphone (avec indicatif)</span>
            <input
              required
              placeholder="+221 ..."
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </label>

          <label className="field">
            <span>7. Adresse e-mail</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>
        </section>

        <section className="section">
          <h2>Section 3 : Formation et expériences</h2>

          <label className="field">
            <span>
              8. Niveau <em>(ex. « DES ORL », « Spécialiste en Neurochirurgie », « Spécialiste en ORL », autres, etc.)</em>
            </span>
            <input
              required
              value={form.level}
              onChange={(e) => update("level", e.target.value)}
            />
          </label>

          <fieldset className="field">
            <legend>9. Avez-vous déjà suivi un cours de dissection anatomique ?</legend>
            <label className="radio">
              <input
                type="radio"
                name="hasDissectionCourse"
                required
                checked={form.hasDissectionCourse === "Oui"}
                onChange={() => update("hasDissectionCourse", "Oui")}
              />
              Oui
            </label>
            <label className="radio">
              <input
                type="radio"
                name="hasDissectionCourse"
                required
                checked={form.hasDissectionCourse === "Non"}
                onChange={() => update("hasDissectionCourse", "Non")}
              />
              Non
            </label>
          </fieldset>

          {form.hasDissectionCourse === "Oui" && (
            <label className="field">
              <span>Si oui, indiquez brièvement votre expérience (os, région, durée, etc.)</span>
              <textarea
                required
                rows={3}
                value={form.dissectionExperience}
                onChange={(e) => update("dissectionExperience", e.target.value)}
              />
            </label>
          )}
        </section>

        <section className="section">
          <h2>Section 4 : Modalités du cours</h2>

          <fieldset className="field">
            <legend>10. Êtes-vous à l'aise avec la manipulation de matériel anatomique et d'os ?</legend>
            <label className="radio">
              <input
                type="radio"
                name="comfortableWithMaterial"
                required
                checked={form.comfortableWithMaterial === "Oui"}
                onChange={() => update("comfortableWithMaterial", "Oui")}
              />
              Oui
            </label>
            <label className="radio">
              <input
                type="radio"
                name="comfortableWithMaterial"
                required
                checked={form.comfortableWithMaterial === "Non"}
                onChange={() => update("comfortableWithMaterial", "Non")}
              />
              Non
            </label>
          </fieldset>

          <fieldset className="field">
            <legend>
              11. Recommandations de sécurité : port de gants, lunettes, tenue adaptée
            </legend>
            <label className="radio">
              <input
                type="radio"
                name="safetyAgreement"
                required
                checked={form.safetyAgreement === "Je m'engage à respecter ces consignes"}
                onChange={() => update("safetyAgreement", "Je m'engage à respecter ces consignes")}
              />
              Je m'engage à respecter ces consignes
            </label>
            <label className="radio">
              <input
                type="radio"
                name="safetyAgreement"
                required
                checked={form.safetyAgreement === "Autre"}
                onChange={() => update("safetyAgreement", "Autre")}
              />
              Autre (précisez)
            </label>
          </fieldset>

          {form.safetyAgreement === "Autre" && (
            <label className="field">
              <span>Précisez</span>
              <textarea
                required
                rows={2}
                value={form.safetyAgreementOther}
                onChange={(e) => update("safetyAgreementOther", e.target.value)}
              />
            </label>
          )}
        </section>

        {status === "error" && <p className="error">{error}</p>}

        <button className="submit" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </main>
  );
}

export default App;

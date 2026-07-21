import type { Tally } from "../types";

interface Props {
  title: string;
  tally: Tally;
}

export function QuestionStats({ title, tally }: Props) {
  const entries = Object.entries(tally);
  const maxCount = Math.max(1, ...entries.map(([, v]) => v.count));

  return (
    <div className="stat-card">
      <h3>{title}</h3>
      {entries.length === 0 && <p className="muted">Aucune réponse.</p>}
      {entries.map(([label, { count, rate }]) => (
        <div className="stat-row" key={label}>
          <div className="stat-label">
            <span>{label}</span>
            <span>
              {count} ({rate}%)
            </span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(count / maxCount) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

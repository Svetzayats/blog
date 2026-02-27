import { useState, useEffect, useMemo } from "react";
import { REACT_SKILLS } from "./react-skills-data";
import { REACT_NATIVE_SKILLS } from "./react-native-skills-data";
import { COMPOSITION_PATTERNS_SKILLS } from "./composition-patterns-skills-data";

// ─── SKILLS DATA ──────────────────────────────────────────────────────────────

const SKILLS_DATA = [
  // ── REACT BEST PRACTICES ─────────────────────────────────────────────────
  {
    group: "React Best Practices",
    groupId: "react-best-practices",
    groupColor: "#3b82f6",
    skills: REACT_SKILLS 
  },

  // ── COMPOSITION PATTERNS ─────────────────────────────────────────────────
  {
    group: "Composition Patterns",
    groupId: "composition-patterns",
    groupColor: "#8b5cf6",
    skills: COMPOSITION_PATTERNS_SKILLS
  },

  // ── REACT NATIVE SKILLS ──────────────────────────────────────────────────
  {
    group: "React Native",
    groupId: "react-native",
    groupColor: "#10b981",
    skills: REACT_NATIVE_SKILLS
  }
];

// Flatten all skills for the results view
const ALL_SKILLS_FLAT = SKILLS_DATA.flatMap(g =>
  g.skills.map(s => ({ ...s, groupLabel: g.group, groupId: g.groupId, groupColor: g.groupColor }))
);

// ─── SCORE LABELS ─────────────────────────────────────────────────────────────
const SCORE_CONFIG = [
  { value: -2, label: "Skip", emoji: "🚫", color: "#ef4444" },
  { value: -1, label: "Doubt", emoji: "👎", color: "#f97316" },
  { value:  0, label: "Neutral", emoji: "🤷", color: "#6b7280" },
  { value:  1, label: "Like", emoji: "👍", color: "#22c55e" },
  { value:  2, label: "Must", emoji: "⭐", color: "#f59e0b" },
];

// ─── MOCK STORAGE ─────────────────────────────────────────────────────────────
// Shape: { [skillId]: [ { user, score, comment, ts } ] }
function loadVotes() {
  try {
    return JSON.parse(localStorage.getItem("skill_votes") || "{}");
  } catch { return {}; }
}
function saveVotes(votes) {
  localStorage.setItem("skill_votes", JSON.stringify(votes));
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function avg(arr) {
  if (!arr.length) return null;
  return arr.reduce((s, v) => s + v.score, 0) / arr.length;
}
function scoreColor(score) {
  if (score === null) return "#6b7280";
  if (score >= 1.5) return "#f59e0b";
  if (score >= 0.5) return "#22c55e";
  if (score >= -0.5) return "#6b7280";
  if (score >= -1.5) return "#f97316";
  return "#ef4444";
}

// ─── IMPACT BADGE ─────────────────────────────────────────────────────────────
function ImpactBadge({ impact }) {
  const colors = {
    CRITICAL: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
    HIGH:     { bg: "#fef9ee", text: "#d97706", border: "#fde68a" },
    MEDIUM:   { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
    LOW:      { bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0" },
  };
  const c = colors[impact] || colors.LOW;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", padding: "2px 7px", borderRadius: 99, background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {impact}
    </span>
  );
}

// ─── SCORE BUTTON ROW ─────────────────────────────────────────────────────────
function ScoreButtons({ currentScore, onScore }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {SCORE_CONFIG.map(s => (
        <button
          key={s.value}
          title={s.label}
          onClick={() => onScore(s.value)}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 2, padding: "6px 10px", borderRadius: 8, cursor: "pointer",
            border: currentScore === s.value ? `2px solid ${s.color}` : "2px solid #e5e7eb",
            background: currentScore === s.value ? s.color + "18" : "#fff",
            color: currentScore === s.value ? s.color : "#6b7280",
            fontWeight: currentScore === s.value ? 700 : 400,
            fontSize: 11, transition: "all 0.15s",
          }}
        >
          <span style={{ fontSize: 16 }}>{s.emoji}</span>
          <span>{s.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── SKILL CARD (Rating View) ─────────────────────────────────────────────────
function SkillCard({ skill, myVote, onVote, groupColor }) {
  const [comment, setComment] = useState(myVote?.comment || "");
  const [submitted, setSubmitted] = useState(!!myVote);
  const [score, setScore] = useState(myVote?.score ?? null);
  const [editing, setEditing] = useState(false);

  function handleSubmit() {
    if (score === null) return;
    onVote(skill.id, score, comment);
    setSubmitted(true);
    setEditing(false);
  }

  const showForm = !submitted || editing;

  return (
    <div style={{
      background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
      padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12,
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)", transition: "box-shadow 0.15s",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{skill.name}</span>
            { /* <ImpactBadge impact={skill.impact} /> */}
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>{skill.category}</div>
          <p style={{ fontSize: 13, color: "#4b5563", margin: 0, lineHeight: 1.55 }}>{skill.description}</p>
        </div>
        <a
          href={skill.githubUrl}
          target="_blank"
          rel="noreferrer"
          style={{ flexShrink: 0, fontSize: 11, color: groupColor, textDecoration: "none", fontWeight: 600, border: `1px solid ${groupColor}33`, padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap" }}
        >
          GitHub →
        </a>
      </div>

      {/* Submitted state */}
      {submitted && !editing && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f9fafb", borderRadius: 8, padding: "10px 14px" }}>
          <span style={{ fontSize: 20 }}>{SCORE_CONFIG.find(s => s.value === score)?.emoji}</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: SCORE_CONFIG.find(s => s.value === score)?.color }}>
              {SCORE_CONFIG.find(s => s.value === score)?.label}
            </span>
            {comment && <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>"{comment}"</p>}
          </div>
          <button onClick={() => setEditing(true)} style={{ fontSize: 11, color: "#6b7280", background: "none", border: "1px solid #e5e7eb", borderRadius: 6, padding: "4px 10px", cursor: "pointer" }}>
            Edit
          </button>
        </div>
      )}

      {/* Rating form */}
      {showForm && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <ScoreButtons currentScore={score} onScore={setScore} />
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Optional comment..."
              rows={2}
              style={{ flex: 1, fontSize: 13, padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb", resize: "vertical", fontFamily: "inherit", color: "#374151", outline: "none" }}
            />
            <button
              onClick={handleSubmit}
              disabled={score === null}
              style={{
                padding: "8px 18px", borderRadius: 8, border: "none", cursor: score === null ? "not-allowed" : "pointer",
                background: score === null ? "#e5e7eb" : groupColor, color: score === null ? "#9ca3af" : "#fff",
                fontWeight: 700, fontSize: 13, transition: "all 0.15s",
              }}
            >
              {submitted ? "Update" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RESULTS ROW ──────────────────────────────────────────────────────────────
function ResultRow({ skill, votes, groupColor, rank }) {
  const [open, setOpen] = useState(false);
  const voteList = votes || [];
  const avgScore = avg(voteList);
  const voterCount = voteList.length;

  return (
    <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", cursor: "pointer", userSelect: "none" }}
      >
        {/* Rank */}
        <span style={{ fontSize: 13, fontWeight: 700, color: "#9ca3af", minWidth: 24, textAlign: "right" }}>#{rank}</span>

        {/* Score pill */}
        <div style={{
          minWidth: 52, textAlign: "center", fontWeight: 800, fontSize: 16,
          color: avgScore !== null ? scoreColor(avgScore) : "#9ca3af",
          background: avgScore !== null ? scoreColor(avgScore) + "15" : "#f3f4f6",
          borderRadius: 8, padding: "4px 10px",
        }}>
          {avgScore !== null ? avgScore.toFixed(1) : "—"}
        </div>

        {/* Name + tags */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{skill.name}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: groupColor, background: groupColor + "18", padding: "2px 8px", borderRadius: 99, border: `1px solid ${groupColor}33` }}>
              {skill.groupLabel}
            </span>
            <ImpactBadge impact={skill.impact} /> 
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{skill.category}</div>
        </div>

        {/* Vote count */}
        <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{voterCount} vote{voterCount !== 1 ? "s" : ""}</span>

        {/* Distribution */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {SCORE_CONFIG.map(s => {
            const n = voteList.filter(v => v.score === s.value).length;
            if (n === 0) return null;
            return (
              <span key={s.value} style={{ fontSize: 12, color: s.color, fontWeight: 600 }}>
                {s.emoji}{n}
              </span>
            );
          })}
        </div>

        <span style={{ fontSize: 12, color: "#9ca3af" }}>{open ? "▲" : "▼"}</span>
      </div>

      {/* Expanded comments */}
      {open && (
        <div style={{ borderTop: "1px solid #f3f4f6", padding: "12px 18px", background: "#fafafa", display: "flex", flexDirection: "column", gap: 8 }}>
          <p style={{ margin: "0 0 6px", fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>{skill.description}</p>
          {voteList.length === 0 ? (
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>No votes yet.</p>
          ) : (
            voteList.map((v, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderTop: i > 0 ? "1px solid #f0f0f0" : "none" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{SCORE_CONFIG.find(s => s.value === v.score)?.emoji}</span>
                <div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: SCORE_CONFIG.find(s => s.value === v.score)?.color }}>
                    {SCORE_CONFIG.find(s => s.value === v.score)?.label}
                  </span>
                  <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 8 }}>by {v.user || "Anonymous"}</span>
                  {v.comment && <p style={{ margin: "3px 0 0", fontSize: 13, color: "#374151" }}>"{v.comment}"</p>}
                </div>
              </div>
            ))
          )}
          <a href={skill.githubUrl} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: groupColor, fontWeight: 600, textDecoration: "none", marginTop: 4 }}>
            View on GitHub →
          </a>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("vote"); // "vote" | "results"
  const [userName, setUserName] = useState(() => typeof window !== 'undefined' && localStorage?.getItem("skill_voter_name") || "");
  const [nameInput, setNameInput] = useState("");
  const [nameSet, setNameSet] = useState(() => typeof window !== 'undefined' && !!localStorage?.getItem("skill_voter_name") || false );
  const [votes, setVotes] = useState(loadVotes);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  // My votes for current user
  const myVotesMap = useMemo(() => {
    const map = {};
    Object.entries(votes).forEach(([skillId, list]) => {
      const mine = list.find(v => v.user === (userName || "Anonymous"));
      if (mine) map[skillId] = mine;
    });
    return map;
  }, [votes, userName]);

  function setName(name) {
    const n = name.trim() || "Anonymous";
    setUserName(n);
    localStorage.setItem("skill_voter_name", n);
    setNameSet(true);
  }

  function handleVote(skillId, score, comment) {
    const newVotes = { ...votes };
    const user = userName || "Anonymous";
    if (!newVotes[skillId]) newVotes[skillId] = [];
    const idx = newVotes[skillId].findIndex(v => v.user === user);
    const entry = { user, score, comment, ts: Date.now() };
    if (idx >= 0) newVotes[skillId][idx] = entry;
    else newVotes[skillId].push(entry);
    setVotes(newVotes);
    saveVotes(newVotes);
  }

  // Results: sort by avg score descending
  const sortedResults = useMemo(() => {
    return [...ALL_SKILLS_FLAT].sort((a, b) => {
      const aAvg = avg(votes[a.id] || []) ?? -99;
      const bAvg = avg(votes[b.id] || []) ?? -99;
      return bAvg - aAvg;
    });
  }, [votes]);

  const totalVoted = Object.keys(myVotesMap).length;
  const totalSkills = ALL_SKILLS_FLAT.length;

  // ── Name Setup Screen ──
  if (!nameSet) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", fontFamily: "'Inter', system-ui, sans-serif" }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "40px 48px", maxWidth: 420, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Agent Skills Voter</div>
          <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 28 }}>
            Rate the Vercel Agent Skills your team is considering. Your votes are stored locally — switch to <strong>Results</strong> when everyone's done to see the aggregated ranking.
          </p>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Your name (optional)</label>
          <input
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && setName(nameInput)}
            placeholder="e.g. Alex"
            autoFocus
            style={{ width: "100%", boxSizing: "border-box", fontSize: 14, padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", outline: "none", marginBottom: 12 }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setName(nameInput)}
              style={{ flex: 1, padding: "11px 0", background: "#111827", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
            >
              {nameInput.trim() ? `Continue as ${nameInput.trim()}` : "Continue as Anonymous"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main App ──
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top Nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 56 }}>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#111827", letterSpacing: "-0.02em" }}>⚡ Agent Skills</span>
          <div style={{ flex: 1 }} />
          {/* View Toggle */}
          <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 8, padding: 3, gap: 2 }}>
            {["vote", "results"].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "5px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                  background: view === v ? "#fff" : "transparent",
                  color: view === v ? "#111827" : "#6b7280",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {v === "vote" ? "📋 Rate Skills" : "📊 Results"}
              </button>
            ))}
          </div>
          {/* User + progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{totalVoted}/{totalSkills} rated</span>
            <div style={{ width: 64, height: 6, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(totalVoted / totalSkills) * 100}%`, background: "#111827", borderRadius: 99, transition: "width 0.3s" }} />
            </div>
            <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{userName}</span>
            <button
              onClick={() => { setNameSet(false); setNameInput(""); }}
              style={{ fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              ✎
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 64px" }}>

        {/* ── VOTE VIEW ── */}
        {view === "vote" && (
          <div>
            {SKILLS_DATA.map(group => { 
              const isCollapsed = collapsedGroups[group.groupId];
              return (
              
              <div key={group.groupId} style={{ marginBottom: 40 }}>
                {/* Group header */}
                <div 
                onClick={() => setCollapsedGroups(c => ({ ...c, [group.groupId]: !c[group.groupId] }))}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isCollapsed ? 0 : 16, cursor: "pointer", userSelect: "none" }}>
                  <div style={{ width: 4, height: 24, borderRadius: 2, background: group.groupColor }} />
                  <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111827" }}>{group.group}</h2>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>
                    {group.skills.filter(s => myVotesMap[s.id]).length}/{group.skills.length} rated
                  </span>
                  <span style={{ marginLeft: "auto", fontSize: 13, color: "#9ca3af" }}>{isCollapsed ? "▼" : "▲"}</span>
                </div>
                {!isCollapsed && <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {group.skills.map(skill => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      myVote={myVotesMap[skill.id]}
                      onVote={handleVote}
                      groupColor={group.groupColor}
                    />
                  ))}
                </div> }
              </div>
            ) })}
          </div>
        )}

        {/* ── RESULTS VIEW ── */}
        {view === "results" && (
          <div>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111827" }}>All Skills — Ranked by Score</h2>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>Click a row to expand comments</span>
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              {SCORE_CONFIG.map(s => (
                <span key={s.value} style={{ fontSize: 12, color: s.color, display: "flex", alignItems: "center", gap: 4 }}>
                  {s.emoji} {s.label} ({s.value > 0 ? "+" : ""}{s.value})
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {sortedResults.map((skill, i) => (
                <ResultRow
                  key={skill.id}
                  skill={skill}
                  votes={votes[skill.id]}
                  groupColor={skill.groupColor}
                  rank={i + 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

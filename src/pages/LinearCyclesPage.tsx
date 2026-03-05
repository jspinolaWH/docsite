import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLinearCycles, useLinearCycleIssues, getCycleStatus, issuePoints, estimateCoverage } from '../hooks/useLinearCycles';
import type { LinearCycle, LinearIssue, CycleStatus } from '../hooks/useLinearCycles';

const STATUS_CONFIG: Record<CycleStatus, { label: string; color: string }> = {
  active:    { label: 'Active',    color: '#16a34a' },
  upcoming:  { label: 'Upcoming',  color: '#0891b2' },
  completed: { label: 'Completed', color: '#6b7280' },
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function CycleCard({ cycle }: { cycle: LinearCycle }) {
  const navigate = useNavigate();
  const status = getCycleStatus(cycle);
  const { color } = STATUS_CONFIG[status];
  const donePct = Math.round(cycle.progress * 100);

  const totalIssues = cycle.issueCountHistory?.at(-1) ?? 0;
  const inProgressCount = cycle.inProgressIssueCountHistory?.at(-1) ?? 0;
  const inProgressPct = totalIssues > 0 ? Math.round((inProgressCount / totalIssues) * 100) : 0;
  const combinedPct = Math.min(donePct + inProgressPct, 100);

  return (
    <div
      onClick={() => navigate(`/cycles/${cycle.id}`, { state: { cycle } })}
      style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderLeft: `4px solid ${color}`,
        borderRadius: '8px',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        opacity: status === 'completed' ? 0.75 : 1,
        cursor: 'pointer',
        transition: 'box-shadow 0.15s, transform 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.95rem', lineHeight: 1.4 }}>
          {cycle.name || `Cycle ${cycle.number}`}
        </span>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color, border: `1px solid ${color}`, borderRadius: '4px', padding: '0 0.4rem', lineHeight: '1.7', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {STATUS_CONFIG[status].label}
        </span>
      </div>

      {cycle.team && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{cycle.team.name}</div>}

      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        {fmt(cycle.startsAt)} → {fmt(cycle.endsAt)}
      </div>

      <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
        {/* done (green) */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${donePct}%`, background: color, borderRadius: '3px' }} />
        {/* in-progress (yellow), starts after done */}
        {inProgressPct > 0 && (
          <div style={{ position: 'absolute', left: `${donePct}%`, top: 0, bottom: 0, width: `${inProgressPct}%`, background: '#f59e0b', borderRadius: '3px' }} />
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        <span>{donePct}% done</span>
        {inProgressPct > 0 && (
          <span style={{ color: '#d97706' }}>{combinedPct}% incl. in progress</span>
        )}
      </div>
    </div>
  );
}

// ── Velocity helpers ────────────────────────────────────────────────────────

interface VelocityEntry {
  cycle: LinearCycle;
  issues: LinearIssue[];
  totalPts: number;
  donePts: number;
}

function VelocityCycleFetcher({
  cycle,
  onResult,
}: {
  cycle: LinearCycle;
  onResult: (id: string, issues: LinearIssue[]) => void;
}) {
  const { issues, loading } = useLinearCycleIssues(cycle.id);
  useEffect(() => {
    if (!loading) onResult(cycle.id, issues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return null;
}

function VelocityView({ completedCycles }: { completedCycles: LinearCycle[] }) {
  const last6 = completedCycles.slice(0, 6);
  const [issueMap, setIssueMap] = useState<Record<string, LinearIssue[]>>({});

  const handleResult = (id: string, issues: LinearIssue[]) => {
    setIssueMap(prev => ({ ...prev, [id]: issues }));
  };

  const entries: VelocityEntry[] = last6.map(cycle => {
    const issues = issueMap[cycle.id] ?? [];
    const totalPts = issues.reduce((s, i) => s + issuePoints(i), 0);
    const donePts = issues
      .filter(i => i.state.type === 'completed')
      .reduce((s, i) => s + issuePoints(i), 0);
    return { cycle, issues, totalPts, donePts };
  });

  const maxPts = Math.max(...entries.map(e => e.totalPts), 1);
  const loadedCount = Object.keys(issueMap).length;
  const allLoaded = loadedCount >= last6.length;

  return (
    <div>
      {/* Hidden fetchers */}
      {last6.map(c => (
        <VelocityCycleFetcher key={c.id} cycle={c} onResult={handleResult} />
      ))}

      {!allLoaded && (
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Loading velocity data… ({loadedCount} of {last6.length})
        </p>
      )}

      {last6.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)' }}>No completed cycles yet.</p>
      )}

      {entries.map((entry) => {
        const totalBarPct = maxPts > 0 ? (entry.totalPts / maxPts) * 100 : 0;
        const doneBarPct = entry.totalPts > 0 ? (entry.donePts / entry.totalPts) * 100 : 0;
        const coverage = entry.issues.length > 0 ? estimateCoverage(entry.issues) : null;
        const loaded = entry.cycle.id in issueMap;

        return (
          <div key={entry.cycle.id} style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', minWidth: '120px' }}>
                {entry.cycle.name || `Cycle ${entry.cycle.number}`}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                {fmt(entry.cycle.startsAt)} → {fmt(entry.cycle.endsAt)}
              </span>
              {loaded && coverage && (
                <span style={{ fontSize: '0.7rem', color: '#9ca3af', marginLeft: 'auto' }}>{coverage}</span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Bar background */}
              <div style={{ flex: 1, height: '22px', background: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                {/* Total pts bar */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: loaded ? `${totalBarPct}%` : '0%',
                  background: '#d1d5db',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease',
                }} />
                {/* Done pts bar */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: loaded ? `${(doneBarPct / 100) * totalBarPct}%` : '0%',
                  background: '#6b7280',
                  borderRadius: '4px',
                  transition: 'width 0.5s ease',
                }} />
                {/* Label inside bar */}
                {loaded && entry.totalPts > 0 && (
                  <span style={{
                    position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                    fontSize: '0.72rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap',
                    textShadow: '0 1px 2px rgba(0,0,0,0.4)',
                  }}>
                    {entry.donePts} / {entry.totalPts} pts
                  </span>
                )}
                {!loaded && (
                  <span style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
                    loading…
                  </span>
                )}
              </div>

              {/* Issue count */}
              {loaded && (
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', minWidth: '60px' }}>
                  {entry.issues.length} issues
                </span>
              )}
            </div>
          </div>
        );
      })}

      {allLoaded && entries.length > 0 && (
        <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
          Bar = total pts in cycle (dark fill = completed pts). Issues without estimates counted as 1 pt.
        </div>
      )}
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export function LinearCyclesPage() {
  const { cycles, loading, error } = useLinearCycles();
  const [activeTab, setActiveTab] = useState<'overview' | 'velocity'>('overview');

  const grouped: Record<CycleStatus, LinearCycle[]> = { active: [], upcoming: [], completed: [] };
  cycles.forEach((c) => grouped[getCycleStatus(c)].push(c));
  grouped.completed.sort((a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime());

  const tabBtn = (active: boolean): React.CSSProperties => ({
    padding: '0.4rem 1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    background: active ? 'var(--color-text-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    transition: 'background 0.15s, color 0.15s',
  });

  return (
    <div className="doc-page">
      <div className="doc-layout">
        <article className="doc-article">
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Linear Cycles</h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Sprint cycle overview from Linear. Click any cycle to see its issues.
              </p>
            </div>

            {!loading && !error && cycles.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => setActiveTab('overview')} style={tabBtn(activeTab === 'overview')}>Overview</button>
                <button onClick={() => setActiveTab('velocity')} style={tabBtn(activeTab === 'velocity')}>Velocity</button>
              </div>
            )}
          </div>

          {loading && <p style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>}

          {error && (
            <div style={{ padding: '1rem 1.25rem', background: '#fee2e2', borderRadius: '8px', color: '#991b1b', fontSize: '0.9rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && cycles.length === 0 && (
            <div style={{ padding: '1.5rem', background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>No cycle data available yet.</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Make sure <code>LINEAR_API_KEY</code> is set as a GitHub repository secret and the site has been redeployed.
              </p>
            </div>
          )}

          {!loading && !error && cycles.length > 0 && activeTab === 'overview' && (
            <>
              {(['active', 'upcoming', 'completed'] as const).map((status) => {
                const list = grouped[status];
                if (!list.length) return null;
                const { label, color } = STATUS_CONFIG[status];
                return (
                  <section key={status} style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {label}
                      <span style={{ background: color, color: '#fff', borderRadius: '999px', fontSize: '0.72rem', padding: '0 0.45rem', fontWeight: 700 }}>
                        {list.length}
                      </span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                      {list.map((c) => <CycleCard key={c.id} cycle={c} />)}
                    </div>
                  </section>
                );
              })}
            </>
          )}

          {!loading && !error && cycles.length > 0 && activeTab === 'velocity' && (
            <section>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                Velocity — last {Math.min(grouped.completed.length, 6)} completed cycles
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                Story points completed vs total scoped per cycle. Fetched live — may take a moment.
              </p>
              <VelocityView completedCycles={grouped.completed} />
            </section>
          )}

        </article>
      </div>
    </div>
  );
}

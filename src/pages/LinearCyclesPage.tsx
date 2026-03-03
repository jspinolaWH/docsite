import { useLinearCycles, getCycleStatus, LinearCycle, CycleStatus } from '../hooks/useLinearCycles';

const STATUS_CONFIG: Record<CycleStatus, { label: string; color: string }> = {
  active:    { label: 'Active',    color: '#16a34a' },
  upcoming:  { label: 'Upcoming',  color: '#0891b2' },
  completed: { label: 'Completed', color: '#6b7280' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function CycleCard({ cycle }: { cycle: LinearCycle }) {
  const status = getCycleStatus(cycle);
  const { color } = STATUS_CONFIG[status];
  const pct = Math.round(cycle.progress * 100);
  const completedCount = Math.round(cycle.progress * cycle.issues.totalCount);

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderLeft: `4px solid ${color}`,
      borderRadius: '8px',
      padding: '1rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      opacity: status === 'completed' ? 0.75 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.95rem', lineHeight: 1.4 }}>
          {cycle.name || `Cycle ${cycle.number}`}
        </span>
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          color,
          border: `1px solid ${color}`,
          borderRadius: '4px',
          padding: '0 0.4rem',
          lineHeight: '1.7',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {STATUS_CONFIG[status].label}
        </span>
      </div>

      {cycle.team && (
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          {cycle.team.name}
        </div>
      )}

      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        {formatDate(cycle.startsAt)} → {formatDate(cycle.endsAt)}
      </div>

      <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        <span>{pct}% complete</span>
        <span>{completedCount} / {cycle.issues.totalCount} issues</span>
      </div>
    </div>
  );
}

export function LinearCyclesPage() {
  const { cycles, generatedAt, loading, error } = useLinearCycles();

  const grouped: Record<CycleStatus, LinearCycle[]> = { active: [], upcoming: [], completed: [] };
  cycles.forEach((c) => grouped[getCycleStatus(c)].push(c));
  grouped.completed.sort((a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime());

  return (
    <div className="doc-page">
      <div className="doc-layout">
        <article className="doc-article">
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              Linear Cycles
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Sprint cycle overview from Linear.
              {generatedAt && (
                <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', opacity: 0.75 }}>
                  Updated {new Date(generatedAt).toLocaleString('en-GB')}
                </span>
              )}
            </p>
          </div>

          {loading && (
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>
          )}

          {error && (
            <div style={{ padding: '1rem 1.25rem', background: '#fee2e2', borderRadius: '8px', color: '#991b1b', fontSize: '0.9rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && cycles.length === 0 && (
            <div style={{ padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                No cycle data available yet.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Data is generated during the GitHub Actions deploy. Make sure{' '}
                <code>LINEAR_API_KEY</code> is set as a repository secret.
              </p>
            </div>
          )}

          {!loading && !error && cycles.length > 0 && (
            <>
              {(['active', 'upcoming', 'completed'] as const).map((status) => {
                const list = grouped[status];
                if (!list.length) return null;
                const { label, color } = STATUS_CONFIG[status];
                return (
                  <section key={status} style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      {label}
                      <span style={{
                        background: color,
                        color: '#fff',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        padding: '0 0.45rem',
                        fontWeight: 700,
                      }}>
                        {list.length}
                      </span>
                    </h2>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                      gap: '1rem',
                    }}>
                      {list.map((c) => <CycleCard key={c.id} cycle={c} />)}
                    </div>
                  </section>
                );
              })}
            </>
          )}
        </article>
      </div>
    </div>
  );
}

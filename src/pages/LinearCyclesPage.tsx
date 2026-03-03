import { useState, useEffect, useMemo } from 'react';
import { useLinearCycles, getCycleStatus } from '../hooks/useLinearCycles';
import type { LinearCycle, LinearIssue, CycleStatus } from '../hooks/useLinearCycles';

const STATUS_CONFIG: Record<CycleStatus, { label: string; color: string }> = {
  active:    { label: 'Active',    color: '#16a34a' },
  upcoming:  { label: 'Upcoming',  color: '#0891b2' },
  completed: { label: 'Completed', color: '#6b7280' },
};

const PRIORITY: Record<number, { label: string; color: string }> = {
  0: { label: 'No priority', color: '#9ca3af' },
  1: { label: 'Urgent',      color: '#ef4444' },
  2: { label: 'High',        color: '#f97316' },
  3: { label: 'Medium',      color: '#eab308' },
  4: { label: 'Low',         color: '#3b82f6' },
};

function fmt(iso: string, short = true) {
  return new Date(iso).toLocaleDateString('en-GB', short
    ? { day: 'numeric', month: 'short' }
    : { day: 'numeric', month: 'short', year: 'numeric' }
  );
}

// ── Issue row ──────────────────────────────────────────────────────────────

function IssueRow({ issue, idx }: { issue: LinearIssue; idx: number }) {
  const pri = PRIORITY[issue.priority] ?? PRIORITY[0];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '110px 1fr 150px 120px 140px',
      gap: '0.75rem',
      alignItems: 'center',
      padding: '0.65rem 1.5rem',
      background: idx % 2 !== 0 ? 'var(--color-surface)' : 'transparent',
      borderBottom: '1px solid var(--color-border)',
      fontSize: '0.85rem',
    }}>
      {/* Identifier */}
      <a
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}
      >
        {issue.identifier}
      </a>

      {/* Title + optional due date */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{ color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.title}
        </div>
        {issue.dueDate && (
          <div style={{ fontSize: '0.75rem', color: '#f97316', marginTop: '1px' }}>
            Due {fmt(issue.dueDate)}
          </div>
        )}
      </div>

      {/* State */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: issue.state.color, flexShrink: 0 }} />
        <span style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.state.name}
        </span>
      </div>

      {/* Priority */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: pri.color, flexShrink: 0 }} />
        <span style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{pri.label}</span>
      </div>

      {/* Assignee */}
      <span style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {issue.assignee?.displayName ?? 'Unassigned'}
      </span>
    </div>
  );
}

// ── Cycle detail modal ─────────────────────────────────────────────────────

function CycleDetailModal({ cycle, onClose }: { cycle: LinearCycle; onClose: () => void }) {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const status = getCycleStatus(cycle);
  const { color } = STATUS_CONFIG[status];
  const pct = Math.round(cycle.progress * 100);
  const issues = cycle.issues.nodes;
  const completedCount = Math.round(cycle.progress * issues.length);

  const states    = useMemo(() => [...new Set(issues.map(i => i.state.name))].sort(), [issues]);
  const assignees = useMemo(() => [...new Set(issues.map(i => i.assignee?.displayName ?? 'Unassigned'))].sort(), [issues]);

  const filtered = useMemo(() => issues.filter(i => {
    const q = search.toLowerCase();
    if (q && !i.title.toLowerCase().includes(q) && !i.identifier.toLowerCase().includes(q)) return false;
    if (stateFilter && i.state.name !== stateFilter) return false;
    if (assigneeFilter && (i.assignee?.displayName ?? 'Unassigned') !== assigneeFilter) return false;
    if (priorityFilter && String(i.priority) !== priorityFilter) return false;
    return true;
  }), [issues, search, stateFilter, assigneeFilter, priorityFilter]);

  const sel: React.CSSProperties = {
    padding: '0.4rem 0.6rem',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    fontSize: '0.82rem',
    cursor: 'pointer',
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '2rem 1rem', overflowY: 'auto' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--color-surface)', borderRadius: '12px', width: '100%', maxWidth: '920px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)', overflow: 'hidden', marginBottom: '2rem' }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--color-border)', borderTop: `4px solid ${color}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                {cycle.name || `Cycle ${cycle.number}`}
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                {cycle.team?.name} · {fmt(cycle.startsAt, false)} → {fmt(cycle.endsAt, false)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color, border: `1px solid ${color}`, borderRadius: '4px', padding: '0 0.4rem', lineHeight: '1.7' }}>
                {STATUS_CONFIG[status].label}
              </span>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', fontSize: '1.4rem', lineHeight: 1, padding: '0 0.2rem' }}>
                ×
              </button>
            </div>
          </div>
          <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.4rem' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            {pct}% complete · {completedCount} / {issues.length} issues
          </div>
        </div>

        {/* Filters */}
        <div style={{ padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', background: 'var(--color-surface)' }}>
          <input
            type="text"
            placeholder="Search by title or ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...sel, flex: '1 1 180px' }}
          />
          <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} style={sel}>
            <option value="">All states</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={assigneeFilter} onChange={e => setAssigneeFilter(e.target.value)} style={sel}>
            <option value="">All assignees</option>
            {assignees.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={sel}>
            <option value="">All priorities</option>
            {[1, 2, 3, 4, 0].map(p => <option key={p} value={String(p)}>{PRIORITY[p].label}</option>)}
          </select>
        </div>

        {/* Column headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '110px 1fr 150px 120px 140px',
          gap: '0.75rem',
          padding: '0.5rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--color-text-secondary)',
        }}>
          <span>ID</span>
          <span>Title</span>
          <span>State</span>
          <span>Priority</span>
          <span>Assignee</span>
        </div>

        {/* Issue rows */}
        <div style={{ maxHeight: '460px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              No issues match your filters.
            </div>
          ) : (
            filtered.map((issue, idx) => <IssueRow key={issue.id} issue={issue} idx={idx} />)
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '0.65rem 1.5rem', borderTop: '1px solid var(--color-border)', fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>
          Showing {filtered.length} of {issues.length} issues
        </div>
      </div>
    </div>
  );
}

// ── Cycle card ─────────────────────────────────────────────────────────────

function CycleCard({ cycle, onClick }: { cycle: LinearCycle; onClick: () => void }) {
  const status = getCycleStatus(cycle);
  const { color } = STATUS_CONFIG[status];
  const pct = Math.round(cycle.progress * 100);
  const total = cycle.issues.nodes.length;
  const completedCount = Math.round(cycle.progress * total);

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--color-surface)',
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

      {cycle.team && (
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{cycle.team.name}</div>
      )}

      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        {fmt(cycle.startsAt)} → {fmt(cycle.endsAt)}
      </div>

      <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        <span>{pct}% complete</span>
        <span>{completedCount} / {total} issues</span>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export function LinearCyclesPage() {
  const { cycles, loading, error } = useLinearCycles();
  const [selected, setSelected] = useState<LinearCycle | null>(null);

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
              Sprint cycle overview from Linear. Click any cycle to see its issues.
            </p>
          </div>

          {loading && <p style={{ color: 'var(--color-text-secondary)' }}>Loading…</p>}

          {error && (
            <div style={{ padding: '1rem 1.25rem', background: '#fee2e2', borderRadius: '8px', color: '#991b1b', fontSize: '0.9rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && cycles.length === 0 && (
            <div style={{ padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>No cycle data available yet.</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Make sure <code>LINEAR_API_KEY</code> is set as a GitHub repository secret and the site has been redeployed.
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
                    <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {label}
                      <span style={{ background: color, color: '#fff', borderRadius: '999px', fontSize: '0.72rem', padding: '0 0.45rem', fontWeight: 700 }}>
                        {list.length}
                      </span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                      {list.map((c) => (
                        <CycleCard key={c.id} cycle={c} onClick={() => setSelected(c)} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </>
          )}
        </article>
      </div>

      {selected && <CycleDetailModal cycle={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

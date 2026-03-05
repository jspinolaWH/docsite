import { useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useLinearCycleIssues, getCycleStatus, issuePoints, estimateCoverage } from '../hooks/useLinearCycles';
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

function IssueRow({ issue, idx }: { issue: LinearIssue; idx: number }) {
  const pri = PRIORITY[issue.priority] ?? PRIORITY[0];
  const pts = issuePoints(issue);
  const hasEst = issue.estimate != null;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '110px 1fr 150px 120px 120px 80px',
      gap: '0.75rem',
      alignItems: 'center',
      padding: '0.65rem 1rem',
      background: idx % 2 !== 0 ? 'var(--color-bg-secondary)' : 'transparent',
      borderBottom: '1px solid var(--color-border)',
      fontSize: '0.85rem',
    }}>
      <a href={issue.url} target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.8rem' }}>
        {issue.identifier}
      </a>

      <div style={{ overflow: 'hidden' }}>
        <div style={{ color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.title}
        </div>
        {issue.dueDate && (
          <div style={{ fontSize: '0.75rem', color: '#f97316', marginTop: '1px' }}>Due {fmt(issue.dueDate)}</div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: issue.state.color, flexShrink: 0 }} />
        <span style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.state.name}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: pri.color, flexShrink: 0 }} />
        <span style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{pri.label}</span>
      </div>

      <span style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {issue.assignee?.displayName ?? 'Unassigned'}
      </span>

      <span
        title={hasEst ? `${pts} pts (estimated)` : 'No estimate — using default of 3 pts'}
        style={{ color: hasEst ? 'var(--color-text-primary)' : '#9ca3af', whiteSpace: 'nowrap', fontSize: '0.8rem', fontStyle: hasEst ? 'normal' : 'italic' }}>
        {hasEst ? `${pts} pts` : '~3 pts'}
      </span>
    </div>
  );
}

interface AssigneeGroup {
  name: string;
  issues: LinearIssue[];
  totalPts: number;
  donePts: number;
  inProgressPts: number;
  hasUnestimated: boolean;
}

function AssigneeView({ issues }: { issues: LinearIssue[] }) {
  const groups = useMemo<AssigneeGroup[]>(() => {
    const map = new Map<string, LinearIssue[]>();
    for (const issue of issues) {
      const name = issue.assignee?.displayName ?? 'Unassigned';
      const arr = map.get(name) ?? [];
      arr.push(issue);
      map.set(name, arr);
    }
    return [...map.entries()]
      .map(([name, issList]) => {
        const totalPts = issList.reduce((s, i) => s + issuePoints(i), 0);
        const donePts = issList
          .filter(i => i.state.type === 'completed')
          .reduce((s, i) => s + issuePoints(i), 0);
        const inProgressPts = issList
          .filter(i => i.state.type === 'started')
          .reduce((s, i) => s + issuePoints(i), 0);
        const hasUnestimated = issList.some(i => i.estimate == null);
        return { name, issues: issList, totalPts, donePts, inProgressPts, hasUnestimated };
      })
      .sort((a, b) => b.totalPts - a.totalPts);
  }, [issues]);

  if (groups.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        No issues to display.
      </div>
    );
  }

  return (
    <div>
      {groups.map((g) => {
        const donePct = g.totalPts > 0 ? Math.round((g.donePts / g.totalPts) * 100) : 0;
        const inProgPct = g.totalPts > 0 ? Math.round((g.inProgressPts / g.totalPts) * 100) : 0;
        const combinedPct = Math.min(donePct + inProgPct, 100);
        return (
          <div key={g.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
            {/* Assignee header */}
            <div style={{
              padding: '0.875rem 1rem',
              background: 'var(--color-bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', minWidth: '140px', fontSize: '0.9rem' }}>
                {g.name}
              </div>

              <div style={{ flex: 1, maxWidth: '220px' }}>
                <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.25rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${donePct}%`, background: '#16a34a', borderRadius: '3px', transition: 'width 0.3s' }} />
                  {inProgPct > 0 && (
                    <div style={{ position: 'absolute', left: `${donePct}%`, top: 0, bottom: 0, width: `${inProgPct}%`, background: '#f59e0b', borderRadius: '3px', transition: 'width 0.3s' }} />
                  )}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', display: 'flex', gap: '0.5rem' }}>
                  <span>{donePct}% done</span>
                  {inProgPct > 0 && <span style={{ color: '#d97706' }}>{combinedPct}% incl. in progress</span>}
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>{g.totalPts}</strong> pts · {g.issues.length} issue{g.issues.length !== 1 ? 's' : ''}
                {g.hasUnestimated && <span style={{ color: '#9ca3af', marginLeft: '0.4rem' }}>(*some estimated)</span>}
              </div>
            </div>

            {/* Issues under this assignee */}
            {g.issues.map((issue, idx) => {
              const pts = issuePoints(issue);
              const hasEst = issue.estimate != null;
              const isDone = issue.state.type === 'completed';
              return (
                <div key={issue.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr 150px 80px',
                  gap: '0.75rem',
                  alignItems: 'center',
                  padding: '0.5rem 1rem 0.5rem 2.5rem',
                  background: idx % 2 === 0 ? 'transparent' : 'var(--color-bg-secondary)',
                  fontSize: '0.82rem',
                  opacity: isDone ? 0.6 : 1,
                }}>
                  <a href={issue.url} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.78rem' }}>
                    {issue.identifier}
                  </a>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: issue.state.color, flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {issue.title}
                    </span>
                  </div>

                  <span style={{ color: 'var(--color-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                    {issue.state.name}
                  </span>

                  <span
                    title={hasEst ? `${pts} pts (estimated)` : 'No estimate — using default of 3 pts'}
                    style={{ color: hasEst ? 'var(--color-text-primary)' : '#9ca3af', whiteSpace: 'nowrap', fontStyle: hasEst ? 'normal' : 'italic' }}>
                    {hasEst ? `${pts} pts` : '~3 pts'}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      <div style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
        ~3 pts = no estimate set in Linear (using default of 3)
      </div>
    </div>
  );
}

export function LinearCycleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const cycle = (location.state as { cycle?: LinearCycle } | null)?.cycle;

  const { issues, loading, error } = useLinearCycleIssues(id!);

  const [view, setView] = useState<'table' | 'people'>('table');
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const status: CycleStatus | null = cycle ? getCycleStatus(cycle) : null;
  const color = status ? STATUS_CONFIG[status].color : '#6b7280';
  const donePct = cycle ? Math.round(cycle.progress * 100) : 0;
  const totalIssues = cycle?.issueCountHistory?.at(-1) ?? 0;
  const inProgressScope = cycle?.inProgressScopeHistory?.at(-1) ?? 0;
  const inProgressPct = totalIssues > 0 ? Math.round((inProgressScope / totalIssues) * 100) : 0;
  const combinedPct = Math.min(donePct + inProgressPct, 100);

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
    background: 'var(--color-bg-secondary)',
    color: 'var(--color-text-primary)',
    fontSize: '0.82rem',
    cursor: 'pointer',
  };

  const tabBtn = (active: boolean): React.CSSProperties => ({
    padding: '0.35rem 0.85rem',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    background: active ? color : 'var(--color-bg-secondary)',
    color: active ? '#fff' : 'var(--color-text-secondary)',
    fontSize: '0.82rem',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    transition: 'background 0.15s, color 0.15s',
  });

  return (
    <div className="doc-page">
      <div className="doc-layout">
        <article className="doc-article">

          {/* Back link */}
          <Link to="/cycles" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', textDecoration: 'none', marginBottom: '1.5rem' }}>
            ← Back to Cycles
          </Link>

          {/* Cycle header */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', borderTop: `4px solid ${color}`, paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  {cycle?.name || (cycle ? `Cycle ${cycle.number}` : `Cycle ${id}`)}
                </h1>
                {cycle && (
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {cycle.team?.name} · {fmt(cycle.startsAt, false)} → {fmt(cycle.endsAt, false)}
                  </div>
                )}
              </div>
              {status && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color, border: `1px solid ${color}`, borderRadius: '4px', padding: '0.2rem 0.5rem', whiteSpace: 'nowrap' }}>
                  {STATUS_CONFIG[status].label}
                </span>
              )}
            </div>

            {cycle && (
              <>
                <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.4rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${donePct}%`, background: color, borderRadius: '3px' }} />
                  {inProgressPct > 0 && (
                    <div style={{ position: 'absolute', left: `${donePct}%`, top: 0, bottom: 0, width: `${inProgressPct}%`, background: '#f59e0b', borderRadius: '3px' }} />
                  )}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span>{donePct}% done{inProgressPct > 0 && <span style={{ color: '#d97706', marginLeft: '0.5rem' }}>{combinedPct}% incl. in progress</span>}{!loading && ` · ${issues.length} issues`}</span>
                  {!loading && issues.length > 0 && (
                    <span style={{ color: '#9ca3af' }}>{estimateCoverage(issues)}</span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Loading / error */}
          {loading && <p style={{ color: 'var(--color-text-secondary)' }}>Loading issues…</p>}
          {error && (
            <div style={{ padding: '1rem', background: '#fee2e2', borderRadius: '8px', color: '#991b1b', fontSize: '0.9rem' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {!loading && !error && (
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden' }}>

              {/* View toggle + filters */}
              <div style={{ padding: '0.875rem 1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', background: 'var(--color-bg-secondary)', alignItems: 'center' }}>
                {/* View toggle */}
                <div style={{ display: 'flex', gap: '0.4rem', marginRight: '0.5rem' }}>
                  <button onClick={() => setView('table')} style={tabBtn(view === 'table')}>Table</button>
                  <button onClick={() => setView('people')} style={tabBtn(view === 'people')}>By Person</button>
                </div>

                {view === 'table' && (
                  <>
                    <input type="text" placeholder="Search by title or ID…" value={search} onChange={e => setSearch(e.target.value)}
                      style={{ ...sel, flex: '1 1 180px' }} />
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
                  </>
                )}
              </div>

              {view === 'table' ? (
                <>
                  {/* Column headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 150px 120px 120px 80px', gap: '0.75rem', padding: '0.5rem 1rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)', background: 'var(--color-bg-secondary)' }}>
                    <span>ID</span><span>Title</span><span>State</span><span>Priority</span><span>Assignee</span><span>Points</span>
                  </div>

                  {/* Rows */}
                  {filtered.length === 0
                    ? <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>No issues match your filters.</div>
                    : filtered.map((issue, idx) => <IssueRow key={issue.id} issue={issue} idx={idx} />)
                  }

                  {/* Footer */}
                  <div style={{ padding: '0.65rem 1rem', borderTop: '1px solid var(--color-border)', fontSize: '0.78rem', color: 'var(--color-text-secondary)', background: 'var(--color-bg-secondary)' }}>
                    Showing {filtered.length} of {issues.length} issues · <strong><em>~3 pts</em> = no estimate set (default)</strong>
                  </div>
                </>
              ) : (
                <AssigneeView issues={issues} />
              )}

            </div>
          )}

        </article>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

export interface LinearIssue {
  id: string;
  title: string;
  identifier: string;
  priority: number;
  url: string;
  dueDate?: string;
  estimate?: number;
  state: { name: string; color: string; type: string };
  assignee?: { displayName: string };
  parent?: { id: string };
}

export function issuePoints(issue: LinearIssue): number {
  return issue.estimate ?? 3;
}

export function estimateCoverage(issues: LinearIssue[]): string {
  const withEst = issues.filter(i => i.estimate != null).length;
  return `${withEst} of ${issues.length} estimated`;
}

export interface LinearCycle {
  id: string;
  name?: string;
  number: number;
  startsAt: string;
  endsAt: string;
  completedAt?: string;
  progress: number;
  inProgressScopeHistory: number[];
  issueCountHistory: number[];
  team: { id: string; name: string };
}

export type CycleStatus = 'active' | 'upcoming' | 'completed';

export function getCycleStatus(cycle: LinearCycle): CycleStatus {
  const now = new Date();
  const start = new Date(cycle.startsAt);
  const end = new Date(cycle.endsAt);
  if (cycle.completedAt || end < now) return 'completed';
  if (start > now) return 'upcoming';
  return 'active';
}

// ── Fetch all cycles (summary only, no issues) ─────────────────────────────

const CYCLES_QUERY = `
  query {
    cycles(first: 50) {
      nodes {
        id
        name
        number
        startsAt
        endsAt
        completedAt
        progress
        inProgressScopeHistory
        issueCountHistory
        team { id name }
      }
    }
  }
`;

async function linearFetch(query: string, variables?: Record<string, unknown>) {
  const apiKey = import.meta.env.VITE_LINEAR_API_KEY as string | undefined;
  if (!apiKey) throw new Error('MISSING_KEY');

  const res = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: apiKey },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

export function useLinearCycles() {
  const [cycles, setCycles] = useState<LinearCycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    linearFetch(CYCLES_QUERY)
      .then((data) => setCycles(data.cycles.nodes))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { cycles, loading, error };
}

// ── Fetch issues for a single cycle (called when modal opens) ──────────────

const CYCLE_ISSUES_QUERY = `
  query CycleIssues($id: String!) {
    cycle(id: $id) {
      issues(first: 100) {
        nodes {
          id
          title
          identifier
          priority
          url
          dueDate
          estimate
          state { name color type }
          assignee { displayName }
          parent { id }
        }
      }
    }
  }
`;

export function useLinearCycleIssues(cycleId: string) {
  const [issues, setIssues] = useState<LinearIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    linearFetch(CYCLE_ISSUES_QUERY, { id: cycleId })
      .then((data) => setIssues(data.cycle.issues.nodes))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cycleId]);

  return { issues, loading, error };
}

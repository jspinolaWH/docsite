import { useState, useEffect } from 'react';

export interface LinearIssue {
  id: string;
  title: string;
  identifier: string;
  priority: number;
  url: string;
  state: { name: string; color: string; type: string };
  assignee?: { displayName: string };
}

export interface LinearCycle {
  id: string;
  name?: string;
  number: number;
  startsAt: string;
  endsAt: string;
  completedAt?: string;
  progress: number;
  team: { id: string; name: string };
  issues: { nodes: LinearIssue[] };
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

const QUERY = `
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
        team { id name }
        issues(first: 50) {
          nodes {
            id
            title
            identifier
            priority
            url
            state { name color type }
            assignee { displayName }
          }
        }
      }
    }
  }
`;

export function useLinearCycles() {
  const [cycles, setCycles] = useState<LinearCycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_LINEAR_API_KEY as string | undefined;

    if (!apiKey) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify({ query: QUERY }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json.errors?.length) throw new Error(json.errors[0].message);
        setCycles(json.data.cycles.nodes);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { cycles, loading, error };
}

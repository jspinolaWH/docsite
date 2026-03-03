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
  issues: { totalCount: number; nodes: LinearIssue[] };
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

export function useLinearCycles() {
  const [cycles, setCycles] = useState<LinearCycle[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}linear-cycles.json`)
      .then((res) => {
        if (res.status === 404) return { generatedAt: null, cycles: [] };
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setCycles(data.cycles ?? []);
        setGeneratedAt(data.generatedAt ?? null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { cycles, generatedAt, loading, error };
}

#!/usr/bin/env node
// Fetches cycle data from Linear and writes it to public/linear-cycles.json
// Runs during GitHub Actions deploy via LINEAR_API_KEY secret.

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.LINEAR_API_KEY;
const OUT_PATH = path.join(__dirname, '..', 'public', 'linear-cycles.json');

function writeEmpty(reason) {
  console.warn(`[linear] ${reason} — writing empty cycles data`);
  fs.writeFileSync(OUT_PATH, JSON.stringify({ generatedAt: null, cycles: [] }, null, 2));
}

if (!API_KEY) {
  writeEmpty('LINEAR_API_KEY not set');
  process.exit(0);
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
          totalCount
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

async function main() {
  console.log('[linear] Fetching cycles...');

  const res = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
    },
    body: JSON.stringify({ query: QUERY }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);

  const cycles = json.data.cycles.nodes;
  const output = { generatedAt: new Date().toISOString(), cycles };

  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));
  console.log(`[linear] Written ${cycles.length} cycles to public/linear-cycles.json`);
}

main().catch((err) => {
  console.error('[linear] Fetch failed:', err.message);
  writeEmpty('fetch failed');
  process.exit(0); // don't block the deploy
});

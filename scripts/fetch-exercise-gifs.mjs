#!/usr/bin/env node
// Pre-fetches exercise GIF URLs from ExerciseDB and writes src/data/exerciseGifs.json
// Run: node scripts/fetch-exercise-gifs.mjs

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// All exercises that need GIFs: exerciseId → gifQuery
const EXERCISES = {
  pushup:           'push up',
  diamond_pushup:   'diamond push up',
  pike_pushup:      'pike push up',
  dip:              'dip',
  ring_pushup:      'push up',
  pullup:           'pull up',
  chinup:           'chin up',
  ring_row:         'inverted row',
  muscle_up:        'muscle up',
  commando_pullup:  'commando pull up',
  plank:            'plank',
  lsit:             'l sit',
  hollow_body:      'hollow body',
  hanging_leg_raise:'hanging leg raise',
  situp:            'sit up',
  mountain_climber: 'mountain climber',
  superman:         'superman',
  squat:            'bodyweight squat',
  jump_squat:       'jump squat',
  lunge:            'walking lunge',
  pistol_squat:     'pistol squat',
  burpee:           'burpee',
  jumping_jack:     'jumping jack',
  ring_muscle_up:   'muscle up',
};

// Unique queries only (some exercises share the same query)
const UNIQUE_QUERIES = [...new Set(Object.values(EXERCISES))];

async function fetchWithRedirects(url, timeout = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

async function fetchGifUrlForQuery(query) {
  const encoded = encodeURIComponent(query);

  // URL candidates to try in order
  const candidates = [
    `https://v1.exercisedb.dev/exercises/name/${encoded}?limit=10`,
    `https://v1.exercisedb.dev/api/v1/exercises/name/${encoded}?limit=10`,
    `https://exercisedb-api.vercel.app/api/v1/exercises/name/${encoded}?limit=10`,
  ];

  for (const url of candidates) {
    try {
      console.log(`  Trying: ${url}`);
      const res = await fetchWithRedirects(url);
      console.log(`  Status: ${res.status} (final URL: ${res.url})`);

      if (!res.ok) {
        const text = await res.text();
        console.log(`  Body: ${text.slice(0, 150)}`);
        continue;
      }

      const data = await res.json();
      // Handle both array and wrapped responses
      const list = Array.isArray(data) ? data
        : Array.isArray(data?.data) ? data.data
        : Array.isArray(data?.exercises) ? data.exercises
        : [];

      if (list.length === 0) {
        console.log(`  No results for "${query}"`);
        continue;
      }

      // Prefer body weight exercises, otherwise take first with a gifUrl
      const best = list.find(e => e.gifUrl && e.equipment === 'body weight')
                ?? list.find(e => e.gifUrl);

      if (best?.gifUrl) {
        console.log(`  Found: ${best.gifUrl}`);
        return best.gifUrl;
      }

      // Log first item structure to understand the schema
      console.log(`  First item keys: ${Object.keys(list[0]).join(', ')}`);
      console.log(`  Sample: ${JSON.stringify(list[0]).slice(0, 200)}`);
    } catch (e) {
      console.warn(`  Error: ${e.message}`);
    }
  }

  return null;
}

async function main() {
  console.log('Fetching exercise GIF URLs...\n');

  const gifMap = {}; // query → gifUrl

  for (const query of UNIQUE_QUERIES) {
    console.log(`\n[${query}]`);
    const url = await fetchGifUrlForQuery(query);
    gifMap[query] = url;
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  // Build exerciseId → gifUrl map
  const result = {};
  for (const [exerciseId, query] of Object.entries(EXERCISES)) {
    result[exerciseId] = gifMap[query] ?? null;
  }

  // Summary
  const found = Object.values(result).filter(Boolean).length;
  console.log(`\n✓ Found ${found}/${Object.keys(result).length} GIF URLs\n`);

  // Write JSON
  const outPath = path.join(__dirname, '../src/data/exerciseGifs.json');
  await fs.writeFile(outPath, JSON.stringify(result, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch(console.error);

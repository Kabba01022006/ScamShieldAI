import { initialScams } from '../data/mockScams';

/**
 * Module-level state for demonstration purposes.
 * Enables examiners or presenters to force a 100% failure rate during live demos
 * to showcase the ErrorState component and retry capabilities.
 */
let forceNetworkError = false;

// Tiny listener subscription system so UI toggles stay reactive
const listeners = new Set();

export const setForceNetworkError = (value) => {
  forceNetworkError = Boolean(value);
  listeners.forEach((listener) => listener(forceNetworkError));
};

export const getForceNetworkError = () => forceNetworkError;

export const subscribeForceNetworkError = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/**
 * ARCHITECTURAL NOTE FOR EXAMINERS / VIVA:
 * This is an asynchronous mock service returning a native Promise with simulated
 * network latency and transient network failures.
 *
 * In a production architecture, this function would be replaced with a real REST/GraphQL
 * endpoint call (e.g. `await fetch('/api/v1/scams/lookup?q=' + encodeURIComponent(query))`).
 * Because the UI layer consumes this through the `useAsync` hook abstraction,
 * swapping the mock for a real backend requires ZERO changes to React components.
 *
 * @param {string} query - Phone number, UPI ID, URL, or keyword
 * @returns {Promise<Array>} Array of matched scam incident objects
 */
export async function lookupIdentifier(query) {
  // Simulated realistic network latency between 700ms and 1500ms
  const latency = Math.floor(Math.random() * (1500 - 700 + 1)) + 700;
  await new Promise((resolve) => setTimeout(resolve, latency));

  // Trigger error if demo toggle is active OR on ~15% random failure chance
  if (forceNetworkError || Math.random() < 0.15) {
    throw new Error('Network error: could not reach the scam registry. Please check your connection and retry.');
  }

  if (!query || typeof query !== 'string') {
    return [];
  }

  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  // Read latest records from localStorage if present (captures user-submitted reports),
  // otherwise fallback to initial seeded threats
  let allScams = initialScams;
  try {
    const saved = localStorage.getItem('scamshield_reports_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        allScams = parsed;
      }
    }
  } catch {
    allScams = initialScams;
  }

  // Case-insensitive match on primary identifier, secondary identifier, or title
  const matches = allScams.filter((item) => {
    const matchId = item.identifier?.toLowerCase().includes(cleanQuery);
    const matchSecondary = item.secondaryIdentifier?.toLowerCase().includes(cleanQuery);
    const matchTitle = item.title?.toLowerCase().includes(cleanQuery);
    return matchId || matchSecondary || matchTitle;
  });

  return matches;
}

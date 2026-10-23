/**
 * ============================================================================
 * STATE ARCHITECTURE: ZUSTAND STORE - CYBER SAFETY PROFILE
 * ============================================================================
 * Why Zustand for this feature?
 * - High-frequency, cross-cutting state: Safety score, badges, and counters
 *   update from multiple actions across different pages (AI Analyzer, Report Form,
 *   Interactive Quiz) and must reflect instantly in the Navbar score ring.
 * - Fine-grained selector subscriptions: Components subscribe only to the slices
 *   they need (e.g. `useSafetyStore(s => s.score)`), avoiding unnecessary re-renders.
 * - Why ThemeContext & AuthContext remain Context:
 *   Theme and Auth are low-frequency, coarse-grained app configuration and session
 *   state that rarely change and do not need selector optimization or dedicated stores.
 * ============================================================================
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// All badge definitions and unlock criteria
export const BADGES = [
  {
    id: 'phish-spotter',
    name: 'Phish Spotter',
    description: 'Identified 3 cyber threat quiz questions correctly.',
    requirement: 'Answer 3 quiz questions correctly',
    icon: '🎯'
  },
  {
    id: 'sharp-eye',
    name: 'Sharp Eye',
    description: 'Maintained a flawless streak of 5 correct quiz answers in a row.',
    requirement: 'Answer 5 quiz questions correctly in a row',
    icon: '👁️'
  },
  {
    id: 'first-scan',
    name: 'First Scan',
    description: 'Scanned your first suspicious message with AI Neural Engine.',
    requirement: 'Run 1 AI heuristic scam analysis',
    icon: '⚡'
  },
  {
    id: 'citizen-reporter',
    name: 'Citizen Reporter',
    description: 'Contributed a verified scam report to the National Registry.',
    requirement: 'Submit 1 cyber fraud incident report',
    icon: '🛡️'
  },
  {
    id: 'shield-master',
    name: 'Shield Master',
    description: 'Attained a Cyber Safety Score of 80+ points.',
    requirement: 'Reach an overall safety score of 80 or above',
    icon: '👑'
  }
];

// Helper to evaluate and unlock badges dynamically
const evaluateBadges = (currentBadges, score, quizHistory, scanCount, reportCount) => {
  const unlocked = new Set(currentBadges);

  // 1. Phish Spotter: 3 total correct answers
  const correctCount = quizHistory.filter((q) => q.correct).length;
  if (correctCount >= 3) {
    unlocked.add('phish-spotter');
  }

  // 2. Sharp Eye: 5 correct answers in a row
  let consecutive = 0;
  let hasFiveInARow = false;
  for (const item of quizHistory) {
    if (item.correct) {
      consecutive++;
      if (consecutive >= 5) {
        hasFiveInARow = true;
        break;
      }
    } else {
      consecutive = 0;
    }
  }
  if (hasFiveInARow) {
    unlocked.add('sharp-eye');
  }

  // 3. First Scan: 1 or more scans
  if (scanCount >= 1) {
    unlocked.add('first-scan');
  }

  // 4. Citizen Reporter: 1 or more reports submitted
  if (reportCount >= 1) {
    unlocked.add('citizen-reporter');
  }

  // 5. Shield Master: score >= 80
  if (score >= 80) {
    unlocked.add('shield-master');
  }

  return Array.from(unlocked);
};

// Clamp helper to ensure score stays within [0, 100]
const clampScore = (value) => Math.max(0, Math.min(100, value));

export const useSafetyStore = create(
  persist(
    (set) => ({
      // State
      score: 20,
      badges: [],
      quizHistory: [],
      scanCount: 0,
      reportCount: 0,

      // Actions
      answerQuiz: (questionId, correct) => {
        set((state) => {
          const delta = correct ? 5 : -2;
          const nextScore = clampScore(state.score + delta);
          const nextHistory = [
            ...state.quizHistory,
            { questionId, correct, timestamp: Date.now() }
          ];
          const nextBadges = evaluateBadges(
            state.badges,
            nextScore,
            nextHistory,
            state.scanCount,
            state.reportCount
          );

          return {
            score: nextScore,
            quizHistory: nextHistory,
            badges: nextBadges
          };
        });
      },

      recordScan: () => {
        set((state) => {
          // Only the first 10 scans award points (+3 points each)
          const awardsPoints = state.scanCount < 10;
          const nextScore = awardsPoints
            ? clampScore(state.score + 3)
            : state.score;
          const nextScanCount = state.scanCount + 1;
          const nextBadges = evaluateBadges(
            state.badges,
            nextScore,
            state.quizHistory,
            nextScanCount,
            state.reportCount
          );

          return {
            score: nextScore,
            scanCount: nextScanCount,
            badges: nextBadges
          };
        });
      },

      recordReport: () => {
        set((state) => {
          const nextScore = clampScore(state.score + 10);
          const nextReportCount = state.reportCount + 1;
          const nextBadges = evaluateBadges(
            state.badges,
            nextScore,
            state.quizHistory,
            state.scanCount,
            nextReportCount
          );

          return {
            score: nextScore,
            reportCount: nextReportCount,
            badges: nextBadges
          };
        });
      },

      resetProfile: () => {
        set({
          score: 20,
          badges: [],
          quizHistory: [],
          scanCount: 0,
          reportCount: 0
        });
      }
    }),
    {
      name: 'scamshield-safety',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

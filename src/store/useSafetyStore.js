/**
 * ============================================================================
 * STATE ARCHITECTURE: ZUSTAND STORE - CYBER SAFETY PROFILE & APP STATE
 * ============================================================================
 * Why Zustand for this feature?
 * - Cross-cutting state: Scam awareness level, badges, recent checks, recovery progress,
 *   and activity counters are accessed and modified across multiple pages
 *   (Check Before You Pay, Recovery Mode, Quiz, Report Form) and reflected in Navbar.
 * - Selective Subscriptions: Components subscribe only to the slices they need
 *   (e.g. `useSafetyStore(s => s.score)` or `useSafetyStore(s => s.recovery)`),
 *   eliminating wasteful re-renders.
 * - Out-of-the-box Persistence: Synchronizes seamlessly with browser localStorage
 *   via the `persist` middleware.
 * - Meaningful Metrics: Scam Awareness Level is computed directly from quiz accuracy
 *   per scam scenario, rather than arbitrary points for clicks or scans.
 * ============================================================================
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// All badge definitions and unlock criteria
export const BADGES = [
  {
    id: 'phish-spotter',
    name: 'Phish Spotter',
    description: 'Accurately classified 3 cyber threat scenarios in the drill.',
    requirement: 'Answer 3 quiz questions correctly',
    icon: '🎯'
  },
  {
    id: 'sharp-eye',
    name: 'Sharp Eye',
    description: 'Maintained a flawless streak of 5 correct threat assessments in a row.',
    requirement: 'Answer 5 quiz questions correctly in a row',
    icon: '👁️'
  },
  {
    id: 'registry-scout',
    name: 'Registry Scout',
    description: 'Verified a suspicious phone number or UPI handle on Check Before You Pay.',
    requirement: 'Perform 1 scam registry lookup',
    icon: '🔍'
  },
  {
    id: 'citizen-reporter',
    name: 'Citizen Reporter',
    description: 'Contributed a verified scam report to the National Threat Registry.',
    requirement: 'Submit 1 cyber fraud incident report',
    icon: '🛡️'
  },
  {
    id: 'recovery-responder',
    name: 'Recovery Responder',
    description: 'Completed all 6 critical Golden Hour emergency recovery actions.',
    requirement: 'Complete the emergency recovery checklist',
    icon: '⚡'
  }
];

// Helper to calculate Scam Awareness Level (0-100%) purely from quiz category accuracy
export const calculateAwarenessLevel = (quizStats) => {
  const entries = Object.values(quizStats || {});
  if (entries.length === 0) return 0;

  const totalAttempted = entries.reduce((acc, curr) => acc + (curr.attempted || 0), 0);
  const totalCorrect = entries.reduce((acc, curr) => acc + (curr.correct || 0), 0);

  if (totalAttempted === 0) return 0;
  return Math.round((totalCorrect / totalAttempted) * 100);
};

// Helper to evaluate and unlock badges dynamically based on real achievements
const evaluateBadges = (
  currentBadges,
  quizHistory,
  lookupCount,
  reportCount,
  recoverySteps = []
) => {
  const unlocked = new Set(currentBadges || []);

  // 1. Phish Spotter: 3 or more total correct answers
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

  // 3. Registry Scout: 1 or more registry lookups performed
  if (lookupCount >= 1) {
    unlocked.add('registry-scout');
  }

  // 4. Citizen Reporter: 1 or more reports submitted
  if (reportCount >= 1) {
    unlocked.add('citizen-reporter');
  }

  // 5. Recovery Responder: all 6 checklist steps completed
  if (recoverySteps && recoverySteps.length >= 6) {
    unlocked.add('recovery-responder');
  }

  return Array.from(unlocked);
};

export const useSafetyStore = create(
  persist(
    (set, get) => ({
      // State
      score: 0, // Scam Awareness Level (0-100) derived from quiz accuracy
      badges: [],
      quizHistory: [],
      quizStats: {}, // { [questionId]: { correct: number, attempted: number } }
      scanCount: 0, // Plain activity stat
      reportCount: 0, // Plain activity stat
      lookupCount: 0, // Plain activity stat
      recentChecks: [], // Last 5 queries (persisted)
      recovery: {
        startedAt: null,
        completedSteps: [],
      },

      // Actions
      answerQuiz: (questionId, correct) => {
        set((state) => {
          const prevStat = state.quizStats[questionId] || { correct: 0, attempted: 0 };
          const nextQuizStats = {
            ...state.quizStats,
            [questionId]: {
              correct: prevStat.correct + (correct ? 1 : 0),
              attempted: prevStat.attempted + 1,
            },
          };

          const nextHistory = [
            ...state.quizHistory,
            { questionId, correct, timestamp: Date.now() },
          ];

          const nextScore = calculateAwarenessLevel(nextQuizStats);

          const nextBadges = evaluateBadges(
            state.badges,
            nextHistory,
            state.lookupCount,
            state.reportCount,
            state.recovery?.completedSteps || []
          );

          return {
            score: nextScore,
            quizStats: nextQuizStats,
            quizHistory: nextHistory,
            badges: nextBadges,
          };
        });
      },

      recordScan: () => {
        set((state) => ({
          scanCount: state.scanCount + 1,
        }));
      },

      recordReport: () => {
        set((state) => {
          const nextReportCount = state.reportCount + 1;
          const nextBadges = evaluateBadges(
            state.badges,
            state.quizHistory,
            state.lookupCount,
            nextReportCount,
            state.recovery?.completedSteps || []
          );

          return {
            reportCount: nextReportCount,
            badges: nextBadges,
          };
        });
      },

      addRecentCheck: (query) => {
        if (!query || !query.trim()) return;
        const cleanQuery = query.trim();

        set((state) => {
          // Keep last 5 unique queries (most recent first)
          const filtered = (state.recentChecks || []).filter(
            (q) => q.toLowerCase() !== cleanQuery.toLowerCase()
          );
          const nextChecks = [cleanQuery, ...filtered].slice(0, 5);
          const nextLookupCount = (state.lookupCount || 0) + 1;

          const nextBadges = evaluateBadges(
            state.badges,
            state.quizHistory,
            nextLookupCount,
            state.reportCount,
            state.recovery?.completedSteps || []
          );

          return {
            recentChecks: nextChecks,
            lookupCount: nextLookupCount,
            badges: nextBadges,
          };
        });
      },

      clearRecentChecks: () => {
        set({ recentChecks: [] });
      },

      // Recovery mode actions
      startRecovery: () => {
        set((state) => {
          if (state.recovery?.startedAt) return state;
          return {
            recovery: {
              startedAt: Date.now(),
              completedSteps: state.recovery?.completedSteps || [],
            },
          };
        });
      },

      toggleRecoveryStep: (stepId) => {
        set((state) => {
          const currentSteps = state.recovery?.completedSteps || [];
          const isCompleted = currentSteps.includes(stepId);
          const nextSteps = isCompleted
            ? currentSteps.filter((id) => id !== stepId)
            : [...currentSteps, stepId];

          const startedAt = state.recovery?.startedAt || Date.now();

          const nextBadges = evaluateBadges(
            state.badges,
            state.quizHistory,
            state.lookupCount,
            state.reportCount,
            nextSteps
          );

          return {
            recovery: {
              startedAt,
              completedSteps: nextSteps,
            },
            badges: nextBadges,
          };
        });
      },

      resetRecovery: () => {
        set({
          recovery: {
            startedAt: null,
            completedSteps: [],
          },
        });
      },

      resetProfile: () => {
        set({
          score: 0,
          badges: [],
          quizHistory: [],
          quizStats: {},
          scanCount: 0,
          reportCount: 0,
          lookupCount: 0,
          recentChecks: [],
          recovery: {
            startedAt: null,
            completedSteps: [],
          },
        });
      },
    }),
    {
      name: 'scamshield-safety',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

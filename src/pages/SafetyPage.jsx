import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSafetyStore } from '../store/useSafetyStore';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { SafetyScoreRing } from '../components/SafetyScoreRing';
import { BadgeList } from '../components/BadgeList';
import { 
  ShieldCheck, 
  ShieldAlert, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Award,
  Zap,
  Info,
  Search,
  FileText,
  AlertTriangle,
  TrendingUp,
  Activity,
  Target
} from 'lucide-react';

export const SafetyPage = () => {
  // Zustand store fine-grained selectors
  const score = useSafetyStore((state) => state.score);
  const badges = useSafetyStore((state) => state.badges || []);
  const scanCount = useSafetyStore((state) => state.scanCount || 0);
  const reportCount = useSafetyStore((state) => state.reportCount || 0);
  const lookupCount = useSafetyStore((state) => state.lookupCount || 0);
  const quizStats = useSafetyStore((state) => state.quizStats || {});
  const answerQuiz = useSafetyStore((state) => state.answerQuiz);
  const resetProfile = useSafetyStore((state) => state.resetProfile);

  // Local state strictly for quiz UI presentation
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [sessionResults, setSessionResults] = useState({ correct: 0, wrong: 0 });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Calculate overall quiz accuracy across all attempts
  const statsArray = Object.values(quizStats);
  const totalAttempted = statsArray.reduce((acc, curr) => acc + (curr.attempted || 0), 0);
  const totalCorrect = statsArray.reduce((acc, curr) => acc + (curr.correct || 0), 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // Level classification label based purely on Awareness Level
  const getLevelInfo = () => {
    if (totalAttempted === 0) {
      return {
        title: 'Unrated (Drill Pending)',
        tagline: 'Take the cyber reality drill below to evaluate your scam awareness level.',
        badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700'
      };
    }
    if (score < 50) {
      return {
        title: 'Vulnerable',
        tagline: 'High susceptibility to emotional panic triggers and spoofed alerts. Build defense instincts!',
        badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border-rose-300 dark:border-rose-500/30'
      };
    }
    if (score <= 75) {
      return {
        title: 'Alert Citizen',
        tagline: 'Healthy skepticism and active fraud awareness. Review your weak spots to reach Guardian level.',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
      };
    }
    return {
      title: 'Cyber Guardian',
      tagline: 'Outstanding cyber vigilance! You accurately identify deceptive vectors and protect the community.',
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
    };
  };

  const levelInfo = getLevelInfo();
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  // Map each quiz question to search keyword for weak spots
  const categoryKeywords = {
    'digital-arrest': 'digital arrest',
    'electricity-cutoff': 'electricity',
    'olx-reverse-qr': 'QR',
    'fake-kyc-link': 'KYC',
    'genuine-bank-alert': 'Bank',
  };

  // Identify weak spots (attempted scenarios with accuracy < 70%, or unpracticed)
  const weakSpots = QUIZ_QUESTIONS.map((q) => {
    const stat = quizStats[q.id] || { correct: 0, attempted: 0 };
    const acc = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : null;
    return {
      ...q,
      attempted: stat.attempted,
      correct: stat.correct,
      accuracy: acc,
      searchKeyword: categoryKeywords[q.id] || 'scam',
    };
  }).filter((item) => item.accuracy !== null && item.accuracy < 70);

  // Handle user's guess (Scam or Safe)
  const handleAnswer = (userGuessedScam) => {
    if (showExplanation || quizFinished) return;

    const isCorrect = userGuessedScam === currentQuestion.isScam;
    setSelectedAnswer(userGuessedScam);
    setShowExplanation(true);

    // Update Zustand store
    answerQuiz(currentQuestion.id, isCorrect);

    // Track local session stats
    setSessionResults((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (!isCorrect ? 1 : 0),
    }));
  };

  // Move to next question or end quiz
  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  // Reset local quiz state to replay
  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizFinished(false);
    setSessionResults({ correct: 0, wrong: 0 });
  };

  // Profile reset
  const handleConfirmReset = () => {
    resetProfile();
    handlePlayAgain();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      
      {/* Page Title & Mission */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Cyber Defense Readiness Index</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
            Cyber Defense Dashboard & Safety Score
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
            Track your verified Scam Awareness Level, review tactical weak spots, and practice realistic cyber threat scenarios.
          </p>
        </div>

        {/* Reset Profile Action */}
        <div>
          {showResetConfirm ? (
            <div className="flex items-center gap-2 p-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs">
              <span className="text-rose-700 dark:text-rose-300 font-semibold">Reset all metrics?</span>
              <button
                onClick={handleConfirmReset}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
              title="Reset awareness level, history, and badges"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Profile Metrics</span>
            </button>
          )}
        </div>
      </div>

      {/* ── MINI DASHBOARD: 4 STAT CARDS ─────────────────────────────────── */}
      <section aria-label="Mini Dashboard" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Awareness Level */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Awareness Level</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-950 dark:text-white">
              {score}%
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {levelInfo.title}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Computed purely from scenario drill accuracy
          </p>
        </div>

        {/* Card 2: Overall Quiz Accuracy */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Quiz Accuracy</span>
            <TrendingUp className="w-4 h-4 text-teal-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-950 dark:text-white">
              {overallAccuracy}%
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              ({totalCorrect}/{totalAttempted})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Correctly classified Indian scam lures
          </p>
        </div>

        {/* Card 3: Lookups Executed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Lookups Executed</span>
            <Search className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-950 dark:text-white">
              {lookupCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">queries</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Identifiers verified on Check Before You Pay
          </p>
        </div>

        {/* Card 4: Reports Submitted */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Reports Logged</span>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-950 dark:text-white">
              {reportCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">threats</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Contributed to the public threat registry
          </p>
        </div>

      </section>

      {/* TOP SECTION: Safety Score Card and Badges */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Large SVG Score Ring */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <SafetyScoreRing score={score} size="lg" />

            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400 font-mono">
                  Awareness Readiness
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${levelInfo.badgeClass}`}>
                  {levelInfo.title}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {score}% Awareness Level
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md font-medium leading-relaxed">
                {levelInfo.tagline}
              </p>
            </div>
          </div>

          {/* Right: Quick summary pills */}
          <div className="w-full md:w-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2 max-w-xs">
            <div className="flex justify-between font-bold">
              <span className="text-slate-500">Drill Scenarios:</span>
              <span className="font-mono text-slate-900 dark:text-white">{totalAttempted} answered</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-500">AI Neural Scans:</span>
              <span className="font-mono text-slate-900 dark:text-white">{scanCount} completed</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-slate-500">Defense Badges:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{badges.length} of 5</span>
            </div>
          </div>
        </div>

        {/* Badges List */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <BadgeList unlockedBadgeIds={badges} />
        </div>

      </section>

      {/* ── CATEGORY ACCURACY BREAKDOWN & WEAK SPOTS ─────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Accuracy Bars */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              Per-Category Accuracy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your historical classification accuracy broken down by cyber threat vector.
            </p>
          </div>

          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q) => {
              const stat = quizStats[q.id] || { correct: 0, attempted: 0 };
              const acc = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : null;
              
              const barColor = acc === null
                ? 'bg-slate-200 dark:bg-slate-700'
                : acc >= 80
                ? 'bg-emerald-500'
                : acc >= 50
                ? 'bg-amber-500'
                : 'bg-rose-500';

              return (
                <div key={q.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200 truncate pr-2">
                      {q.category}
                    </span>
                    <span className="font-mono text-slate-600 dark:text-slate-400 shrink-0">
                      {acc !== null ? `${acc}% (${stat.correct}/${stat.attempted})` : 'Pending Drill'}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${acc !== null ? acc : 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Your Weak Spots Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Your Weak Spots & Recommended Studies
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Scam categories with sub-optimal accuracy (&lt;70%) and recommended registry threats.
            </p>
          </div>

          {weakSpots.length > 0 ? (
            <div className="space-y-3">
              {weakSpots.map((spot) => (
                <div
                  key={spot.id}
                  className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-amber-900 dark:text-amber-200">
                      {spot.category}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300">
                      Accuracy: {spot.accuracy}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {spot.redFlags[0]}
                  </p>
                  <div className="pt-1">
                    <Link
                      to={`/search?q=${encodeURIComponent(spot.searchKeyword)}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      <span>Inspect matching threat records in database</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : totalAttempted > 0 ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                No Critical Weak Spots Detected!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                All practiced scam categories maintain strong accuracy (&ge; 70%). Continue taking reality drills periodically to maintain your defense reflexes.
              </p>
            </div>
          ) : (
            <div className="p-8 text-center space-y-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <Info className="w-8 h-8 text-slate-400 mx-auto" />
              <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                Weak Spot Analysis Pending
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Take the interactive drill below to identify which scam vectors trick you most frequently.
              </p>
            </div>
          )}
        </div>

      </section>

      {/* BOTTOM SECTION: "Spot the Scam" Interactive Quiz */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Quiz Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Threat Simulation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
              Spot the Scam: Reality Drill
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Read each realistic scenario from India and determine if it is a fraudulent lure or a safe message.
            </p>
          </div>

          {!quizFinished && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                Scenario {currentIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quiz Body */}
        {!quizFinished ? (
          <div className="space-y-6">
            
            {/* Question Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                  {currentQuestion.category}
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {currentQuestion.sender}
                </span>
              </div>

              {/* Realistic message preview bubble */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed shadow-inner">
                "{currentQuestion.scenario}"
              </div>
            </div>

            {/* Answer Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                disabled={showExplanation}
                onClick={() => handleAnswer(true)}
                className={`p-4 rounded-2xl border-2 font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all ${
                  showExplanation
                    ? currentQuestion.isScam
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                      : selectedAnswer === true
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-800 opacity-40'
                    : 'border-rose-200 dark:border-rose-900/50 hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-700 dark:text-rose-400 active:scale-[0.98]'
                }`}
              >
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>🚨 It's a Scam</span>
              </button>

              <button
                type="button"
                disabled={showExplanation}
                onClick={() => handleAnswer(false)}
                className={`p-4 rounded-2xl border-2 font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all ${
                  showExplanation
                    ? !currentQuestion.isScam
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                      : selectedAnswer === false
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
                      : 'border-slate-200 dark:border-slate-800 opacity-40'
                    : 'border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 active:scale-[0.98]'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>✅ It's Safe</span>
              </button>
            </div>

            {/* Instant Explanation of Red Flags */}
            {showExplanation && (
              <div className="p-5 rounded-2xl border animate-in fade-in duration-300 space-y-3 bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {selectedAnswer === currentQuestion.isScam ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-extrabold text-sm text-emerald-700 dark:text-emerald-400">
                          Accurate Assessment!
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span className="font-extrabold text-sm text-rose-700 dark:text-rose-400">
                          Threat Evaluation Missed
                        </span>
                      </>
                    )}
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400">
                    Verdict: {currentQuestion.isScam ? 'Scam Threat' : 'Legitimate Communication'}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-teal-600" />
                    <span>Cyber Defense Analysis & Red Flags:</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-1">
                    {currentQuestion.redFlags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>{currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Scenario' : 'View Drill Summary'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Final Quiz Summary Screen */
          <div className="p-8 text-center space-y-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-950 dark:text-white">
                Drill Completed!
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                You correctly evaluated {sessionResults.correct} out of {QUIZ_QUESTIONS.length} scenarios. Your updated Awareness Level is now <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{score}%</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={handlePlayAgain}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Practice Again</span>
              </button>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};

export default SafetyPage;

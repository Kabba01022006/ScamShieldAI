import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ScamProvider } from './context/ScamContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThreatTicker } from './components/ThreatTicker';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ReportPage } from './pages/ReportPage';
import { SearchPage } from './pages/SearchPage';
import { DatabasePage } from './pages/DatabasePage';
import { ScamDetailPage } from './pages/ScamDetailPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AiAnalyzerPage } from './pages/AiAnalyzerPage';
import { ThreatMapPage } from './pages/ThreatMapPage';

// ScamShield AI v2.5 - Production Build Trigger
// Scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

// Global Toast Banner for Auth or System Alerts
function GlobalAlertBanner() {
  const { authNotification, clearNotification } = useAuth();

  if (!authNotification) return null;

  return (
    <aside aria-label="Alerts" className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-emerald-300 dark:bg-slate-900 dark:text-emerald-300 px-4 py-3 rounded-2xl border border-emerald-500/40 shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-white font-semibold">{authNotification}</span>
        <button
          onClick={clearNotification}
          className="ml-2 text-slate-400 hover:text-white font-bold text-xs p-1"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScamProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-950 transition-colors duration-200">
              <ThreatTicker />
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/map" element={<ThreatMapPage />} />
                  <Route path="/analyze" element={<AiAnalyzerPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/report" element={<ReportPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/database" element={<DatabasePage />} />
                  <Route path="/scam/:id" element={<ScamDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  {/* 404 Catch-All Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
              <GlobalAlertBanner />
            </div>
          </Router>
        </ScamProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

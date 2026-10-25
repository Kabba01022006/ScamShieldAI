import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  PlusCircle, 
  Database, 
  HelpCircle, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Cpu, 
  MapPin 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSafetyStore } from '../store/useSafetyStore';
import { SafetyScoreRing } from './SafetyScoreRing';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  
  // Zustand state
  const score = useSafetyStore((state) => state.score);
  const recovery = useSafetyStore((state) => state.recovery);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // 1. Desktop Nav Links (Clean, clear labels with balanced width)
  const desktopLinks = [
    { name: 'Home', path: '/', icon: ShieldCheck },
    { name: 'Check Pay', path: '/check', icon: Search },
    { name: 'Recovery', path: '/recover', icon: ShieldAlert },
    { name: 'Threat Map', path: '/map', icon: MapPin },
    { name: 'AI Scanner', path: '/analyze', icon: Cpu, badge: 'AI' },
    { name: 'Database', path: '/database', icon: Database },
    { name: 'About', path: '/about', icon: HelpCircle },
  ];

  // 2. Full descriptive list for Mobile Drawer
  const mobileLinks = [
    { name: 'Home', path: '/', icon: ShieldCheck },
    { name: 'Check Before You Pay', path: '/check', icon: Search },
    { name: 'Recovery Mode', path: '/recover', icon: ShieldAlert },
    { name: 'Threat Map', path: '/map', icon: MapPin },
    { name: 'AI Scanner', path: '/analyze', icon: Cpu, badge: 'AI' },
    { name: 'Threat Database', path: '/database', icon: Database },
    { name: 'Safety Score Drill', path: '/safety', icon: ShieldCheck },
    { name: 'About & Defense', path: '/about', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-900 dark:bg-white shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-emerald-400 dark:text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-1">
                ScamShield<span className="text-emerald-600 dark:text-emerald-400">AI</span>
              </span>
              <span className="hidden xl:block text-[9px] text-slate-500 dark:text-slate-400 font-bold tracking-wider uppercase font-mono">
                Cyber Defense Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            {desktopLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-150 flex items-center gap-2 whitespace-nowrap ${
                    active
                      ? 'text-slate-950 bg-slate-100/90 border border-slate-200/90 dark:text-white dark:bg-slate-800 dark:border-slate-700/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 stroke-[2] ${active ? 'text-slate-950 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            
            {/* Active Recovery Progress Badge */}
            {recovery?.completedSteps?.length > 0 && (
              <Link
                to="/recover"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold animate-pulse hover:bg-amber-500/20 transition-all shrink-0 whitespace-nowrap"
                title="Active emergency recovery in progress"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Recovery: {recovery.completedSteps.length}/6</span>
              </Link>
            )}

            {/* Compact Cyber Safety Score Ring */}
            <Link
              to="/safety"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shrink-0 shadow-xs"
              title={`Cyber Safety Score: ${score}/100`}
            >
              <SafetyScoreRing score={score} size="sm" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                {score}%
              </span>
            </Link>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors shrink-0"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
            </button>

            {/* Report Threat Button */}
            <Link
              to="/report"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs shadow-sm active:scale-[0.98] transition-all shrink-0 whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.2]" />
              <span>Report</span>
            </Link>

            {/* Auth section */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-700 shrink-0">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-900 dark:text-slate-200 font-bold max-w-[90px] truncate" title={currentUser.name}>
                    {currentUser.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white rounded-xl transition-colors shrink-0 whitespace-nowrap border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Sign In</span>
              </Link>
            )}

          </div>

          {/* Mobile hamburger menu & quick actions (Visible on screens < 1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/safety"
              className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center"
              title={`Cyber Safety Score: ${score}/100`}
            >
              <SafetyScoreRing score={score} size="sm" />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-700" />}
            </button>
            <Link
              to="/report"
              className="p-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center"
              title="Report Threat"
            >
              <PlusCircle className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {mobileLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'text-slate-950 bg-slate-100 dark:text-white dark:bg-slate-800 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-slate-950 dark:text-white' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {isAuthenticated && currentUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-xl text-sm">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold text-sm">{currentUser.name}</p>
                    <p className="text-slate-500 text-xs">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors border border-rose-200 dark:border-rose-500/20 font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

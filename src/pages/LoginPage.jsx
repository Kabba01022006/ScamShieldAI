import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  User, 
  Mail, 
  ArrowRight, 
  CheckCircle, 
  Fingerprint,
  Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { FormField } from '../components/form/FormField';
import { TextInput } from '../components/form/TextInput';
import { PasswordInput } from '../components/form/PasswordInput';
import { 
  required, 
  email as emailValidator, 
  minLength, 
  matchesField, 
  composeValidators 
} from '../utils/validators';

export const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const { login, signup, currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Return to the page user attempted to access (protected route), or default to home
  const fromPath = location.state?.from?.pathname || '/';

  // Validation schema dynamically adjusted for Sign In vs Sign Up
  const formValidators = isSignUp
    ? {
        name: required('Full name is required'),
        email: composeValidators(
          required('Email address is required'),
          emailValidator('Please enter a valid email format')
        ),
        password: composeValidators(
          required('Password is required'),
          minLength(6, 'Password must be at least 6 characters')
        ),
        confirmPassword: composeValidators(
          required('Please confirm your password'),
          matchesField('password', 'Passwords do not match')
        ),
      }
    : {
        email: composeValidators(
          required('Email address is required'),
          emailValidator('Please enter a valid email format')
        ),
        password: required('Password is required'),
      };

  const handleFormSubmit = (formValues) => {
    if (isSignUp) {
      signup({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
      });
      setSubmittedMessage(`Sentinel account created for ${formValues.name}! Redirecting...`);
    } else {
      login({
        email: formValues.email.trim(),
        password: formValues.password,
      });
      setSubmittedMessage('Sentinel credentials verified! Redirecting to destination...');
    }

    setTimeout(() => {
      navigate(fromPath, { replace: true });
    }, 1200);
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    reset,
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: formValidators,
    onSubmit: handleFormSubmit,
  });

  const handleTabSwitch = (signUpMode) => {
    setIsSignUp(signUpMode);
    reset({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  // If already authenticated, show the active sentinel session card
  if (isAuthenticated && currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/30 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Active Sentinel Session</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
              Signed in as <span className="text-teal-700 dark:text-teal-400 font-bold">{currentUser.name}</span> ({currentUser.email})
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-left space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Security Clearance:</span>
              <span className="text-teal-800 dark:text-teal-300 font-bold font-mono">{currentUser.role || 'Community Sentinel'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Threat Submission Node:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Authorized / Active
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to={fromPath !== '/login' ? fromPath : '/'}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors text-center shadow-md shadow-teal-600/20"
            >
              Continue to {fromPath === '/' ? 'Defense Dashboard' : 'Requested Action'}
            </Link>
            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 dark:bg-slate-800 dark:hover:bg-rose-500/20 dark:text-slate-300 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors"
            >
              Terminate Session (Sign Out)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-2xl pointer-events-none rounded-full" />

        {/* Header with icon */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-500/15 text-teal-700 dark:text-teal-400 flex items-center justify-center mx-auto border border-teal-200 dark:border-teal-500/30 shadow-inner">
            <Fingerprint className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isSignUp ? 'Enroll Defense Sentinel' : 'Sentinel Authentication'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isSignUp
              ? 'Join the citizen intelligence network to track and neutralize scams'
              : 'Sign in to access verified threat logging and incident tracking'}
          </p>
        </div>

        {/* Tab Toggle Switch */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => handleTabSwitch(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isSignUp
                ? 'bg-teal-600 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isSignUp
                ? 'bg-teal-600 text-white dark:bg-teal-500 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Enroll New Sentinel
          </button>
        </div>

        {/* Success Alert Banner */}
        {submittedMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 dark:bg-emerald-500/15 dark:border-emerald-500/30 rounded-xl flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-bold animate-in fade-in">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{submittedMessage}</span>
          </div>
        )}

        {/* Protected Route Redirect Context Banner */}
        {location.state?.from && !submittedMessage && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 dark:bg-amber-500/15 dark:border-amber-500/30 rounded-xl flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-medium animate-in fade-in">
            <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span>
              Authentication required: Please sign in or enroll to access{' '}
              <strong>
                {location.state.from.pathname === '/report'
                  ? 'Citizen Threat Reporting'
                  : location.state.from.pathname}
              </strong>
              .
            </span>
          </div>
        )}

        {/* Form using Reusable Components and useForm Hook */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          
          {/* Name field (Signup only) */}
          {isSignUp && (
            <FormField
              label="Full Name"
              name="name"
              required
              error={errors.name}
            >
              <TextInput
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Alex Morgan"
                icon={User}
              />
            </FormField>
          )}

          {/* Email field */}
          <FormField
            label="Email Address"
            name="email"
            required
            error={errors.email}
          >
            <TextInput
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="sentinel@scamshield.ai"
              icon={Mail}
            />
          </FormField>

          {/* Password field */}
          <FormField
            label="Password"
            name="password"
            required
            error={errors.password}
          >
            <PasswordInput
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              showStrengthMeter={isSignUp}
            />
          </FormField>

          {/* Confirm Password (Signup only) */}
          {isSignUp && (
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              required
              error={errors.confirmPassword}
            >
              <PasswordInput
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
              />
            </FormField>
          )}

          {/* Quick Fill Test Profile Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setValues({
                  name: 'Elena Vance (Threat Analyst)',
                  email: 'sentinel.alpha@scamshield.ai',
                  password: 'securitypass123',
                  confirmPassword: 'securitypass123',
                });
              }}
              className="text-[11px] text-slate-800 hover:text-black dark:text-slate-300 dark:hover:text-white hover:underline inline-flex items-center gap-1 font-bold"
            >
              ⚡ Fill with Verified Sentinel Profile
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-slate-900/10 active:scale-[0.98]"
          >
            <span>{isSignUp ? 'Enroll Sentinel Profile' : 'Authenticate Session'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Standard Note (Academic Honesty: Simulated Local Authentication) */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2.5 font-medium">
          <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900 dark:text-slate-200">Simulated Local Authentication:</strong> Session credentials are saved in browser localStorage to simulate login states without transmitting sensitive data to an external server.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;

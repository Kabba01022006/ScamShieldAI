# State Architecture in ScamShield AI

This project demonstrates a production-grade, layered state management strategy in React 18, contrasting **Local State (`useState`, `useRef`)**, **Custom Hooks (`useAsync`, `useForm`)**, **React Context API**, and **Zustand with Persistence**.

---

## State Management Breakdown

| State Category | Technology | Data / Domain | Rationale & Scope |
| :--- | :--- | :--- | :--- |
| **Local Component State** | `useState`, `useRef` | Active tabs, form input values, password visibility toggles, modal open/close. | Transient UI state that belongs strictly to a single component and does not need to be shared across the route tree. |
| **Async Request State** | Custom Hook (`useAsync`) | Registry lookup status (`idle`, `loading`, `success`, `error`), payload data, network error objects, race-condition call tracking. | Encapsulates asynchronous promise lifecycles, guarantees unmount safety (`isMountedRef`), prevents race conditions via call IDs, and provides unified `retry()` mechanics. |
| **Form & Validation State** | Custom Hook (`useForm`) | Field values, validation errors, touched fields, submission status, auto-focus coordination. | Standardizes validation on blur, re-validation on change once touched, full validation on submit, and automatic focusing of first invalid element. |
| **Application Theme Context** | React Context (`ThemeContext`) | Dark / Light theme preference persisted to `localStorage`. | Low-frequency application configuration that applies universally to the root HTML element with minimal runtime changes. |
| **Identity Session Context** | React Context (`AuthContext`) | Simulated current user login session, login/logout methods, and auth alert notifications. | Coarse-grained authentication state changing only upon explicit login/logout; React Context provides built-in boundary encapsulation. |
| **Threat Domain Context** | React Context (`ScamContext`) | Verified cyber threat incident listings, user-submitted reports, and community "Me Too" verification counters. | Central repository of domain incidents shared among catalog pages (Search, Threat Map, Database, Scam Detail). |
| **Cyber Safety & App Store** | **Zustand Store** (`useSafetyStore` with `persist`) | Scam Awareness Level (0–100%), per-category quiz stats, unlocked defense badges, recent search checks (last 5), recovery checklist progress (`startedAt`, `completedSteps`), and activity counters. | **Frequently updating, cross-cutting state** modified across different pages (AI Analyzer, Check Before You Pay, Report Form, Recovery Protocol, Quiz) and consumed by the Navbar; Zustand provides atomic selector subscriptions (`useSafetyStore(s => s.score)`) that eliminate wasteful component re-renders. |

---

## Why Zustand for the Cyber Safety Profile & Recovery Protocol?

1. **Selective Subscriptions (Zero Unnecessary Re-renders):**  
   Components subscribe directly to specific state slices:
   ```javascript
   // Navbar only re-renders when score or active recovery steps change:
   const score = useSafetyStore((state) => state.score);
   const recovery = useSafetyStore((state) => state.recovery);
   ```
   In React Context, any state change forces *all* consumer components to re-render unless wrapped in complex memoization.

2. **Clean External Middleware (`persist`):**  
   Zustand handles JSON serialization, hydration, and synchronization with browser `localStorage` out-of-the-box with zero boilerplate. This ensures recovery timer progress and recent check history survive browser refreshes.

3. **Meaningful Scam Awareness Level (Decoupled Business Logic):**  
   Rather than arbitrary points for page clicks or scans, the Scam Awareness Level is computed directly from scenario classification accuracy across cybercrime categories (`digital-arrest`, `electricity-cutoff`, `olx-reverse-qr`, `fake-kyc-link`, `genuine-bank-alert`).

4. **Achievement-Based Badges:**  
   Badge unlocking algorithms reside within store actions, evaluating genuine accomplishments:
   - **Phish Spotter:** 3 correct drill evaluations
   - **Sharp Eye:** 5 consecutive correct evaluations
   - **Registry Scout:** 1 or more registry lookups performed
   - **Citizen Reporter:** 1 or more verified threat incident reports submitted
   - **Recovery Responder:** All 6 critical emergency recovery actions completed

---

## Reusable Form Validation Strategy

The `useForm` hook couples with `validators.js` and `FormField` to enforce:
1. **Validate on Blur:** Fields are validated when the user leaves the input, preventing early error flashes.
2. **Re-validate on Change:** Once a field is marked as touched, subsequent keystrokes re-evaluate the validator immediately for rapid correction feedback.
3. **Validate All on Submit:** On form submission, all registered fields are evaluated.
4. **Auto-Focus First Invalid Input:** If validation errors exist, the DOM element corresponding to the first error is automatically focused and centered in the viewport.

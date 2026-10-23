# State Architecture in ScamShield AI

This project demonstrates a clean, layered state management strategy in React 18, contrasting **Local State (`useState`)**, **React Context API**, and **Zustand**.

---

## State Management Breakdown

| State Category | Technology | Data / Domain | Rationale & Scope |
| :--- | :--- | :--- | :--- |
| **Local Component State** | `useState` | Active tabs, form input values, validation errors, interactive quiz current question & explanation visibility. | Transient UI state that belongs strictly to a single component and does not need to be shared across the route tree. |
| **Application Context** | React Context (`ThemeContext`) | Dark / Light theme preference persisted to `localStorage`. | Low-frequency application configuration that applies universally to the root HTML element with minimal runtime changes. |
| **Identity Context** | React Context (`AuthContext`) | Simulated current user login session, login/logout methods, and auth alert notifications. | Coarse-grained authentication state that changes only upon explicit login/logout; React Context provides built-in boundary encapsulation. |
| **Domain Context** | React Context (`ScamContext`) | Verified cyber threat incident listings, user-submitted reports, and community "Me Too" verification counters. | Central repository of domain incidents shared among catalog pages (Search, Threat Map, Database, Scam Detail). |
| **Cyber Safety Profile** | **Zustand Store** (`useSafetyStore` with `persist`) | Safety score (0–100), unlocked defense badges, quiz history, AI scan count, and report count. | **Frequently updating, cross-cutting state** modified across different pages (AI Analyzer, Report Form, Quiz) and consumed by the Navbar; Zustand provides atomic selector subscriptions (`useSafetyStore(s => s.score)`) that eliminate wasteful component re-renders. |

---

## Why Zustand for the Cyber Safety Profile?

1. **Selective Subscriptions (Zero Unnecessary Re-renders):**  
   Components subscribe directly to specific state slices:
   ```javascript
   // Navbar only re-renders when score changes, ignoring quiz history or scan count
   const score = useSafetyStore((state) => state.score);
   ```
   In React Context, any state change forces *all* consumer components to re-render unless wrapped in complex memoization.

2. **Clean External Middleware (`persist`):**  
   Zustand handles JSON serialization, hydration, and synchronization with browser `localStorage` out-of-the-box with zero boilerplate.

3. **Decoupled Business Logic:**  
   Badge unlocking algorithms and score clamping rules reside purely within store actions, leaving UI components lean, declarative, and easily testable for viva demonstrations.

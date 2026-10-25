# ScamShield AI — Cybercrime Reporting & Prevention Platform (India)

**ScamShield AI** is an open-source, client-side cyber intelligence and fraud prevention single-page application (SPA) tailored to the evolving cyber threat landscape in India. Built with **React 18**, **Vite**, **Tailwind CSS**, **react-router-dom v6**, and **Zustand**, it empowers citizens to verify suspicious identifiers, report new fraud vectors, practice realistic cyber defense drills, and execute emergency incident recovery during the critical "Golden Hour".

> **Academic & Examination Notice:** This project operates entirely on simulated, client-side mock intelligence datasets without a live backend or third-party database. All authentication, registry lookups, and recovery workflows are honest client-side demonstrations designed for college viva evaluation.

---

## 1. The Problem: Online Cyber Fraud in India

Digital payments (UPI, IMPS, AePS) and messaging channels have revolutionized Indian commerce, but have also catalyzed sophisticated social engineering threats:

1. **"Digital Arrest" Extortion:** Fraudsters impersonate CBI, Mumbai Police, or Customs officers on Skype/WhatsApp video calls with simulated police backdrops, claiming narcotics or fake passports were seized under the victim's Aadhaar and coercing "verification" transfers.
2. **Urgent Utility Disconnection SMS:** Messages threatening imminent electricity power cutoff at 9:30 PM urging victims to call personal phone numbers or install weaponized `.apk` files.
3. **Marketplace Reverse UPI QR Code Fraud:** Impersonating defence personnel on OLX/Quikr, tricking sellers into scanning QR codes or typing their 6-digit UPI PIN under the false pretext of "receiving payment".
4. **Phishing & Fake KYC Link SMS:** Masquerading as SBI YONO or HDFC netbanking updates using `.xyz` or `.top` lookalike portals to harvest banking credentials and OTPs.
5. **Telegram Work-From-Home / Rating Tasks:** Luring victims with initial ₹150 payouts for liking YouTube videos before entrapping them in ₹1,00,000+ "prepaid cryptocurrency merchant tasks".

ScamShield AI bridges the public awareness gap through real-time cross-verification, heuristic analysis, and actionable recovery protocols.

---

## 2. Core Features

### 🔍 1. Check Before You Pay (`/check`)
- Asynchronous search engine querying phone numbers, UPI VPAs, domain names, and scammer identities.
- Demonstrates complete 4-state asynchronous lifecycle: **Idle**, **Loading** (pulsing card skeletons), **Error** (transient network failures with interactive retry), and **Success** (matching report count, highest threat level, and WhatsApp warning dispatch).
- Includes neutral-colored warning state when no matches are found: *"No reports found. This does NOT guarantee it is safe. Verify independently before paying."*
- Features a **Viva / Demo Controller** switch allowing examiners to force simulated network failures on demand.
- Persists recent searches (last 5 unique queries) as clickable quick-search chips using Zustand.

### 🚨 2. "I've Been Scammed" Recovery Mode (`/recover`)
- **Nested Route Flow:** Implemented via `<RecoverLayout />` with `<Outlet />` split into:
  - **Step 1: Immediate Actions (`/recover`):** The "Golden Hour" 6-action emergency checklist (Calling 1930, bank fraud hold, freezing UPI/cards, evidence preservation, cybercrime portal filing, password rotation) with live elapsed-time timer.
  - **Step 2: Formal Complaint Draft (`/recover/complaint`):** Structured complaint generator conforming to Ministry of Home Affairs (MHA) and National Cyber Crime Reporting Portal (`cybercrime.gov.in`) guidelines.
- Progress survives page reloads via Zustand `persist` middleware and displays an active recovery indicator in the global navigation bar.
- Generates formatted plain-text complaints with 1-click **Copy to Clipboard** and **Download .txt** features.

### 🛡️ 3. Explainable Heuristic Scam Analyzer (`/analyze`)
- Rule-based natural language threat parser flagging urgency triggers, credential extraction, and non-standard payment demands.
- **Regex Word-Boundary Remediation:** Uses `\bword\b` boundary patterns for short keywords (`pin`, `pan`, `otp`, `cbi`, `ed`) to eliminate false positives inside ordinary vocabulary ("received", "shopping", "company").
- Honestly presented as an explainable heuristic rule engine rather than a black-box machine learning model.

### 📊 4. Cyber Defense Dashboard & Safety Score (`/safety`)
- **Clean 4-Card Mini Dashboard:**
  1. **Scam Awareness Level:** Meaningful score (0–100%) calculated dynamically from scenario classification accuracy.
  2. **Quiz Accuracy:** Overall ratio of correct threat assessments.
  3. **Lookups Executed:** Total identifier queries verified on Check Before You Pay.
  4. **Reports Logged:** Verified citizen threat contributions.
- **Per-Category Accuracy Breakdown:** Individual progress bars for each scam vector.
- **"Your Weak Spots" Recommendation Engine:** Auto-identifies categories with &lt;70% accuracy and generates deep links to matching threat records in the registry.
- **Spot the Scam Reality Drill:** 5 realistic Indian scenarios with instant red-flag explanations.
- **Defense Badges:** 5 real achievement-based badges (Phish Spotter, Sharp Eye, Registry Scout, Citizen Reporter, Recovery Responder).

### 🔒 5. Protected Routes & Authentication (`/login`)
- Custom `ProtectedRoute` wrapper dedicated to citizen reporting (`/report`), ensuring anonymous users cannot submit unverified reports without enrolling as a Sentinel.
- Seamless redirection: preserves intended target in route state (`state: { from: location }`), displays a clear contextual login notice, and returns the user to `/report` upon successful sign-in.
- Public Educational & Emergency Access: Emergency recovery tools (`/recover`) and educational drills (`/safety`) remain directly accessible to any citizen without login friction.
- Honestly labeled as simulated client-side authentication stored in `localStorage`.

---

## 3. Technology Stack

- **UI Library:** React 18.3.1 (Plain JSX)
- **Routing:** react-router-dom 6.30.6 (Nested routes, layout outlets, URL query params, programmatic navigation)
- **State Management:**
  - **Local State:** React `useState`, `useRef`, `useCallback`, `useEffect`
  - **Application Context:** React Context API (`ThemeContext`, `AuthContext`, `ScamContext`)
  - **Global Persisted Store:** Zustand 5.0.16 with `persist` and `createJSONStorage`
- **Styling:** Tailwind CSS 3.4.17 with dark/light mode contrast
- **Icons:** Lucide React 0.468.0
- **Build Tool:** Vite 6.0.3

---

## 4. Academic Syllabus Mapping

| Syllabus Evaluation Topic | Source File / Implementation | User Interface Demonstration |
| :--- | :--- | :--- |
| **Multi-Page SPA Navigation & Nested Routes** | [`src/App.jsx`](file:///d:/ScamShield%20AI/src/App.jsx)<br>[`src/pages/recover/RecoverLayout.jsx`](file:///d:/ScamShield%20AI/src/pages/recover/RecoverLayout.jsx) | Navigate between `/`, `/check`, `/map`, `/analyze`, `/database`, `/safety`, and the nested `/recover` &rarr; `/recover/complaint` flow. |
| **React Context API (Global vs Local State)** | [`src/context/ThemeContext.jsx`](file:///d:/ScamShield%20AI/src/context/ThemeContext.jsx)<br>[`src/context/AuthContext.jsx`](file:///d:/ScamShield%20AI/src/context/AuthContext.jsx)<br>[`src/context/ScamContext.jsx`](file:///d:/ScamShield%20AI/src/context/ScamContext.jsx) | Theme toggle switches `dark` class on root HTML; Auth session state governs protected views; ScamContext distributes threat catalog. |
| **Zustand State with Persistence** | [`src/store/useSafetyStore.js`](file:///d:/ScamShield%20AI/src/store/useSafetyStore.js) | Stores Scam Awareness Level, quiz stats, recent checks, and recovery checklist timer; retains all progress across browser refresh. |
| **Async State Management (Loading, Error, Retry)** | [`src/services/api.js`](file:///d:/ScamShield%20AI/src/services/api.js)<br>[`src/hooks/useAsync.js`](file:///d:/ScamShield%20AI/src/hooks/useAsync.js)<br>[`src/components/ui/Skeleton.jsx`](file:///d:/ScamShield%20AI/src/components/ui/Skeleton.jsx)<br>[`src/components/ui/ErrorState.jsx`](file:///d:/ScamShield%20AI/src/components/ui/ErrorState.jsx) | On `/check`: Toggle "Simulate Network Failure", run a search to view `ErrorState`, then click "Retry" to verify error recovery. |
| **Form Handling, Validation & Reusable Inputs** | [`src/hooks/useForm.js`](file:///d:/ScamShield%20AI/src/hooks/useForm.js)<br>[`src/utils/validators.js`](file:///d:/ScamShield%20AI/src/utils/validators.js)<br>[`src/components/form/FormField.jsx`](file:///d:/ScamShield%20AI/src/components/form/FormField.jsx)<br>[`src/components/form/TextInput.jsx`](file:///d:/ScamShield%20AI/src/components/form/TextInput.jsx)<br>[`src/components/form/PasswordInput.jsx`](file:///d:/ScamShield%20AI/src/components/form/PasswordInput.jsx) | Demonstrated across `/login`, `/report`, and `/recover/complaint`: blur validation, touched-field re-validation, and auto-focusing first invalid field on submit. |
| **Mini Dashboard & Analytics** | [`src/pages/SafetyPage.jsx`](file:///d:/ScamShield%20AI/src/pages/SafetyPage.jsx) | Top 4 stat cards (Awareness %, Accuracy %, Lookups, Reports), category accuracy bars, and weak-spot recommendations. |
| **Protected Routes & Deep Linking** | [`src/components/ProtectedRoute.jsx`](file:///d:/ScamShield%20AI/src/components/ProtectedRoute.jsx) | Sign out, attempt opening `/report` &rarr; redirected to `/login` &rarr; sign in &rarr; automatically redirected back to `/report`. |

---

## 5. Folder Structure

```text
ScamShield AI/
├── docs/
│   └── STATE_ARCHITECTURE.md        # Comprehensive state breakdown (Context vs Zustand)
├── public/
│   └── shield.svg
├── src/
│   ├── components/
│   │   ├── form/                    # Reusable, accessible form components
│   │   │   ├── FormField.jsx        # Labels, hints, error alerts, ARIA linking
│   │   │   ├── PasswordInput.jsx    # Show/hide toggle + visual strength meter
│   │   │   ├── SelectInput.jsx      # Dropdown select
│   │   │   ├── TextArea.jsx         # Multiline text input
│   │   │   └── TextInput.jsx        # Text, number, date, tel inputs
│   │   ├── ui/                      # Reusable async status components
│   │   │   ├── EmptyState.jsx       # Zero-result fallback
│   │   │   ├── ErrorState.jsx       # Error message display with Retry CTA
│   │   │   └── Skeleton.jsx         # Card & text-line shimmer placeholders
│   │   ├── AiScamAnalyzer.jsx       # Heuristic keyword engine with word boundaries
│   │   ├── BadgeList.jsx            # Achievement badges grid
│   │   ├── Footer.jsx               # Universal footer with emergency disclaimers
│   │   ├── Navbar.jsx               # Navigation bar with recovery indicator
│   │   ├── ProtectedRoute.jsx       # Route protection wrapper with return path
│   │   ├── SafetyScoreRing.jsx      # Circular SVG score progress ring
│   │   ├── ScamCard.jsx             # Incident card display
│   │   ├── ThreatMap.jsx            # City-level threat radar map
│   │   └── ThreatTicker.jsx         # Incident ticker bar
│   ├── context/
│   │   ├── AuthContext.jsx          # Simulated session authentication
│   │   ├── ScamContext.jsx          # Threat reports repository & voting
│   │   └── ThemeContext.jsx         # Light / Dark theme toggling
│   ├── data/
│   │   ├── cityData.js              # Metropolitan Indian threat coordinates
│   │   ├── mockScams.js             # Initial verified threat incident records
│   │   └── quizQuestions.js         # Reality drill scenarios & red flags
│   ├── hooks/
│   │   ├── useAsync.js              # Async state machine (unmount & race safe)
│   │   └── useForm.js               # Form state & validation coordinator
│   ├── pages/
│   │   ├── recover/
│   │   │   ├── ComplaintDraftStep.jsx   # Step 2: Formal complaint generator
│   │   │   ├── ImmediateActionsStep.jsx # Step 1: Golden Hour checklist & timer
│   │   │   └── RecoverLayout.jsx        # Shared nested recovery layout
│   │   ├── AboutPage.jsx            # Platform information & FAQ
│   │   ├── AiAnalyzerPage.jsx       # Full-page heuristic scanner
│   │   ├── CheckPage.jsx            # Check Before You Pay verification page
│   │   ├── DatabasePage.jsx         # Incident registry database
│   │   ├── HomePage.jsx             # Hero, quick search, and active advisories
│   │   ├── LoginPage.jsx            # Sentinel login & enrollment form
│   │   ├── NotFoundPage.jsx         # 404 handler
│   │   ├── ReportPage.jsx           # Incident report submission form
│   │   ├── SafetyPage.jsx           # Dashboard, drills, category bars, weak spots
│   │   ├── ScamDetailPage.jsx       # Detailed report view with verification
│   │   ├── SearchPage.jsx           # Registry query search
│   │   └── ThreatMapPage.jsx        # Geographic radar map view
│   ├── services/
│   │   └── api.js                   # Mock async API with latency & forced errors
│   ├── store/
│   │   └── useSafetyStore.js        # Persistent Zustand store
│   ├── utils/
│   │   └── validators.js            # Composable validation rules
│   ├── App.jsx                      # Router & layout provider root
│   ├── index.css                    # Tailwind CSS imports
│   └── main.jsx                     # Vite entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation & Startup
```bash
# 1. Clone repository & navigate into workspace
cd "ScamShield AI"

# 2. Install dependencies (lucide-react, react, react-dom, react-router-dom, zustand)
npm install

# 3. Start development server
npm run dev

# 4. Open in browser (typically http://localhost:5173)
```

### Production Build Verification
```bash
# Compile and build production assets with zero errors:
npm run build

# Preview production build locally:
npm run preview
```

---

## 7. Two-Minute Viva Demonstration Script

1. **Async State & Error Recovery (0:00 – 0:30):**
   - Navigate to **"Check Before You Pay"** (`/check`).
   - Check the toggle **"Simulate Network Failure"**. Type `98214` and click Search.
   - Show the **`ErrorState`** component rendering the descriptive error message.
   - Uncheck the toggle and click **"Retry Connection"**.
   - Show the shimmer **`Skeleton`** cards transitioning into matching results.
   - Demonstrate the **"Share Warning on WhatsApp"** button and recent search chips.

2. **Form Handling & Validation Strategy (0:30 – 1:00):**
   - Click **"Report Threat"** (`/report`).
   - Leave fields blank and hit **"Publish Scam Warning"**.
   - Point out that the page automatically scrolls and focuses the first invalid field, displaying accessible `aria-invalid` error badges.
   - Click **"⚡ Load Threat Template"** to show state hydration via `setValues`.

3. **Emergency Recovery & Nested Routing (1:00 – 1:30):**
   - Navigate to **"Recovery Mode"** (`/recover`).
   - Show the live **Golden Hour Timer** counting up in real-time.
   - Check 2 actions (e.g. Call 1930, Inform Bank). Point out that the recovery progress badge updates in the Navbar.
   - Hard refresh the browser (`F5`) to demonstrate that the timer and checked steps persist via Zustand `persist`.
   - Click **"Proceed to Step 2: Complaint Draft"** (`/recover/complaint`).
   - Click **"Fill Sample Scenario"** and submit to demonstrate the formatted legal complaint draft, **Copy**, and **Download .txt** features.

4. **Mini Dashboard, Meaningful Score & Weak Spots (1:30 – 2:00):**
   - Navigate to **"Safety Score"** (`/safety`).
   - Highlight the **4-Card Mini Dashboard** (Awareness Level, Accuracy, Lookups, Reports).
   - Take the **Spot the Scam** drill and purposely choose an incorrect answer.
   - Show how the score recalculates dynamically from accuracy, category progress bars adjust, and the **"Your Weak Spots"** panel identifies the category and provides a direct link to matching registry records.

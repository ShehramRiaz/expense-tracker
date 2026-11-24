# Personal Expense Tracker

A browser-based, frontend-only expense tracker built with React, TypeScript, Vite, Tailwind CSS, and Recharts. All transaction data is stored **locally in this browser**; the project has no backend or cloud sync.

## Features

- **Dashboard** — all-time income, expenses, balance, and five most recent transactions.
- **Transactions** — add, edit, delete with confirmation; search, filter, and sort; responsive mobile cards and desktop table.
- **Reports & Analytics** — current-month default, 12-month selector, all-time report, income/expense bar chart, and category doughnut chart.
- **Validation** — positive amounts in USD, valid category, present/past dates, and a warning before discarding changed form fields.
- **Storage safeguards** — malformed saved data is not silently overwritten; a backup-and-reset screen is shown instead. If saving fails, the change is not applied, and an error is shown.

## Requirements

- Node.js compatible with the versions declared in `package-lock.json` (React Router 8.5.1 requires Node.js **22.22.0 or newer**).
- npm.

## Local setup

```bash
npm ci
npm run dev
```

Open the URL shown by Vite (normally `http://localhost:5173`).

## Validation

```bash
npm run lint
npm run build
npm run test:logic
npm run preview
```

The `test:logic` script uses Node.js assertions and the already-installed TypeScript dev dependency to test pure calculation, date, and storage utilities. It is not a browser end-to-end test suite.

## Project layout

```text
src/
  components/
    dashboard/       Recent transaction list
    layout/          Responsive navigation
    reports/         Recharts components
    shared/          Shared summary cards and storage recovery
    transactions/    Transaction modal, filters, table, cards, empty states
  constants/         Categories and storage key
  context/           Transaction context and provider
  hooks/             Context access hook
  layouts/           Main app layout and modal ownership
  pages/             Dashboard, Transactions, Reports, Not Found
  types/             Domain and shared callback types
  utils/             Validation, formatting, storage, totals, chart aggregation
scripts/             Lightweight logic tests
audit/               Refactor notes and verification limits
```

## Notes on stored data

- Transactions are persisted to `localStorage` under `expense-tracker:transactions`.
- Storage is tied to the browser and site origin. Clearing site data, switching browsers, or using private browsing may make records unavailable.
- If the stored JSON cannot be validated, the application blocks normal editing rather than overwriting the stored value. Use the provided backup option before resetting.
- This app does **not** support cloud backup, imports, or synchronization. Back up important financial records separately.
- Reports use transaction **dates** (not creation timestamps). Date grouping is local-calendar based.
- No application backend is required; run `npm run build` for a static deployment. Configure the host to serve `index.html` for paths like `/transactions` and `/reports` because routing is handled in the browser.

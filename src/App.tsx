import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

import AppLayout from "./layouts/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import NotFoundPage from "./pages/NotFoundPage";

const ReportsPage = lazy(() => import("./pages/ReportsPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="transactions" element={<TransactionsPage />} />

        <Route
          path="reports"
          element={
            <Suspense
              fallback={
                <div
                  role="status"
                  className="px-4 py-10 text-center text-sm text-slate-600"
                >
                  Loading reports...
                </div>
              }
            >
              <ReportsPage />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;

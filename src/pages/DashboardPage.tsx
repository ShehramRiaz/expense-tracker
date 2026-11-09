import { useOutletContext } from "react-router";

import type { AppOutletContext } from "../types/app";

import RecentTransactions from "../components/RecentTransactions";
import SummaryCard from "../components/SummaryCard";

function DashboardPage() {
  const { openTransactionModal } = useOutletContext<AppOutletContext>();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Overview of your finances
          </p>
        </div>

        <button
          type="button"
          className="w-full cursor-pointer rounded-lg bg-sky-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:w-auto"
          onClick={openTransactionModal}
        >
          Add Transaction
        </button>
      </header>

      <section
        aria-label="Financial summary"
        className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <SummaryCard title="Total Balance" amount="$0.00" variant="neutral" />
        <SummaryCard title="Total Income" amount="$0.00" variant="income" />
        <SummaryCard title="Total Expenses" amount="$0.00" variant="expense" />
      </section>

      <RecentTransactions />
    </div>
  );
}

export default DashboardPage;

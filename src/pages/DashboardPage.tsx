import { useOutletContext } from "react-router";

import type { AppOutletContext } from "../types/app";

import RecentTransactions from "../components/dashboard/RecentTransactions";
import SummaryCard from "../components/shared/SummaryCard";
import useTransactions from "../hooks/useTransactions";
import { formatCurrency } from "../utils/currency";
import { calculateTransactionTotals } from "../utils/transactionTotals";

function DashboardPage() {
  const { openTransactionModal } = useOutletContext<AppOutletContext>();
  const { transactions } = useTransactions();

  const { incomeCents, expenseCents, balanceCents } =
    calculateTransactionTotals(transactions);

  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
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
        <SummaryCard
          title="Total Balance"
          amount={formatCurrency(balanceCents)}
          variant="neutral"
          isNegative={balanceCents < 0}
        />
        <SummaryCard
          title="Total Income"
          amount={formatCurrency(incomeCents)}
          variant="income"
        />
        <SummaryCard
          title="Total Expenses"
          amount={formatCurrency(expenseCents)}
          variant="expense"
        />
      </section>

      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}

export default DashboardPage;

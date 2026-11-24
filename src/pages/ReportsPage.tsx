import { useState } from "react";
import {
  getCurrentMonth,
  getRecentMonths,
  formatReportMonth,
} from "../utils/reportPeriod";
import useTransactions from "../hooks/useTransactions";
import { formatCurrency } from "../utils/currency";
import { calculateTransactionTotals } from "../utils/transactionTotals";
import SummaryCard from "../components/shared/SummaryCard";
import {
  getDailyChartData,
  getMonthlyChartData,
  getExpenseCategoryData,
} from "../utils/reportAnalytics";

import IncomeExpenseChart from "../components/reports/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/reports/ExpenseCategoryChart";

function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState(getCurrentMonth);
  const recentMonths = getRecentMonths(12);
  const { transactions } = useTransactions();
  const filteredTransactions = transactions.filter((transaction) => {
    if (selectedPeriod === "all") {
      return true;
    }

    return transaction.date.startsWith(`${selectedPeriod}-`);
  });

  const { incomeCents, expenseCents, balanceCents } =
    calculateTransactionTotals(filteredTransactions);

  const chartData =
    selectedPeriod === "all"
      ? getMonthlyChartData(filteredTransactions)
      : getDailyChartData(filteredTransactions, selectedPeriod);

  const expenseCategoryData = getExpenseCategoryData(filteredTransactions);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Reports & Analytics
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Understand your income and spending.
          </p>
        </div>

        <div className="w-full sm:w-56">
          <label
            htmlFor="report-period"
            className="block text-sm font-medium text-slate-700"
          >
            Reporting period
          </label>

          <select
            id="report-period"
            value={selectedPeriod}
            onChange={(event) => setSelectedPeriod(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {recentMonths.map((month) => (
              <option key={month} value={month}>
                {formatReportMonth(month)}
              </option>
            ))}

            <option value="all">All time</option>
          </select>
        </div>
      </header>

      <p className="text-sm text-slate-600">
        Transactions in selected period: {filteredTransactions.length}
      </p>

      <section
        aria-label="Report financial summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <SummaryCard
          title="Net Balance"
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

      <IncomeExpenseChart
        data={chartData}
        hasTransactions={filteredTransactions.length > 0}
      />

      <ExpenseCategoryChart data={expenseCategoryData} />
    </section>
  );
}

export default ReportsPage;

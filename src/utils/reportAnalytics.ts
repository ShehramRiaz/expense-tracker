import type { Transaction } from "../types/transaction";
import { formatReportMonth } from "./reportPeriod";

export interface ChartDataPoint {
  label: string;
  income: number;
  expenses: number;
}

export interface ExpenseCategoryDataPoint {
  category: string;
  amount: number;
}

interface GroupedTotals {
  incomeCents: number;
  expenseCents: number;
}

/** Share the accumulation logic between the daily and monthly reports. */
function groupTransactionTotals(
  transactions: readonly Transaction[],
  getKey: (transaction: Transaction) => string,
): Map<string, GroupedTotals> {
  const totalsByKey = new Map<string, GroupedTotals>();

  for (const transaction of transactions) {
    const key = getKey(transaction);
    const totals = totalsByKey.get(key) ?? {
      incomeCents: 0,
      expenseCents: 0,
    };

    if (transaction.type === "income") {
      totals.incomeCents += transaction.amountCents;
    } else {
      totals.expenseCents += transaction.amountCents;
    }

    totalsByKey.set(key, totals);
  }

  return totalsByKey;
}

export function getDailyChartData(
  transactions: readonly Transaction[],
  selectedMonth: string,
): ChartDataPoint[] {
  const dailyTotals = groupTransactionTotals(
    transactions,
    (transaction) => transaction.date,
  );

  const [year, month] = selectedMonth.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const chartData: ChartDataPoint[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${selectedMonth}-${String(day).padStart(2, "0")}`;
    const totals = dailyTotals.get(dateKey) ?? {
      incomeCents: 0,
      expenseCents: 0,
    };

    chartData.push({
      label: String(day),
      income: totals.incomeCents / 100,
      expenses: totals.expenseCents / 100,
    });
  }

  return chartData;
}

export function getMonthlyChartData(
  transactions: readonly Transaction[],
): ChartDataPoint[] {
  const monthlyTotals = groupTransactionTotals(
    transactions,
    (transaction) => transaction.date.slice(0, 7),
  );

  return [...monthlyTotals.entries()]
    .sort(([monthA], [monthB]) => monthA.localeCompare(monthB))
    .map(([month, totals]) => ({
      label: formatReportMonth(month),
      income: totals.incomeCents / 100,
      expenses: totals.expenseCents / 100,
    }));
}

export function getExpenseCategoryData(
  transactions: readonly Transaction[],
): ExpenseCategoryDataPoint[] {
  const categoryTotals = new Map<string, number>();

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    categoryTotals.set(
      transaction.category,
      (categoryTotals.get(transaction.category) ?? 0) + transaction.amountCents,
    );
  }

  return [...categoryTotals.entries()]
    .map(([category, amountCents]) => ({
      category,
      amount: amountCents / 100,
    }))
    .sort((a, b) => b.amount - a.amount);
}

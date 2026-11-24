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

export function getDailyChartData(
  transactions: Transaction[],
  selectedMonth: string,
): ChartDataPoint[] {
  const dailyTotals = new Map<
    string,
    { incomeCents: number; expenseCents: number }
  >();

  for (const transaction of transactions) {
    const dateKey = transaction.date;

    const totals = dailyTotals.get(dateKey) ?? {
      incomeCents: 0,
      expenseCents: 0,
    };

    if (transaction.type === "income") {
      totals.incomeCents += transaction.amountCents;
    } else {
      totals.expenseCents += transaction.amountCents;
    }

    dailyTotals.set(dateKey, totals);
  }

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
  transactions: Transaction[],
): ChartDataPoint[] {
  const monthlyTotals = new Map<
    string,
    { incomeCents: number; expenseCents: number }
  >();

  for (const transaction of transactions) {
    const monthKey = transaction.date.slice(0, 7);

    const totals = monthlyTotals.get(monthKey) ?? {
      incomeCents: 0,
      expenseCents: 0,
    };

    if (transaction.type === "income") {
      totals.incomeCents += transaction.amountCents;
    } else {
      totals.expenseCents += transaction.amountCents;
    }

    monthlyTotals.set(monthKey, totals);
  }

  const sortedMonths = [...monthlyTotals.entries()].sort(([monthA], [monthB]) =>
    monthA.localeCompare(monthB),
  );

  const chartData: ChartDataPoint[] = sortedMonths.map(([month, totals]) => ({
    label: formatReportMonth(month),
    income: totals.incomeCents / 100,
    expenses: totals.expenseCents / 100,
  }));

  return chartData;
}

export function getExpenseCategoryData(
  transactions: Transaction[],
): ExpenseCategoryDataPoint[] {
  const categoryTotals = new Map<string, number>();

  for (const transaction of transactions) {
    if (transaction.type !== "expense") {
      continue;
    }

    const currentTotal = categoryTotals.get(transaction.category) ?? 0;

    categoryTotals.set(
      transaction.category,
      currentTotal + transaction.amountCents,
    );
  }

  const chartData: ExpenseCategoryDataPoint[] = [...categoryTotals.entries()]
    .map(([category, amountCents]) => ({
      category,
      amount: amountCents / 100,
    }))
    .sort((a, b) => b.amount - a.amount);

  return chartData;
}

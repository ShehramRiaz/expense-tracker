import { getTodayDate } from "./date";

const reportMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export function getCurrentMonth() {
  return getTodayDate().slice(0, 7);
}

export function getRecentMonths(count: number): string[] {
  const months: string[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    months.push(`${year}-${month}`);
  }

  return months;
}

export function formatReportMonth(month: string): string {
  const [year, monthNumber] = month.split("-").map(Number);

  const date = new Date(year, monthNumber - 1, 1);

  return reportMonthFormatter.format(date);
}
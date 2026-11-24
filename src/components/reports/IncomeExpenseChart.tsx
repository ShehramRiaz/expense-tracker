import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { formatCurrency } from "../../utils/currency";
import type { ChartDataPoint } from "../../utils/reportAnalytics";

interface IncomeExpenseChartProps {
  data: ChartDataPoint[];
  hasTransactions: boolean;
}

function IncomeExpenseChart({
  data,
  hasTransactions,
}: IncomeExpenseChartProps) {
  const monthlyLabels = data.some((point) => point.label.length > 2);
  const minimumChartWidth = Math.max(700, data.length * (monthlyLabels ? 100 : 32));

  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Income vs. Expenses
      </h2>

      <p className="mt-1 text-sm text-slate-600">
        Compare your income and expenses over time.
      </p>

      <div className="mt-6">
        {!hasTransactions ? (
          <div className="flex min-h-80 flex-col items-center justify-center text-center">
            <p className="font-medium text-slate-900">No financial activity</p>

            <p className="mt-2 max-w-sm text-sm text-slate-600">
              There are no transactions in the selected reporting period.
            </p>
          </div>
        ) : (
          <div
            className="w-full overflow-x-auto"
            role="region"
            aria-label="Income and expenses chart"
            tabIndex={0}
          >
            <div className="h-80" style={{ minWidth: minimumChartWidth }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />

                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                    tickFormatter={(value: number) => {
                      if (value >= 1000) {
                        return `$${value / 1000}k`;
                      }

                      return `$${value}`;
                    }}
                  />

                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(Math.round(Number(value) * 100))
                    }
                  />

                  <Legend />

                  <Bar
                    dataKey="income"
                    name="Income"
                    fill="#15803d"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="expenses"
                    name="Expenses"
                    fill="#dc2626"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default IncomeExpenseChart;

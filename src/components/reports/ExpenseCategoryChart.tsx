import type { ExpenseCategoryDataPoint } from "../../utils/reportAnalytics";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { formatCurrency } from "../../utils/currency";

interface ExpenseCategoryChartProps {
  data: ExpenseCategoryDataPoint[];
}

const CATEGORY_COLORS = [
  "#0284c7",
  "#16a34a",
  "#eab308",
  "#9333ea",
  "#ea580c",
  "#db2777",
  "#0891b2",
  "#64748b",
];

function ExpenseCategoryChart({ data }: ExpenseCategoryChartProps) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">
        Expenses by Category
      </h2>

      <p className="mt-1 text-sm text-slate-600">
        See how your spending is distributed across categories.
      </p>

      <div className="mt-6">
        {data.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center text-center">
            <p className="font-medium text-slate-900">No expenses to display</p>

            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Expense categories will appear here when you record expenses in
              the selected period.
            </p>
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.category}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(Math.round(Number(value) * 100))
                  }
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExpenseCategoryChart;

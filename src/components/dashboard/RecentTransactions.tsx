import { Link } from "react-router";
import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/formatDate";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Transactions
        </h2>
        <Link
          to="/transactions"
          className="rounded-sm text-sm font-medium text-sky-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          View all
        </Link>
      </header>

      {transactions.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <p className="font-medium text-slate-900">No transactions yet</p>
          <p className="mt-2 text-sm text-slate-600">
            Your recent transactions will appear here once you start tracking
            your finances.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {transactions.map((transaction) => {
            const isIncome = transaction.type === "income";

            return (
              <li
                key={transaction.id}
                className="flex flex-col items-start gap-2 px-5 py-4 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="wrap-break-word text-sm font-medium text-slate-900">
                    {transaction.description || transaction.category}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {transaction.description && `${transaction.category} · `}
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <p
                  className={`max-w-full break-all text-sm font-semibold tabular-nums sm:shrink-0 sm:text-right sm:break-normal ${
                    isIncome ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {isIncome ? "+" : "−"}
                  {formatCurrency(transaction.amountCents)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default RecentTransactions;

import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/formatDate";

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  return (
    <table className="w-full min-w-[650px] text-left text-sm">
      <thead className="bg-slate-50">
        <tr>
          <th
            scope="col"
            className="px-4 py-3 text-xs font-semibold text-slate-600"
          >
            Description
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-xs font-semibold text-slate-600"
          >
            Type
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-xs font-semibold text-slate-600"
          >
            Category
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-xs font-semibold text-slate-600"
          >
            Date
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-right text-xs font-semibold text-slate-600"
          >
            Amount
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-right text-xs font-semibold text-slate-600"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <tr
              key={transaction.id}
              className="border-t border-slate-100 hover:bg-slate-50"
            >
              <td className="px-4 py-3 text-slate-900">
                {transaction.description.trim() ? (
                  <span className="wrap-break-word">{transaction.description}</span>
                ) : (
                  <span className="italic text-slate-400">No description</span>
                )}
              </td>

              <td
                className={`px-4 py-3 font-semibold ${
                  isIncome ? "text-green-700" : "text-red-600"
                }`}
              >
                {isIncome ? "Income" : "Expense"}
              </td>

              <td className="px-4 py-3 text-slate-700">
                {transaction.category}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                {formatDate(transaction.date)}
              </td>

              <td
                className={`px-4 py-3 text-right font-semibold tabular-nums whitespace-nowrap ${
                  isIncome ? "text-green-700" : "text-red-600"
                }`}
              >
                {isIncome ? "+" : "−"}
                {formatCurrency(transaction.amountCents)}
              </td>

              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(transaction)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(transaction)}
                  className="ml-2 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TransactionTable;

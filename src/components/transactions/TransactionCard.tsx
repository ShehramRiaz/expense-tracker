import type { Transaction } from "../../types/transaction";
import { formatCurrency } from "../../utils/currency";
import { formatDate } from "../../utils/formatDate";

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

function TransactionCard({
  transaction,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  const isIncome = transaction.type === "income";

  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-3">
        <div className="min-w-0 flex-1">
          {transaction.description && (
            <p className="wrap-break-word font-medium text-slate-900">
              {transaction.description}
            </p>
          )}

          <p className="text-sm text-slate-600">{transaction.category}</p>

          <p
            className={
              isIncome
                ? "text-sm font-medium text-green-700"
                : "text-sm font-medium text-red-600"
            }
          >
            {isIncome ? "Income" : "Expense"}
          </p>
        </div>

        <p
          className={`max-w-full break-all font-semibold tabular-nums sm:shrink-0 sm:text-right sm:break-normal ${
            isIncome ? "text-green-700" : "text-red-600"
          }`}
        >
          {isIncome ? "+" : "−"}
          {formatCurrency(transaction.amountCents)}
        </p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {formatDate(transaction.date)}
      </p>

      <button
        type="button"
        onClick={() => onEdit(transaction)}
        className="mt-3 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
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
    </li>
  );
}

export default TransactionCard;

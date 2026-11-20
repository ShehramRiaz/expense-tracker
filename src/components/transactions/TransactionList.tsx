import type { Transaction } from "../../types/transaction";
import TransactionCard from "./TransactionCard";
import TransactionTable from "./TransactionTable";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  return (
    <>
      <div className="md:hidden">
        <ul className="mt-4 space-y-2">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 bg-white md:block">
        <TransactionTable
          transactions={transactions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  );
}

export default TransactionList;

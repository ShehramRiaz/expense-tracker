import type { Transaction, NewTransaction } from "./transaction";

export interface TransactionContextValue {
  transactions: Transaction[];
  addTransaction: (transaction: NewTransaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

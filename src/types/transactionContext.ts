import type { Transaction, NewTransaction } from "./transaction";

export interface TransactionContextValue {
  transactions: readonly Transaction[];
  addTransaction: (transaction: NewTransaction) => boolean;
  updateTransaction: (transaction: Transaction) => boolean;
  deleteTransaction: (id: string) => boolean;
}

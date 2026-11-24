import type { Transaction } from "../types/transaction";

export interface TransactionTotals {
  incomeCents: number;
  expenseCents: number;
  balanceCents: number;
}

/** Returns all-time or period-specific totals without storing redundant state. */
export function calculateTransactionTotals(
  transactions: readonly Transaction[],
): TransactionTotals {
  let incomeCents = 0;
  let expenseCents = 0;

  for (const transaction of transactions) {
    if (transaction.type === "income") {
      incomeCents += transaction.amountCents;
    } else {
      expenseCents += transaction.amountCents;
    }
  }

  return {
    incomeCents,
    expenseCents,
    balanceCents: incomeCents - expenseCents,
  };
}

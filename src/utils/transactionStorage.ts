import { TRANSACTIONS_STORAGE_KEY } from "../constants/storage";
import type { Transaction } from "../types/transaction";
import { isTransaction } from "./transactionValidation";

export function loadTransactions(): Transaction[] {
  try {
    const stored = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);

    if (stored === null) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const parsedArray: unknown[] = parsed;

    if (!parsedArray.every(isTransaction)) {
      return [];
    }

    return parsedArray;
  } catch {
    return [];
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  try {
    localStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions),
    );
  } catch (error) {
    console.error("Failed to save transactions:", error);
  }
}

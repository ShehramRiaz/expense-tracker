import { TRANSACTIONS_STORAGE_KEY } from "../constants/storage";
import type { Transaction } from "../types/transaction";
import { isTransaction } from "./transactionValidation";

export type StorageLoadResult =
  | { status: "ok"; transactions: Transaction[] }
  | { status: "invalid"; transactions: []; rawBackup: string }
  | { status: "unavailable"; transactions: [] };

/** Never replace malformed saved data with an empty collection on startup. */
export function loadTransactions(): StorageLoadResult {
  let stored: string | null;

  try {
    stored = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
  } catch {
    return { status: "unavailable", transactions: [] };
  }

  if (stored === null) {
    return { status: "ok", transactions: [] };
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed) || !parsed.every(isTransaction)) {
      return { status: "invalid", transactions: [], rawBackup: stored };
    }

    const transactions: Transaction[] = parsed;
    const ids = new Set(transactions.map((transaction) => transaction.id));

    if (ids.size !== transactions.length) {
      return { status: "invalid", transactions: [], rawBackup: stored };
    }

    return { status: "ok", transactions };
  } catch {
    return { status: "invalid", transactions: [], rawBackup: stored };
  }
}

/** Let the caller handle failures instead of pretending an edit was saved. */
export function saveTransactions(transactions: readonly Transaction[]): void {
  localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
}

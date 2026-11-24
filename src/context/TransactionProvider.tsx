import { useRef, useState } from "react";
import type { ReactNode } from "react";

import { TRANSACTIONS_STORAGE_KEY } from "../constants/storage";
import StorageRecovery from "../components/shared/StorageRecovery";
import type { Transaction, NewTransaction } from "../types/transaction";
import type { TransactionContextValue } from "../types/transactionContext";
import { loadTransactions, saveTransactions } from "../utils/transactionStorage";
import { TransactionContext } from "./TransactionContext";

interface TransactionProviderProps {
  children: ReactNode;
}

function TransactionProvider({ children }: TransactionProviderProps) {
  const [initialLoad, setInitialLoad] = useState(loadTransactions);
  const [transactions, setTransactions] = useState(initialLoad.transactions);
  const transactionsRef = useRef<Transaction[]>(initialLoad.transactions);
  const [storageError, setStorageError] = useState<string | null>(null);

  function persist(next: Transaction[]): boolean {
    try {
      saveTransactions(next);
      transactionsRef.current = next;
      setTransactions(next);
      setStorageError(null);
      return true;
    } catch (error) {
      console.error("Unable to persist transactions:", error);
      setStorageError(
        "Your change could not be saved, so it was not applied. Check browser storage and try again.",
      );
      return false;
    }
  }

  function addTransaction(transaction: NewTransaction) {
    const savedTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    return persist([...transactionsRef.current, savedTransaction]);
  }

  function deleteTransaction(id: string) {
    return persist(
      transactionsRef.current.filter((transaction) => transaction.id !== id),
    );
  }

  function updateTransaction(updatedTransaction: Transaction) {
    return persist(
      transactionsRef.current.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    );
  }

  function resetInvalidStorage() {
    try {
      localStorage.removeItem(TRANSACTIONS_STORAGE_KEY);
      transactionsRef.current = [];
      setTransactions([]);
      setInitialLoad({ status: "ok", transactions: [] });
      setStorageError(null);
    } catch (error) {
      console.error("Unable to reset saved data:", error);
      setStorageError(
        "Could not reset saved data. Check your browser storage permissions.",
      );
    }
  }

  if (initialLoad.status !== "ok") {
    return (
      <StorageRecovery
        status={initialLoad.status}
        rawBackup={
          initialLoad.status === "invalid" ? initialLoad.rawBackup : undefined
        }
        error={storageError}
        onReset={resetInvalidStorage}
      />
    );
  }

  const contextValue: TransactionContextValue = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext value={contextValue}>
      {storageError && (
        <div
          role="alert"
          className="fixed inset-x-3 top-3 z-[100] mx-auto max-w-2xl rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-md"
        >
          {storageError}
        </div>
      )}
      {children}
    </TransactionContext>
  );
}

export default TransactionProvider;

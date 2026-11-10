import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import type { Transaction, NewTransaction } from "../types/transaction";
import { TransactionContext } from "./TransactionContext";
import type { TransactionContextValue } from "../types/transactionContext";
import {
  loadTransactions,
  saveTransactions,
} from "../utils/transactionStorage";

interface TransactionProviderProps {
  children: ReactNode;
}

function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(loadTransactions);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  function addTransaction(transaction: NewTransaction) {
    const savedTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };

    setTransactions((previousTransactions) => [
      ...previousTransactions,
      savedTransaction,
    ]);
  }

  function deleteTransaction(id: string) {
    setTransactions((previousTransactions) =>
      previousTransactions.filter((transaction) => transaction.id !== id),
    );
  }

  function updateTransaction(updatedTransaction: Transaction) {
    setTransactions((previousTransactions) =>
      previousTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      ),
    );
  }

  const contextValue: TransactionContextValue = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext value={contextValue}>{children}</TransactionContext>
  );
}

export default TransactionProvider;

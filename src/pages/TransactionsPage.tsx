import { useState } from "react";
import { useOutletContext } from "react-router";
import TransactionList from "../components/transactions/TransactionList";
import useTransactions from "../hooks/useTransactions";
import TransactionFilters from "../components/transactions/TransactionFilters";
import type { Transaction } from "../types/transaction";
import type {
  TransactionTypeFilter,
  TransactionSortOrder,
} from "../types/transactionFilters";
import TransactionEmptyState from "../components/transactions/TransactionEmptyState";

interface TransactionModalOutletContext {
  openTransactionModal: () => void;
  openEditTransactionModal: (transaction: Transaction) => void;
}

function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<TransactionSortOrder>("newest");
  const { openEditTransactionModal, openTransactionModal } =
    useOutletContext<TransactionModalOutletContext>();

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description
        .toLowerCase()
        .includes(normalizedQuery);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" || transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return b.date.localeCompare(a.date);

        case "oldest":
          return a.date.localeCompare(b.date);

        case "amount-high":
          return b.amountCents - a.amountCents;

        case "amount-low":
          return a.amountCents - b.amountCents;
      }
    });

  function handleTypeFilterChange(value: TransactionTypeFilter) {
    setTypeFilter(value);
    setCategoryFilter("all");
  }

  function handleDeleteTransaction(transaction: Transaction) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction? This action cannot be undone.",
    );

    if (!confirmed) return;

    deleteTransaction(transaction.id);
  }

  function clearFilters() {
    setSearchQuery("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setSortOrder("newest");
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Transactions
        </h1>

        <p className="text-sm text-slate-600">
          Total transactions: {transactions.length}
        </p>
      </div>

      <TransactionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onTypeFilterChange={handleTypeFilterChange}
        typeFilter={typeFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {transactions.length === 0 ? (
        <TransactionEmptyState
          variant="no-transactions"
          onAction={openTransactionModal}
        />
      ) : filteredTransactions.length === 0 ? (
        <TransactionEmptyState variant="no-results" onAction={clearFilters} />
      ) : (
        <TransactionList
          transactions={filteredTransactions}
          onEdit={openEditTransactionModal}
          onDelete={handleDeleteTransaction}
        />
      )}
    </section>
  );
}

export default TransactionsPage;

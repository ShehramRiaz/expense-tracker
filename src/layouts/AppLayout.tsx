import { useState } from "react";
import { Outlet } from "react-router";

import Navigation from "../components/layout/Navigation";
import TransactionModal from "../components/transactions/TransactionModal";
import type { Transaction } from "../types/transaction";

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  function openTransactionModal() {
    setEditingTransaction(null);
    setIsModalOpen(true);
  }

  function openEditTransactionModal(transaction: Transaction) {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  }

  function closeTransactionModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-700 text-white shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <rect x="3" y="5" width="18" height="15" rx="2" />
              <path d="M3 10h18M16 15h2" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Expense Tracker
          </span>
        </div>
      </header>

      <Navigation />

      <main className="min-w-0 pb-24 lg:ml-64 lg:pb-0">
        <Outlet
          context={{ openTransactionModal, openEditTransactionModal }}
        />
      </main>

      {isModalOpen && (
        <TransactionModal
          onClose={closeTransactionModal}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  );
}

export default AppLayout;

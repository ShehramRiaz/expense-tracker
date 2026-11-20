import { useState } from "react";
import { Outlet } from "react-router";

import Navigation from "../components/Navigation";
import TransactionModal from "../components/TransactionModal";
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
    <div className="flex min-h-screen flex-col">
      <header className="w-full">Expense Tracker</header>

      <div className="grid flex-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <Navigation />

        <main className="min-w-0 pb-20 lg:pb-0">
          <Outlet
            context={{ openTransactionModal, openEditTransactionModal }}
          />
        </main>
      </div>

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

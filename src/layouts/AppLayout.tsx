import { useState } from "react";
import { Outlet } from "react-router";

import Navigation from "../components/Navigation";
import TransactionModal from "../components/TransactionModal";

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openTransactionModal() {
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
          <Outlet context={{ openTransactionModal }} />
        </main>
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={closeTransactionModal} />
    </div>
  );
}

export default AppLayout;

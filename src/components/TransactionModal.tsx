import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";

interface TransactionModalProps {
  onClose: () => void;
  isOpen: boolean;
}

function TransactionModal({ onClose, isOpen }: TransactionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) {
      onClose();
    }
  }

  return (
    <dialog
      aria-labelledby="transaction-modal-title"
      className="w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-6 shadow-xl backdrop:bg-slate-900/50"
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <h2
        id="transaction-modal-title"
        className="text-xl font-semibold text-slate-900"
      >
        Add Transaction
      </h2>
      <p className="mt-3 text-sm text-slate-600">
        The transaction form will be added later.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
      >
        Close
      </button>
    </dialog>
  );
}

export default TransactionModal;

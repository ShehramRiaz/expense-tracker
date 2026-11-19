import { useEffect, useRef, useState } from "react";
import type { MouseEvent, FormEvent, SyntheticEvent } from "react";
import type { NewTransaction, TransactionType } from "../types/transaction";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";
import { getTodayDate } from "../utils/date";
import { isValidAmount, parseAmountToCents } from "../utils/amount";
import {
  isExpenseCategory,
  isIncomeCategory,
  isValidTransactionDate,
} from "../utils/transactionValidation";
import useTransactions from "../hooks/useTransactions";

interface TransactionModalProps {
  onClose: () => void;
  isOpen: boolean;
}

function TransactionModal({ onClose, isOpen }: TransactionModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [description, setDescription] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(getTodayDate);

  const [amountError, setAmountError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [dateError, setDateError] = useState("");

  const { addTransaction } = useTransactions();

  const availableCategories =
    type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const hasUnsavedChanges =
    type !== "expense" ||
    category !== "" ||
    amount !== "" ||
    description !== "" ||
    date !== getTodayDate();

  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleRequestClose() {
    if (
      hasUnsavedChanges &&
      !window.confirm("You have unsaved changes. Discard them?")
    ) {
      return;
    }

    resetForm();
    onClose();
  }

  function handleCancel(event: SyntheticEvent<HTMLDialogElement>) {
    event.preventDefault();
    handleRequestClose();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const isOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutside) {
      handleRequestClose();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isAmountValid = isValidAmount(amount);
    const isCategoryValid =
      type === "income"
        ? isIncomeCategory(category)
        : isExpenseCategory(category);
    const isDateValid = isValidTransactionDate(date);

    setAmountError(
      isAmountValid
        ? ""
        : "Enter a positive amount with no more than two decimal places.",
    );

    setCategoryError(isCategoryValid ? "" : "Please select a valid category.");

    setDateError(
      isDateValid
        ? ""
        : "Please select a valid date that is not in the future.",
    );

    if (!isAmountValid || !isCategoryValid || !isDateValid) {
      if (!isCategoryValid) {
        categoryRef.current?.focus();
      } else if (!isAmountValid) {
        amountRef.current?.focus();
      } else {
        dateRef.current?.focus();
      }

      return;
    }

    const amountCents = parseAmountToCents(amount);

    let newTransaction: NewTransaction;

    if (type === "income") {
      if (!isIncomeCategory(category)) return;

      newTransaction = {
        type,
        amountCents,
        category,
        date,
        description,
      };
    } else {
      if (!isExpenseCategory(category)) return;

      newTransaction = {
        type,
        amountCents,
        category,
        date,
        description,
      };
    }

    addTransaction(newTransaction);
    resetForm();
    onClose();
  }

  function resetForm() {
    setDescription("");
    setType("expense");
    setCategory("");
    setAmount("");
    setDate(getTodayDate());
    setCategoryError("");
    setAmountError("");
    setDateError("");
  }

  return (
    <dialog
      aria-labelledby="transaction-modal-title"
      className="w-[calc(100%-2rem)] max-w-md rounded-xl bg-white p-6 shadow-xl backdrop:bg-slate-900/50"
      ref={dialogRef}
      onCancel={handleCancel}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <h2
        id="transaction-modal-title"
        className="text-xl font-semibold text-slate-900"
      >
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="transaction-description">Description (optional)</label>
        <input
          type="text"
          id="transaction-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          autoFocus
        />

        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-slate-700">
            Transaction Type
          </legend>

          <div className="mt-2 flex gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="transaction-type"
                value="expense"
                checked={type === "expense"}
                onChange={() => {
                  setType("expense");
                  setCategory("");
                  setCategoryError("");
                }}
              />
              Expense
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="transaction-type"
                value="income"
                checked={type === "income"}
                onChange={() => {
                  setType("income");
                  setCategory("");
                  setCategoryError("");
                }}
              />
              Income
            </label>
          </div>
        </fieldset>

        <label
          htmlFor="transaction-category"
          className="mt-4 block text-sm font-medium text-slate-700"
        >
          Category
        </label>
        <select
          id="transaction-category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setCategoryError("");
          }}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          aria-invalid={Boolean(categoryError)}
          aria-describedby={
            categoryError ? "transaction-category-error" : undefined
          }
          ref={categoryRef}
        >
          <option value="">Select a category</option>

          {availableCategories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
        {categoryError && (
          <p
            id="transaction-category-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {categoryError}
          </p>
        )}

        <label
          htmlFor="transaction-amount"
          className="mt-4 block text-sm font-medium text-slate-700"
        >
          Amount (USD)
        </label>
        <input
          id="transaction-amount"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            setAmountError("");
          }}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          aria-invalid={Boolean(amountError)}
          aria-describedby={
            amountError ? "transaction-amount-error" : undefined
          }
          ref={amountRef}
        />
        {amountError && (
          <p
            id="transaction-amount-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {amountError}
          </p>
        )}

        <label
          htmlFor="transaction-date"
          className="mt-4 block text-sm font-medium text-slate-700"
        >
          Transaction Date
        </label>
        <input
          id="transaction-date"
          type="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
            setDateError("");
          }}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          max={getTodayDate()}
          aria-invalid={Boolean(dateError)}
          aria-describedby={dateError ? "transaction-date-error" : undefined}
          ref={dateRef}
        />
        {dateError && (
          <p
            id="transaction-date-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {dateError}
          </p>
        )}

        <button
          type="button"
          onClick={handleRequestClose}
          className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          Close
        </button>

        <button type="submit">Save Transaction</button>
      </form>
    </dialog>
  );
}

export default TransactionModal;

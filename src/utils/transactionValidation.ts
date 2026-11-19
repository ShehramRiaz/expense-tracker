import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/categories";
import type { ExpenseCategory, IncomeCategory, Transaction } from "../types/transaction";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidCalendarDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(0);

  parsedDate.setFullYear(year, month - 1, day);

  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  );
}

function isTodayOrEarlier(date: string): boolean {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const todayString = `${year}-${month}-${day}`;

  return date <= todayString;
}

function isAllowedCategory(
  category: unknown,
  categories: readonly string[],
): boolean {
  return typeof category === "string" && categories.includes(category);
}

export function isTransaction(value: unknown): value is Transaction {
  if (!isRecord(value)) return false;

  const isIdValid = typeof value.id === "string" && value.id.trim().length > 0;

  const isAmountValid =
    typeof value.amountCents === "number" &&
    Number.isSafeInteger(value.amountCents) &&
    value.amountCents > 0;

  const isDescriptionValid = typeof value.description === "string";

  const isDateValid =
    typeof value.date === "string" && isValidTransactionDate(value.date);

  const isTypeValid = value.type === "income" || value.type === "expense";

  const isCategoryValid =
    (value.type === "income" &&
      isAllowedCategory(value.category, INCOME_CATEGORIES)) ||
    (value.type === "expense" &&
      isAllowedCategory(value.category, EXPENSE_CATEGORIES));

  if (
    !isIdValid ||
    !isAmountValid ||
    !isDescriptionValid ||
    !isDateValid ||
    !isTypeValid ||
    !isCategoryValid
  )
    return false;

  return true;
}

export function isValidTransactionDate(date: string): boolean {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  return (
    datePattern.test(date) &&
    isValidCalendarDate(date) &&
    isTodayOrEarlier(date)
  );
}

export function isIncomeCategory(value: string): value is IncomeCategory {
  const categories: readonly string[] = INCOME_CATEGORIES;
  return categories.includes(value);
}

export function isExpenseCategory(value: string): value is ExpenseCategory {
  const categories: readonly string[] = EXPENSE_CATEGORIES;
  return categories.includes(value);
}
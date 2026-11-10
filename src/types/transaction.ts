import type {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../constants/categories";

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type TransactionCategory = IncomeCategory | ExpenseCategory;

export type TransactionType = "income" | "expense";

interface BaseTransaction {
  id: string;
  amountCents: number;
  description: string;
  date: string;
}

interface IncomeTransaction extends BaseTransaction {
  type: "income";
  category: IncomeCategory;
}

interface ExpenseTransaction extends BaseTransaction {
  type: "expense";
  category: ExpenseCategory;
}

export type Transaction = IncomeTransaction | ExpenseTransaction;

export type NewTransaction =
  | Omit<IncomeTransaction, "id">
  | Omit<ExpenseTransaction, "id">;

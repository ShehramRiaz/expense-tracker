import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../../constants/categories";
import type {
  TransactionTypeFilter,
  TransactionSortOrder,
} from "../../types/transactionFilters";

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;

  typeFilter: TransactionTypeFilter;
  onTypeFilterChange: (value: TransactionTypeFilter) => void;

  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;

  sortOrder: TransactionSortOrder;
  onSortOrderChange: (value: TransactionSortOrder) => void;
}

function TransactionFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortOrder,
  onSortOrderChange,
}: TransactionFiltersProps) {
  const availableCategories =
    typeFilter === "income"
      ? INCOME_CATEGORIES
      : typeFilter === "expense"
        ? EXPENSE_CATEGORIES
        : [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];

  return (
    <div>
      <label
        htmlFor="transaction-search"
        className="block text-sm font-medium text-slate-700"
      >
        Search transactions
      </label>

      <input
        id="transaction-search"
        type="search"
        placeholder="Search by description..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
      />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label
            htmlFor="transaction-type-filter"
            className="block text-sm font-medium text-slate-700"
          >
            Type
          </label>
          <select
            id="transaction-type-filter"
            value={typeFilter}
            onChange={(event) =>
              onTypeFilterChange(event.target.value as TransactionTypeFilter)
            }
            className="mt-1 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <option value="all">All Transactions</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="transaction-category-filter"
            className="block text-sm font-medium text-slate-700"
          >
            Category
          </label>
          <select
            id="transaction-category-filter"
            value={categoryFilter}
            onChange={(event) => onCategoryFilterChange(event.target.value)}
            className="mt-1 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <option value="all">All categories</option>
            {availableCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="transaction-date-sort"
            className="block text-sm font-medium text-slate-700"
          >
            Sort By
          </label>
          <select
            id="transaction-date-sort"
            value={sortOrder}
            onChange={(event) =>
              onSortOrderChange(event.target.value as TransactionSortOrder)
            }
            className="mt-1 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="amount-high">Amount: High to Low</option>
            <option value="amount-low">Amount: Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TransactionFilters;

type EmptyStateVariant = "no-transactions" | "no-results";

interface TransactionEmptyStateProps {
  variant: EmptyStateVariant;
  onAction: () => void;
}

function TransactionEmptyState({
  variant,
  onAction,
}: TransactionEmptyStateProps) {
  const hasNoTransactions = variant === "no-transactions";

  const title = hasNoTransactions
    ? "No transactions yet"
    : "No matching transactions";

  const description = hasNoTransactions
    ? "Your income and expenses will appear here once you add your first transaction."
    : "Try changing your search terms or adjusting the selected filters.";

  const buttonText = hasNoTransactions ? "Add Transaction" : "Clear Filters";

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {description}
      </p>

      <button
        type="button"
        onClick={onAction}
        className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default TransactionEmptyState;

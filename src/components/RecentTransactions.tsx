import { Link } from "react-router";

function RecentTransactions() {
  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white">
      <header className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Transactions
        </h2>
        <Link
          to="/transactions"
          className="rounded-sm text-sm font-medium text-sky-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          View all
        </Link>
      </header>

      <div className="px-5 py-12 text-center">
        <p className="font-medium text-slate-900">No transactions yet</p>
        <p className="mt-2 text-sm text-slate-600">
          Your recent transactions will appear here once you start tracking your
          finances.
        </p>
      </div>
    </section>
  );
}

export default RecentTransactions;

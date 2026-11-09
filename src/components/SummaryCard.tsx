interface SummaryCardProps {
  title: string;
  amount: string;
  variant: "neutral" | "income" | "expense";
}

const amountColors = {
  neutral: "text-slate-900",
  income: "text-green-700",
  expense: "text-red-700",
};

const accentColors = {
  neutral: "bg-slate-500",
  income: "bg-green-600",
  expense: "bg-red-600",
};

function SummaryCard({ title, amount, variant }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p
        className={`mt-2 text-2xl font-bold tabular-nums ${amountColors[variant]}`}
      >
        {amount}
      </p>

      <div
        aria-hidden="true"
        className={`mt-4 h-1 w-12 rounded-full ${accentColors[variant]}`}
      ></div>
    </div>
  );
}

export default SummaryCard;

interface StorageRecoveryProps {
  status: "invalid" | "unavailable";
  rawBackup?: string;
  error: string | null;
  onReset: () => void;
}

function StorageRecovery({
  status,
  rawBackup,
  error,
  onReset,
}: StorageRecoveryProps) {
  function downloadBackup() {
    if (!rawBackup) return;

    const file = new Blob([rawBackup], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "expense-tracker-storage-backup.json";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function confirmReset() {
    if (
      window.confirm(
        "This will permanently discard the existing saved transaction data in this browser. Continue?",
      )
    ) {
      onReset();
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-12">
      <div className="rounded-xl border border-amber-300 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Saved transactions could not be loaded
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          {status === "invalid"
            ? "The saved data is invalid or incompatible. It has not been overwritten. Download a backup before resetting, or restore your data in browser storage."
            : "This browser currently blocks access to local storage. Allow storage for this site, then reload the page. Your existing data has not been changed."}
        </p>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {status === "invalid" && (
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadBackup}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-sky-500"
            >
              Download saved-data backup
            </button>
            <button
              type="button"
              onClick={confirmReset}
              className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-red-600"
            >
              Reset stored transactions
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default StorageRecovery;

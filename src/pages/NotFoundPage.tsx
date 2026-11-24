import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="text-sm text-slate-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-sky-500"
      >
        Return to Dashboard
      </Link>
    </main>
  );
}

export default NotFoundPage;

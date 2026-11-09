import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full">Expense Tracker</header>

      <div className="grid flex-1 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <Navigation />

        <main className="min-w-0 pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

import { NavLink } from "react-router";

function getNavLinkClassName(isActive: boolean): string {
  const baseClasses =
    "block rounded-lg px-1 py-2 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 lg:px-4 lg:text-left";

  const activeClasses = "bg-slate-200 font-semibold text-slate-900";
  const inactiveClasses = "text-slate-600 hover:bg-slate-100";

  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
}

function Navigation() {
  return (
    <nav
      aria-label="Main Navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-slate-50 p-4 lg:static lg:w-auto lg:border-t-0 lg:border-r"
    >
      <ul className="grid grid-cols-3 lg:flex gap-2 lg:flex-col">
        <li>
          <NavLink
            className={({ isActive }) => getNavLinkClassName(isActive)}
            to="/"
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => getNavLinkClassName(isActive)}
            to="/transactions"
          >
            Transactions
          </NavLink>
        </li>

        <li>
          <NavLink
            className={({ isActive }) => getNavLinkClassName(isActive)}
            to="/reports"
          >
            Reports
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

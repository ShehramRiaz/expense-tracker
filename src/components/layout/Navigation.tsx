import { NavLink } from "react-router";

type NavigationIcon = "dashboard" | "transactions" | "reports";

const navigationItems: {
  to: string;
  label: string;
  icon: NavigationIcon;
  end?: boolean;
}[] = [
  { to: "/", label: "Dashboard", icon: "dashboard", end: true },
  { to: "/transactions", label: "Transactions", icon: "transactions" },
  { to: "/reports", label: "Reports", icon: "reports" },
];

function NavIcon({ name }: { name: NavigationIcon }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
    >
      {name === "dashboard" && (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </>
      )}
      {name === "transactions" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 9h10M7 13h10M7 17h6" />
        </>
      )}
      {name === "reports" && (
        <>
          <path d="M4 20v-8M9 20V5M14 20v-5M19 20V9" />
          <path d="M2 20h20" />
        </>
      )}
    </svg>
  );
}

function getNavLinkClassName(isActive: boolean): string {
  const baseClasses =
    "flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-3 lg:text-sm";

  const activeClasses =
    "bg-sky-50 font-semibold text-sky-800 ring-1 ring-inset ring-sky-200";
  const inactiveClasses =
    "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
}

function Navigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-[0_-2px_12px_rgba(15,23,42,0.04)] backdrop-blur-sm lg:inset-x-auto lg:top-16 lg:bottom-0 lg:left-0 lg:flex lg:w-64 lg:flex-col lg:overflow-y-auto lg:border-t-0 lg:border-r lg:bg-white lg:shadow-none"
    >
      <div className="hidden px-6 pt-7 lg:block">
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Workspace
        </p>
      </div>

      <ul className="grid grid-cols-3 gap-1 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-4 lg:mt-4 lg:flex lg:flex-col lg:gap-2 lg:px-3 lg:py-0">
        {navigationItems.map(({ to, label, icon, end }) => (
          <li key={to} className="min-w-0">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) => getNavLinkClassName(isActive)}
            >
              <NavIcon name={icon} />
              <span className="truncate">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto hidden border-t border-slate-100 p-4 lg:block">
        <div className="rounded-xl bg-slate-50 px-3 py-3">
          <p className="text-xs font-semibold text-slate-700">
            Local-first tracking
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Your transactions stay in this browser.
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

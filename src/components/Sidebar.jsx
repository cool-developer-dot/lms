import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/courses', label: 'Courses', icon: '📚', end: false },
  { to: '/categories', label: 'Categories', icon: '📂', end: false },
  { to: '/users', label: 'Users', icon: '👥', end: false },
];

const activeClass =
  'nav-link w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold transition';
const inactiveClass =
  'nav-link w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 fixed z-20">
      <div className="px-4 mb-8 text-2xl font-black text-amber-500 tracking-tighter">
        WholCure<span className="text-slate-900 dark:text-white">LMS</span>
      </div>

      <nav className="space-y-1.5" aria-label="Main navigation">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

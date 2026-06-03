import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/courses', label: 'Courses', icon: '📚', end: false },
  { to: '/categories', label: 'Categories', icon: '📂', end: false },
  { to: '/users', label: 'Users', icon: '👥', end: false },
];

const linkBase =
  'nav-link w-full flex items-center gap-3 px-4 rounded-xl transition min-h-[44px] text-base';

function linkClass(isActive) {
  return isActive
    ? `${linkBase} bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold`
    : `${linkBase} text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800`;
}

export default function Sidebar({ isOpen, onClose, onNavigate }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleNavClick = () => {
    onNavigate?.();
  };

  return (
    <aside
      id="app-sidebar"
      aria-label="Sidebar"
      aria-hidden={!isDesktop && !isOpen}
      className={[
        'fixed top-0 left-0 z-40 flex h-screen w-[min(16rem,85vw)] max-w-xs flex-col',
        'border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900',
        'transform transition-transform duration-300 ease-in-out',
        'lg:z-20 lg:w-64 lg:max-w-none lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ].join(' ')}
    >
      <div className="mb-6 flex items-center justify-between gap-2 px-2">
        <div className="text-xl font-black tracking-tighter text-amber-500 sm:text-2xl">
          WholCure<span className="text-slate-900 dark:text-white">LMS</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto" aria-label="Main navigation">
        {navItems.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={handleNavClick}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="shrink-0 text-lg leading-none" aria-hidden="true">
              {icon}
            </span>
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

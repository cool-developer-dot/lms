import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun } from 'lucide-react';
import Sidebar from '../components/Sidebar.jsx';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  const location = useLocation();

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(document.documentElement.classList.contains('dark'));
  };

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');

    const handleChange = (e) => {
      if (e.matches) {
        closeSidebar();
        document.body.classList.remove('sidebar-open');
      }
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, [closeSidebar]);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (sidebarOpen && !isDesktop) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen w-full max-w-[100vw] overflow-x-hidden">
      <div
        role="presentation"
        aria-hidden={!sidebarOpen}
        onClick={closeSidebar}
        className={[
          'fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onNavigate={closeSidebar}
      />

      <main className="flex min-h-screen w-full min-w-0 flex-1 flex-col lg:ml-64">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 sm:h-16 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={openSidebar}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
          >
            <Menu className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>

          <div className="hidden flex-1 lg:block" aria-hidden="true" />

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 min-w-[44px] shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:px-4"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            )}
            <span className="hidden text-sm font-medium sm:inline">
              {isDark ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        </header>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);

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
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={openSidebar}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open menu"
              aria-expanded={sidebarOpen}
              aria-controls="app-sidebar"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="truncate text-base font-bold text-slate-800 dark:text-slate-200 sm:text-lg">
              System Control Center
            </h2>
          </div>
          <button
            type="button"
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-xs transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 sm:px-4 sm:text-sm"
          >
            <span className="hidden sm:inline">🌓 Toggle Theme</span>
            <span className="sm:hidden" aria-hidden="true">
              🌓
            </span>
            <span className="sr-only sm:hidden">Toggle theme</span>
          </button>
        </header>

        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

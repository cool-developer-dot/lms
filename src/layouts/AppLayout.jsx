import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';

export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1">
        <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">
            System Control Center
          </h2>
          <button
            type="button"
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="text-sm px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            🌓 Toggle Theme
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

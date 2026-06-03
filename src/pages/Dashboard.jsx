import PageContainer from '../components/PageContainer.jsx';

export default function Dashboard() {
  return (
    <PageContainer>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:mb-8">
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
          <p className="text-slate-500 text-sm">Total Courses</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 text-amber-500">24</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
          <p className="text-slate-500 text-sm">Total Students</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 text-blue-500">1,284</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
          <p className="text-slate-500 text-sm">Revenue</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 text-emerald-500">$45.2k</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm min-w-0">
          <p className="text-slate-500 text-sm">Support Tickets</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 text-rose-500">12</h3>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-center min-w-0">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Welcome to Control Center</h2>
        <p className="text-slate-500 text-sm sm:text-base">
          Select a category from the sidebar to manage your platform resources.
        </p>
      </div>
    </PageContainer>
  );
}

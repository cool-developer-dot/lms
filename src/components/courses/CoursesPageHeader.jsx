import { memo } from 'react';
import { Plus } from 'lucide-react';

function CoursesPageHeader({ onCreateClick }) {
  return (
    <header className="mb-8 flex min-w-0 flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
      <div className="min-w-0 max-w-2xl">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          LMS Course Catalog
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
          Manage, approve, and deploy course configurations globally.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreateClick}
        className="inline-flex h-12 min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-sm font-bold text-slate-900 shadow-md shadow-amber-400/25 transition-all duration-200 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/30 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 sm:w-auto dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 dark:focus-visible:ring-offset-slate-950"
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
        Create New Course
      </button>
    </header>
  );
}

export default memo(CoursesPageHeader);

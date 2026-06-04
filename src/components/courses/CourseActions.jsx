import { memo } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const actionBtn =
  'inline-flex h-10 min-w-[44px] items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900';

function CourseActions({ onView, onEdit, onDelete }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2" role="group" aria-label="Course actions">
      <button
        type="button"
        onClick={onView}
        className={`${actionBtn} border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800`}
        aria-label="View course"
      >
        <Eye className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span className="hidden sm:inline">View</span>
      </button>
      <button
        type="button"
        onClick={onEdit}
        className={`${actionBtn} border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50 focus-visible:ring-amber-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-amber-950/30`}
        aria-label="Edit course"
      >
        <Pencil className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span className="hidden sm:inline">Edit</span>
      </button>
      <button
        type="button"
        onClick={onDelete}
        className={`${actionBtn} border-rose-200 text-rose-600 hover:border-rose-300 hover:bg-rose-50 active:bg-rose-100 focus-visible:ring-rose-400 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950/40`}
        aria-label="Delete course"
      >
        <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
}

export default memo(CourseActions);

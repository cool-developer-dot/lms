import { useId, useRef } from 'react';
import { Pencil, X } from 'lucide-react';
import LevelBadge from './LevelBadge.jsx';
import StatusBadge from './StatusBadge.jsx';
import { formatCoursePrice } from '../../utils/courseFormat.js';
import { useModalA11y } from '../../hooks/useModalA11y.js';

export default function ViewCourseModal({ course, isOpen, onClose, onEdit }) {
  const titleId = useId();
  const dialogRef = useRef(null);

  useModalA11y(isOpen, onClose, dialogRef);

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Course details
            </p>
            <h2
              id={titleId}
              className="mt-1 text-xl font-bold leading-snug text-slate-900 dark:text-white"
            >
              {course.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <LevelBadge level={course.level} />
          <StatusBadge status={course.status} />
        </div>

        <dl className="space-y-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {course.description}
            </dd>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Price
              </dt>
              <dd className="mt-1 text-2xl font-bold text-amber-500">
                {formatCoursePrice(course.price)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Course ID
              </dt>
              <dd className="mt-1 font-mono text-xs text-slate-600 break-all dark:text-slate-400">
                {course.id}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onEdit(course)}
            className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-lg bg-amber-400 px-6 text-sm font-bold text-slate-900 shadow-md transition hover:bg-amber-300 dark:bg-amber-500"
          >
            <Pencil className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Edit Course
          </button>
        </div>
      </div>
    </div>
  );
}

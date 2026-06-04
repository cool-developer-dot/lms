import { memo, useCallback } from 'react';
import LevelBadge from './LevelBadge.jsx';
import StatusBadge from './StatusBadge.jsx';
import CourseActions from './CourseActions.jsx';
import { formatCoursePrice } from '../../utils/courseFormat.js';

function CourseCard({ course, onView, onEdit, onDelete }) {
  const handleView = useCallback(() => onView(course), [course, onView]);
  const handleEdit = useCallback(() => onEdit(course), [course, onEdit]);
  const handleDelete = useCallback(() => onDelete(course), [course, onDelete]);

  return (
    <article
      className="group flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby={`course-title-${course.id}`}
    >
      <div className="flex items-start justify-between gap-3 p-5 pb-0">
        <LevelBadge level={course.level} />
        <StatusBadge status={course.status} />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <h3
          id={`course-title-${course.id}`}
          className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 dark:text-white"
        >
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {course.description}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <p className="text-xl font-bold tracking-tight text-amber-500" aria-label={`Price ${formatCoursePrice(course.price)}`}>
          {formatCoursePrice(course.price)}
        </p>
        <CourseActions onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </article>
  );
}

export default memo(CourseCard);

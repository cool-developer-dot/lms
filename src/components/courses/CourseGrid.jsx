import { memo } from 'react';
import CourseCard from './CourseCard.jsx';

function CourseGrid({ courses, onView, onEdit, onDelete }) {
  if (!courses.length) {
    return (
      <div
        className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900"
        role="status"
      >
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">No courses yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Create your first course to populate the catalog.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid min-w-0 gap-5 sm:gap-6"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
      role="list"
      aria-label="Course catalog"
    >
      {courses.map((course) => (
        <div key={course.id} role="listitem" className="min-w-0">
          <CourseCard course={course} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default memo(CourseGrid);

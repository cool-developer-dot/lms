import { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { COURSE_LEVELS, COURSE_STATUSES } from '../../data/courseTypes.js';
import { useModalA11y } from '../../hooks/useModalA11y.js';

const emptyForm = {
  title: '',
  description: '',
  level: 'Beginner',
  status: 'Draft',
  price: '',
};

function courseToForm(course) {
  if (!course) return emptyForm;
  return {
    title: course.title || '',
    description: course.description || '',
    level: course.level || 'Beginner',
    status: course.status || 'Draft',
    price: String(course.price ?? ''),
  };
}

export default function CourseFormModal({ mode, course, isOpen, onClose, onSubmit }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const isEdit = mode === 'edit';

  useModalA11y(isOpen, onClose, dialogRef);

  useEffect(() => {
    if (isOpen) {
      setForm(isEdit ? courseToForm(course) : emptyForm);
      setSubmitting(false);
    }
  }, [isOpen, isEdit, course]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      level: form.level,
      status: form.status,
      price: Number.parseFloat(form.price) || 0,
    });
    setSubmitting(false);
  };

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
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold text-slate-900 dark:text-white">
            {isEdit ? 'Edit Course' : 'Create New Course'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="course-form-title" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Course title
            </label>
            <input
              id="course-form-title"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="course-form-desc" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              id="course-form-desc"
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="course-form-level" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Level
              </label>
              <select
                id="course-form-level"
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                {COURSE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="course-form-status" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Status
              </label>
              <select
                id="course-form-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                {COURSE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="course-form-price" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Price (USD)
            </label>
            <input
              id="course-form-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-lg bg-amber-400 px-6 text-sm font-bold text-slate-900 shadow-md transition hover:bg-amber-300 disabled:opacity-60 dark:bg-amber-500"
            >
              {submitting
                ? isEdit
                  ? 'Saving...'
                  : 'Creating...'
                : isEdit
                  ? 'Save Changes'
                  : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

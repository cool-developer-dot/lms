import { memo } from 'react';

const statusStyles = {
  Published:
    'border-emerald-300 text-emerald-700 bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:bg-emerald-950/40',
  Draft:
    'border-slate-300 text-slate-600 bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:bg-slate-800/50',
  'Pending Review':
    'border-orange-300 text-orange-700 bg-orange-50 dark:border-orange-700 dark:text-orange-300 dark:bg-orange-950/40',
  Archived:
    'border-rose-200 text-rose-600 bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:bg-rose-950/40',
};

function StatusBadge({ status }) {
  const styles = statusStyles[status] || statusStyles.Draft;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles}`}
    >
      {status}
    </span>
  );
}

export default memo(StatusBadge);

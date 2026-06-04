import { memo } from 'react';

const levelStyles = {
  Beginner: 'border-slate-300 text-slate-600 bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:bg-slate-800/50',
  Intermediate: 'border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:bg-blue-950/40',
  Advanced: 'border-violet-200 text-violet-700 bg-violet-50 dark:border-violet-800 dark:text-violet-300 dark:bg-violet-950/40',
  'All Levels': 'border-amber-200 text-amber-800 bg-amber-50 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950/30',
};

function LevelBadge({ level }) {
  const styles = levelStyles[level] || levelStyles.Beginner;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles}`}
    >
      {level}
    </span>
  );
}

export default memo(LevelBadge);

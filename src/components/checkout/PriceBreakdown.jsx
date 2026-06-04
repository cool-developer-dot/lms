import { memo } from 'react';
import { formatCoursePrice } from '../../utils/courseFormat.js';

function Line({ label, value, accent = false, negative = false }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={
          accent
            ? 'text-base font-bold text-slate-900 dark:text-white'
            : negative
              ? 'font-medium text-emerald-600 dark:text-emerald-400'
              : 'font-medium text-slate-700 dark:text-slate-300'
        }
      >
        {negative ? `−${formatCoursePrice(Math.abs(value))}` : formatCoursePrice(value)}
      </span>
    </div>
  );
}

function PriceBreakdown({ pricing, total }) {
  return (
    <div className="space-y-3 border-t border-slate-200/80 pt-4 dark:border-slate-700/80">
      <Line label="Subtotal" value={pricing.subtotal} />
      {pricing.discount > 0 && (
        <Line label="Discount" value={pricing.discount} negative />
      )}
      <Line label="Tax" value={pricing.tax} />
      <Line label="Processing fee" value={pricing.processingFee} />
      <div className="border-t border-dashed border-slate-200 pt-3 dark:border-slate-700">
        <Line label="Total due today" value={total} accent />
      </div>
    </div>
  );
}

export default memo(PriceBreakdown);

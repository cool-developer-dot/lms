import { memo } from 'react';
import { CheckCircle2 } from 'lucide-react';

function CheckoutSuccess({ onReset }) {
  return (
    <div
      className="animate-[fadeIn_0.4s_ease-out] rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-950/40"
      role="status"
    >
      <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" strokeWidth={1.5} aria-hidden="true" />
      <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Payment confirmed</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Your subscription is now active. A receipt has been sent to your email.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-semibold text-violet-600 hover:underline dark:text-violet-400"
        >
          Make another payment
        </button>
      )}
    </div>
  );
}

export default memo(CheckoutSuccess);

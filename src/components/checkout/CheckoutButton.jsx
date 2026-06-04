import { memo } from 'react';
import { CheckCircle2, Loader2, Lock } from 'lucide-react';

function CheckoutButton({ status, disabled, onClick, totalLabel }) {
  const isProcessing = status === 'processing';
  const isSuccess = status === 'success';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isProcessing || isSuccess}
      className={[
        'group relative mt-6 w-full overflow-hidden rounded-xl px-6 py-4 text-base font-bold transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950',
        'min-h-[52px]',
        isSuccess
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
          : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white shadow-xl shadow-emerald-600/25 hover:shadow-2xl hover:shadow-emerald-600/35 active:scale-[0.99]',
        (disabled || isProcessing) && !isSuccess ? 'cursor-not-allowed opacity-60' : '',
      ].join(' ')}
      aria-busy={isProcessing}
      aria-live="polite"
    >
      <span
        className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]"
        aria-hidden="true"
      />

      <span className="relative inline-flex items-center justify-center gap-2">
        {isProcessing && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {isSuccess && <CheckCircle2 className="h-5 w-5" aria-hidden="true" />}
        {!isProcessing && !isSuccess && <Lock className="h-5 w-5" aria-hidden="true" />}
        {isProcessing && 'Processing payment...'}
        {isSuccess && 'Payment successful'}
        {!isProcessing && !isSuccess && (
          <>
            Complete Secure Payment
            {totalLabel && (
              <span className="rounded-md bg-white/20 px-2 py-0.5 text-sm">{totalLabel}</span>
            )}
          </>
        )}
      </span>
    </button>
  );
}

export default memo(CheckoutButton);

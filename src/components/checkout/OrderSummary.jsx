import { memo } from 'react';
import { Check, Sparkles } from 'lucide-react';
import PriceBreakdown from './PriceBreakdown.jsx';
import { calculateTotal } from '../../data/checkoutPlan.js';

function OrderSummary({ plan }) {
  if (!plan) {
    return (
      <aside
        className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/60"
        aria-label="Order summary"
      >
        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">No plan selected</p>
        <p className="mt-2 text-sm text-slate-500">
          Choose a subscription plan to see your order breakdown.
        </p>
      </aside>
    );
  }

  const total = calculateTotal(plan.pricing);

  return (
    <aside
      className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-all duration-300 dark:border-slate-700/80 dark:bg-slate-900/70 dark:shadow-none sm:p-7"
      aria-label="Order summary"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-amber-400/15 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          {plan.type} Plan
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {plan.billingCycle} billing · Qty {plan.quantity}
        </p>

        <ul className="mt-6 space-y-2.5" aria-label="Plan features">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <PriceBreakdown pricing={plan.pricing} total={total} />
      </div>
    </aside>
  );
}

export default memo(OrderSummary);

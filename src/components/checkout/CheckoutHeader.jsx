import { memo } from 'react';
import { Lock, Shield, ShieldCheck } from 'lucide-react';

const trustItems = [
  { icon: Lock, label: 'SSL Secured' },
  { icon: ShieldCheck, label: 'PCI Compliant' },
  { icon: Shield, label: '256-bit Encryption' },
];

function CheckoutHeader() {
  return (
    <header className="mb-8 min-w-0 lg:mb-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
        WholCure LMS Billing
      </p>
      <h1 className="mt-2 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-slate-900 dark:text-white">
        Secure Checkout
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
        Complete your subscription securely using encrypted payment processing.
      </p>

      <ul className="mt-5 flex flex-wrap gap-2 sm:gap-3" aria-label="Security indicators">
        {trustItems.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </header>
  );
}

export default memo(CheckoutHeader);

import { memo } from 'react';
import { Lock, Server, ShieldCheck, ShieldAlert } from 'lucide-react';

const badges = [
  { icon: Lock, label: 'SSL Protected' },
  { icon: ShieldCheck, label: 'PCI DSS Compliant' },
  { icon: Server, label: 'Secure Servers' },
  { icon: ShieldAlert, label: 'Fraud Protection' },
];

function SecurityBadges() {
  return (
    <section
      className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50"
      aria-labelledby="security-section-title"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
          <Lock className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 id="security-section-title" className="font-bold text-slate-900 dark:text-white">
            Secure Payment
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your transaction is protected using industry-standard encryption.
          </p>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {badges.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 rounded-lg border border-slate-200/60 bg-white px-2.5 py-2 text-[11px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default memo(SecurityBadges);

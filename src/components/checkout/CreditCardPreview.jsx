import { memo } from 'react';
import CardBrandLogo from './CardBrandLogo.jsx';
import { maskCardDisplay } from '../../utils/cardUtils.js';

const CARD_SURFACE = {
  visa: 'from-emerald-500 via-teal-600 to-green-800',
  mastercard: 'from-emerald-600 via-emerald-700 to-teal-900',
  amex: 'from-teal-500 via-emerald-600 to-green-900',
  unknown: 'from-emerald-600 via-green-700 to-emerald-900',
};

function CreditCardPreview({ cardNumber, cardholderName, expiry, cardType }) {
  const type = cardType || 'unknown';
  const gradient = CARD_SURFACE[type] || CARD_SURFACE.unknown;
  const displayNumber = maskCardDisplay(cardNumber, type);
  const displayName = cardholderName.trim() || 'YOUR NAME';
  const displayExpiry = expiry || 'MM/YY';

  return (
    <div
      className="relative mx-auto w-full max-w-[420px] min-w-0 px-0 sm:px-2"
      aria-label="Card preview"
      aria-live="polite"
    >
      <div
        className={[
          'relative w-full overflow-hidden rounded-[1.25rem] p-6 sm:p-7',
          'bg-gradient-to-br shadow-[0_20px_50px_-12px_rgba(16,185,129,0.45)]',
          'ring-1 ring-white/20 transition-all duration-300',
          'aspect-[1.586/1] max-h-[260px]',
          gradient,
        ].join(' ')}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-[2px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-6 h-36 w-36 rounded-full bg-emerald-300/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,transparent_45%,rgba(0,0,0,0.08)_100%)]"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-between text-white">
          <div className="flex items-start justify-between gap-3">
            <div
              className="h-10 w-14 rounded-md bg-gradient-to-br from-amber-100/90 to-amber-300/80 shadow-inner ring-1 ring-white/30 sm:h-11 sm:w-[3.25rem]"
              aria-hidden="true"
            />
            <div className="rounded-lg bg-white/15 px-2.5 py-1.5 backdrop-blur-md ring-1 ring-white/25">
              <CardBrandLogo type={type} className="h-6 w-auto text-white sm:h-7" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
              Card number
            </p>
            <p className="font-mono text-[clamp(1.05rem,4.2vw,1.45rem)] font-medium tracking-[0.14em] text-white/95">
              {displayNumber}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 pt-1">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Cardholder name
              </p>
              <p className="truncate text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
                {displayName}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Valid thru
              </p>
              <p className="font-mono text-sm font-semibold tracking-wider text-white sm:text-base">
                {displayExpiry}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CreditCardPreview);

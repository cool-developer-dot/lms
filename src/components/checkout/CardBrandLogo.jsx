import { memo } from 'react';

function VisaLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 16" aria-label="Visa" role="img">
      <text x="0" y="13" fill="currentColor" fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif">
        VISA
      </text>
    </svg>
  );
}

function MastercardLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 36 22" aria-label="Mastercard" role="img">
      <circle cx="11" cy="11" r="9" fill="#EB001B" opacity="0.95" />
      <circle cx="21" cy="11" r="9" fill="#F79E1B" opacity="0.95" />
    </svg>
  );
}

function AmexLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 16" aria-label="American Express" role="img">
      <text x="0" y="12" fill="currentColor" fontSize="9" fontWeight="800" fontFamily="system-ui, sans-serif">
        AMEX
      </text>
    </svg>
  );
}

function GenericLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.5" />
      <path d="M2 10h20" strokeWidth="1.5" />
    </svg>
  );
}

function CardBrandLogo({ type, className = 'h-7 w-auto' }) {
  switch (type) {
    case 'visa':
      return <VisaLogo className={className} />;
    case 'mastercard':
      return <MastercardLogo className={className} />;
    case 'amex':
      return <AmexLogo className={className} />;
    default:
      return <GenericLogo className={`${className} text-white/70`} />;
  }
}

export default memo(CardBrandLogo);

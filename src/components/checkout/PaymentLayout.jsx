import { memo } from 'react';

function PaymentLayout({ summary, payment }) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:gap-10 xl:gap-12">
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">{summary}</div>
      <div className="min-w-0">{payment}</div>
    </div>
  );
}

export default memo(PaymentLayout);

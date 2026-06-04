import { useCallback, useMemo, useState } from 'react';
import PageContainer from '../components/PageContainer.jsx';
import CheckoutHeader from '../components/checkout/CheckoutHeader.jsx';
import PaymentLayout from '../components/checkout/PaymentLayout.jsx';
import OrderSummary from '../components/checkout/OrderSummary.jsx';
import PaymentMethods from '../components/checkout/PaymentMethods.jsx';
import PaymentForm from '../components/checkout/PaymentForm.jsx';
import SecurityBadges from '../components/checkout/SecurityBadges.jsx';
import CheckoutButton from '../components/checkout/CheckoutButton.jsx';
import CheckoutSuccess from '../components/checkout/CheckoutSuccess.jsx';
import { DEFAULT_CHECKOUT_PLAN, calculateTotal } from '../data/checkoutPlan.js';
import { isCardPaymentMethod } from '../data/paymentMethods.js';
import { detectCardType, validateCheckoutForm } from '../utils/cardUtils.js';
import { formatCoursePrice } from '../utils/courseFormat.js';

const INITIAL_FORM = {
  cardholderName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  billingAddress: '',
  country: '',
  postalCode: '',
};

export default function Checkout() {
  const [plan] = useState(DEFAULT_CHECKOUT_PLAN);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('idle');

  const cardType = useMemo(
    () => detectCardType(form.cardNumber),
    [form.cardNumber]
  );

  const total = useMemo(
    () => (plan ? calculateTotal(plan.pricing) : 0),
    [plan]
  );

  const totalLabel = formatCoursePrice(total);

  const handleFormChange = useCallback((nextForm) => {
    setForm(nextForm);
    setErrors({});
  }, []);

  const handlePayment = useCallback(async () => {
    if (!plan) return;

    const validationErrors = validateCheckoutForm(form, paymentMethod, {
      isCardMethod: isCardPaymentMethod(paymentMethod),
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setPaymentStatus('error');
      return;
    }

    setPaymentStatus('processing');
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 2200));

    setPaymentStatus('success');
  }, [form, paymentMethod, plan]);

  const handleReset = useCallback(() => {
    setPaymentStatus('idle');
    setForm(INITIAL_FORM);
    setErrors({});
  }, []);

  const isDisabled = !plan || paymentStatus === 'processing';

  const paymentPanel = (
    <div
      className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xl shadow-slate-200/30 backdrop-blur-sm transition-all duration-300 dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-none sm:p-7"
    >
      {paymentStatus === 'success' ? (
        <CheckoutSuccess onReset={handleReset} />
      ) : (
        <>
          <PaymentMethods activeMethod={paymentMethod} onChange={setPaymentMethod} />

          {paymentStatus === 'error' && Object.keys(errors).length > 0 && (
            <div
              className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
              role="alert"
            >
              Please correct the highlighted fields before continuing.
            </div>
          )}

          {paymentStatus === 'processing' && (
            <div
              className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
              role="status"
              aria-live="polite"
            >
              Processing your payment securely. Do not close this window.
            </div>
          )}

          <PaymentForm
            method={paymentMethod}
            form={form}
            errors={errors}
            onChange={handleFormChange}
            cardType={cardType}
          />

          <SecurityBadges />

          <CheckoutButton
            status={paymentStatus}
            disabled={isDisabled}
            onClick={handlePayment}
            totalLabel={totalLabel}
          />
        </>
      )}
    </div>
  );

  return (
    <PageContainer className="!p-0">
      <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-violet-50/40 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 dark:from-slate-950 dark:via-slate-950 dark:to-violet-950/20">
        <div className="mx-auto max-w-7xl min-w-0">
          <CheckoutHeader />
          <PaymentLayout
            summary={<OrderSummary plan={plan} />}
            payment={paymentPanel}
          />
        </div>
      </div>
    </PageContainer>
  );
}

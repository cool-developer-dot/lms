import { memo } from 'react';
import FloatingField from './FloatingField.jsx';
import CreditCardPreview from './CreditCardPreview.jsx';
import { getPaymentMethodById, isCardPaymentMethod } from '../../data/paymentMethods.js';
import {
  detectCardType,
  formatCardNumber,
  formatExpiry,
  getCvvLength,
} from '../../utils/cardUtils.js';

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'India',
  'Pakistan',
  'United Arab Emirates',
];

function AlternativePaymentPanel({ methodId }) {
  const method = getPaymentMethodById(methodId);
  const Icon = method.Icon;

  const hints = {
    paypal: 'You will be redirected to PayPal to authorize this payment.',
    apple_pay: 'Confirm with Face ID, Touch ID, or your device passcode.',
    google_pay: 'Complete payment using your saved Google Pay cards.',
    bank_transfer: 'Transfer instructions and reference number will be provided after confirmation.',
  };

  return (
    <div className="rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-teal-50/50 p-6 text-center dark:border-emerald-800/60 dark:from-emerald-950/30 dark:to-slate-900/50 sm:p-8">
      <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-md dark:bg-slate-800 dark:text-emerald-400">
        <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <p className="text-lg font-bold text-slate-900 dark:text-white">
        Pay with {method.label}
      </p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {hints[methodId] || method.description}
      </p>
      <p className="mt-4 text-xs font-medium text-emerald-700/80 dark:text-emerald-400/80">
        Demo mode — use Complete Secure Payment to simulate checkout.
      </p>
    </div>
  );
}

function PaymentForm({ method, form, errors, onChange, cardType }) {
  if (!isCardPaymentMethod(method)) {
    return <AlternativePaymentPanel methodId={method} />;
  }

  const handleField = (name) => (e) => {
    let { value } = e.target;
    if (name === 'cardNumber') value = formatCardNumber(value);
    if (name === 'expiry') value = formatExpiry(value);
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, getCvvLength(cardType));
    onChange({ ...form, [name]: value });
  };

  return (
    <div className="space-y-6 min-w-0">
      <CreditCardPreview
        cardNumber={form.cardNumber}
        cardholderName={form.cardholderName}
        expiry={form.expiry}
        cardType={cardType}
      />

      <div className="space-y-4">
        <FloatingField
          id="cardholderName"
          name="cardholderName"
          label="Cardholder name"
          value={form.cardholderName}
          onChange={handleField('cardholderName')}
          error={errors.cardholderName}
          autoComplete="cc-name"
        />

        <FloatingField
          id="cardNumber"
          name="cardNumber"
          label="Card number"
          value={form.cardNumber}
          onChange={handleField('cardNumber')}
          error={errors.cardNumber}
          autoComplete="cc-number"
          inputMode="numeric"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FloatingField
            id="expiry"
            name="expiry"
            label="Expiry date"
            value={form.expiry}
            onChange={handleField('expiry')}
            error={errors.expiry}
            autoComplete="cc-exp"
            placeholder="MM/YY"
            maxLength={5}
            inputMode="numeric"
          />
          <FloatingField
            id="cvv"
            name="cvv"
            label="CVV"
            type="password"
            value={form.cvv}
            onChange={handleField('cvv')}
            error={errors.cvv}
            autoComplete="cc-csc"
            inputMode="numeric"
            maxLength={getCvvLength(cardType)}
          />
        </div>

        <FloatingField
          id="billingAddress"
          name="billingAddress"
          label="Billing address"
          value={form.billingAddress}
          onChange={handleField('billingAddress')}
          error={errors.billingAddress}
          autoComplete="street-address"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FloatingField
            id="country"
            name="country"
            label="Country"
            as="select"
            value={form.country}
            onChange={handleField('country')}
            error={errors.country}
          >
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </FloatingField>

          <FloatingField
            id="postalCode"
            name="postalCode"
            label="Postal code"
            value={form.postalCode}
            onChange={handleField('postalCode')}
            error={errors.postalCode}
            autoComplete="postal-code"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(PaymentForm);

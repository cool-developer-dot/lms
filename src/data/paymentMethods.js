import {
  Building2,
  CreditCard,
  Smartphone,
  Wallet,
} from 'lucide-react';

export const PAYMENT_METHOD_OPTIONS = [
  {
    id: 'card',
    label: 'Credit Card',
    description: 'Visa, Mastercard, American Express',
    category: 'card',
    Icon: CreditCard,
  },
  {
    id: 'debit',
    label: 'Debit Card',
    description: 'Direct debit from your bank account',
    category: 'card',
    Icon: CreditCard,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    description: 'Fast checkout with your PayPal balance',
    category: 'wallet',
    Icon: Wallet,
  },
  {
    id: 'apple_pay',
    label: 'Apple Pay',
    description: 'One-tap payment with Apple Wallet',
    category: 'wallet',
    Icon: Smartphone,
  },
  {
    id: 'google_pay',
    label: 'Google Pay',
    description: 'Secure payment with Google Pay',
    category: 'wallet',
    Icon: Smartphone,
  },
  {
    id: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Wire or ACH transfer from your bank',
    category: 'bank',
    Icon: Building2,
  },
];

export function getPaymentMethodById(id) {
  return PAYMENT_METHOD_OPTIONS.find((m) => m.id === id) ?? PAYMENT_METHOD_OPTIONS[0];
}

export function isCardPaymentMethod(id) {
  const method = getPaymentMethodById(id);
  return method.category === 'card';
}

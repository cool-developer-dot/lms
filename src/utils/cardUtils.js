export const CARD_TYPES = {
  visa: { label: 'Visa', pattern: /^4/ },
  mastercard: { label: 'Mastercard', pattern: /^(5[1-5]|2[2-7])/ },
  amex: { label: 'Amex', pattern: /^3[47]/ },
  unknown: { label: 'Card', pattern: /.*/ },
};

export function detectCardType(number) {
  const digits = number.replace(/\D/g, '');
  if (CARD_TYPES.amex.pattern.test(digits)) return 'amex';
  if (CARD_TYPES.mastercard.pattern.test(digits)) return 'mastercard';
  if (CARD_TYPES.visa.pattern.test(digits)) return 'visa';
  if (digits.length > 0) return 'unknown';
  return null;
}

export function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '');
  const type = detectCardType(digits);
  if (type === 'amex') {
    return digits.replace(/(\d{4})(\d{0,6})(\d{0,5})/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join(' ')
    );
  }
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function maskCardDisplay(number, type) {
  const digits = number.replace(/\D/g, '');
  if (!digits) return '•••• •••• •••• ••••';
  if (type === 'amex') {
    const padded = digits.padEnd(15, '•');
    return `${padded.slice(0, 4)} ${padded.slice(4, 10)} ${padded.slice(10, 15)}`;
  }
  const padded = digits.padEnd(16, '•');
  return `${padded.slice(0, 4)} ${padded.slice(4, 8)} ${padded.slice(8, 12)} ${padded.slice(12, 16)}`;
}

export function getCvvLength(type) {
  return type === 'amex' ? 4 : 3;
}

export function validateCheckoutForm(form, method, { isCardMethod } = {}) {
  const errors = {};
  const requiresCard = isCardMethod ?? (method === 'card' || method === 'debit');

  if (requiresCard) {
    if (!form.cardholderName.trim()) errors.cardholderName = 'Cardholder name is required';
    const digits = form.cardNumber.replace(/\D/g, '');
    const type = detectCardType(digits);
    const minLen = type === 'amex' ? 15 : 16;
    if (digits.length < minLen) errors.cardNumber = 'Enter a valid card number';
    const [mm, yy] = form.expiry.split('/');
    if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12) errors.expiry = 'Invalid expiry date';
    const cvvLen = getCvvLength(type);
    if (form.cvv.replace(/\D/g, '').length < cvvLen) errors.cvv = 'Invalid security code';
    if (!form.billingAddress.trim()) errors.billingAddress = 'Billing address is required';
    if (!form.country) errors.country = 'Select a country';
    if (!form.postalCode.trim()) errors.postalCode = 'Postal code is required';
  }

  return errors;
}

export const DEFAULT_CHECKOUT_PLAN = {
  id: 'plan-premium-lms',
  name: 'Premium LMS Subscription',
  type: 'Professional',
  billingCycle: 'Annual',
  quantity: 1,
  features: [
    'Unlimited Courses',
    'Unlimited Students',
    'Analytics Dashboard',
    'Priority Support',
    'API Access',
  ],
  pricing: {
    subtotal: 299,
    discount: 30,
    tax: 24.15,
    processingFee: 4.85,
  },
};

export function calculateTotal(pricing) {
  const { subtotal, discount, tax, processingFee } = pricing;
  return subtotal - discount + tax + processingFee;
}

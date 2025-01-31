// config/subscription-plans.ts

if (!process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID ||
  !process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ||
  !process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID) {
throw new Error('Missing required Stripe price IDs in environment variables');
}

export const subscriptionPlans = [
{
  id: 'basic',
  name: 'Basic Plan',
  price: 9.99,
  interval: 'month',
  features: [
    'Basic features',
    'Email support',
    '5 projects',
    '10GB storage'
  ],
  priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID
},
{
  id: 'premium',
  name: 'Premium Plan',
  price: 19.99,
  interval: 'month',
  features: [
    'All Basic features',
    'Priority support',
    'Unlimited projects',
    '50GB storage',
    'Advanced analytics'
  ],
  priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID
},
{
  id: 'enterprise',
  name: 'Enterprise Plan',
  price: 49.99,
  interval: 'month',
  features: [
    'All Premium features',
    '24/7 phone support',
    'Custom integrations',
    'Unlimited storage',
    'Dedicated account manager'
  ],
  priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID
}
];
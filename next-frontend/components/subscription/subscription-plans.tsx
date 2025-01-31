'use client';

import React, { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import PlanCard from './plan-card';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  priceId: string;
}

const subscriptionPlans: Plan[] = [
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
    priceId: process.env.NEXT_PUBLIC_BASIC_PLAN_PRICE_ID || ''
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 18.00,
    interval: 'month',
    features: [
      'All Basic features',
      'Priority support',
      'Unlimited projects',
      '50GB storage',
      'Advanced analytics'
    ],
    priceId: process.env.NEXT_PUBLIC_PREMIUM_PLAN_PRICE_ID || ''
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 24.00,
    interval: 'month',
    features: [
      'All Premium features',
      '24/7 phone support',
      'Custom integrations',
      'Unlimited storage',
      'Dedicated account manager'
    ],
    priceId: process.env.NEXT_PUBLIC_ENTERPRISE_PLAN_PRICE_ID || ''
  }
];

const SubscriptionPlans = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Log all price IDs on component mount
  React.useEffect(() => {
    console.log('Environment Variables Check:');
    console.log('NEXT_PUBLIC_BASIC_PLAN_PRICE_ID:', process.env.NEXT_PUBLIC_BASIC_PLAN_PRICE_ID);
    console.log('NEXT_PUBLIC_PREMIUM_PLAN_PRICE_ID:', process.env.NEXT_PUBLIC_PREMIUM_PLAN_PRICE_ID);
    console.log('NEXT_PUBLIC_ENTERPRISE_PLAN_PRICE_ID:', process.env.NEXT_PUBLIC_ENTERPRISE_PLAN_PRICE_ID);
    
    console.log('Subscription Plans Check:');
    subscriptionPlans.forEach(plan => {
      console.log(`${plan.name} priceId:`, plan.priceId);
    });
  }, []);

  const handleSubscription = async (priceId: string) => {
    try {
      console.log('handleSubscription called with priceId:', priceId);
      
      if (!priceId) {
        console.error('Price ID is empty or undefined');
        throw new Error('Invalid price ID');
      }

      setLoading(true);
      setError(null);

      console.log('Making API request with body:', JSON.stringify({ priceId }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const data = await response.json();
      console.log('API Response data:', data);

      window.location.href = data.checkoutUrl;
      
    } catch (err) {
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSubscribe={handleSubscription}
            isLoading={loading}
          />
        ))}
      </div>

      {error && (
        <AlertDialog open={!!error}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error</AlertDialogTitle>
              <AlertDialogDescription>{error}</AlertDialogDescription>
            </AlertDialogHeader>
            <Button onClick={() => setError(null)}>Close</Button>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default SubscriptionPlans;
import SubscriptionPlans from '@/components/subscription/subscription-plans';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          Choose Your Subscription
        </h1>
        <SubscriptionPlans />
      </div>
    </main>
  );
}
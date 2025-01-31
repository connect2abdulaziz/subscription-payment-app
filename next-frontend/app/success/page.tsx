import { redirect } from 'next/navigation';
import Stripe from 'stripe';

async function getSessionStatus(sessionId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
  });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  const paymentStatus = await getSessionStatus(sessionId);

  return (
    <div className="max-w-2xl mx-auto mt-16 p-4">
      <h1 className="text-3xl font-bold mb-4">Thank you for your subscription!</h1>
      <p className="mb-4">Payment status: {paymentStatus}</p>
      {/* Add more success page content */}
    </div>
  );
}
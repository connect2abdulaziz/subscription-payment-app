import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']
    });

    const subscription = session.subscription as Stripe.Subscription;

    return NextResponse.json({
      status: subscription?.status || session.status,
      customerId: session.customer,
      subscriptionId: subscription?.id,
      priceId: session.line_items?.data[0]?.price?.id,
      paymentStatus: session.payment_status
    });

  } catch (error) {
    console.error('Error checking subscription status:', error);
    return NextResponse.json(
      { error: 'Error checking subscription status' },
      { status: 500 }
    );
  }
}
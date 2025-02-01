// app/api/verify-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: 'No session ID provided' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        status: session.status,
      },
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify session' },
      { status: 500 }
    );
  }
}
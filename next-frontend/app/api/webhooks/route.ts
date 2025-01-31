import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
});

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Here you would update your database with the subscription status
  // Example: await db.subscription.update({ ... })
  
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const priceId = subscription.items.data[0].price.id;

  console.log(`Subscription ${subscription.id} for customer ${customerId} is ${status}`);
  
  // Add your custom logic here based on the subscription status
  switch (status) {
    case 'active':
      // Handle new/renewed subscription
      break;
    case 'past_due':
      // Handle failed payment
      break;
    case 'canceled':
      // Handle cancellation
      break;
    case 'unpaid':
      // Handle unpaid subscription
      break;
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
        
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle successful checkout
        console.log(`Checkout completed for session ${session.id}`);
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        // Handle successful payment
        console.log(`Payment succeeded for invoice ${invoice.id}`);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        // Handle failed payment
        console.log(`Payment failed for invoice ${failedInvoice.id}`);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
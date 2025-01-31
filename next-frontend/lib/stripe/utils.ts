export async function createCheckoutSession(priceId: string) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    throw new Error('Failed to create checkout session');
  }
}

export async function getSubscriptionStatus(sessionId: string) {
  try {
    const response = await fetch(`/api/subscription-status?sessionId=${sessionId}`);
    if (!response.ok) {
      throw new Error('Failed to get subscription status');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error checking subscription status');
  }
}
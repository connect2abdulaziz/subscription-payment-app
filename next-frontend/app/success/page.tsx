'use client';

import { Suspense, useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentStatus, setPaymentStatus] = useState('loading');
  
  useEffect(() => {
    if (sessionId) {
      // Call our API endpoint to verify the session
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPaymentStatus('success');
          } else {
            setPaymentStatus('error');
          }
        })
        .catch(() => {
          setPaymentStatus('error');
        });
    }
  }, [sessionId]);

  if (!sessionId) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl mb-2">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Thank you for your subscription. Your payment has been processed successfully.
            </p>
            
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Order ID: {sessionId}
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto">
                    Go to Dashboard
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Return to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
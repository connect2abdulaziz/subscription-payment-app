'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

function CancelPageContent() {
  const searchParams = useSearchParams();
  const [reason, setReason] = useState<string>('');
  
  useEffect(() => {
    const cancelReason = searchParams.get('reason');
    if (cancelReason) {
      setReason(decodeURIComponent(cancelReason));
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl mb-2">
            Subscription Cancelled
          </CardTitle>
          <CardDescription className="text-lg">
            We're sorry to see you go
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {reason && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Cancellation reason: {reason}
              </p>
            </div>
          )}
          
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your subscription has been cancelled. You won't be charged again.
              Your access will continue until the end of your current billing period.
            </p>
            
            <div className="pt-4 flex flex-col gap-4">
              <Link href="/contact" className="inline-block">
                <Button variant="outline" className="w-full sm:w-auto">
                  Contact Support
                </Button>
              </Link>
              
              <Link href="/" className="inline-block">
                <Button className="w-full sm:w-auto">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CancelPageContent />
    </Suspense>
  );
}
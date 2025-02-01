'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreditCard, Download, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

export default function BillingPage() {
  const [currentPlan] = useState({
    name: 'Basic Plan',
    price: 9.99,
    billingCycle: 'monthly',
    nextBilling: '2024-03-01',
    status: 'active',
  });

  const [paymentMethod] = useState({
    type: 'Credit Card',
    last4: '4242',
    expiry: '12/25',
    brand: 'Visa',
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2024-001',
      date: '2024-02-01',
      amount: 9.99,
      status: 'paid',
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-01',
      amount: 9.99,
      status: 'paid',
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-01',
      amount: 9.99,
      status: 'paid',
    },
  ]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>

      {/* Current Plan */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{currentPlan.name}</h3>
                <p className="text-muted-foreground">${currentPlan.price}/month</p>
              </div>
              <Button>Change Plan</Button>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Billing Cycle</span>
                <span>{currentPlan.billingCycle}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span>{currentPlan.nextBilling}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="capitalize">{currentPlan.status}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <CreditCard className="h-6 w-6" />
              <div>
                <p className="font-medium">{paymentMethod.type} ending in {paymentMethod.last4}</p>
                <p className="text-sm text-muted-foreground">Expires {paymentMethod.expiry}</p>
              </div>
            </div>
            <Button variant="outline">Update</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Billing History</CardTitle>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Warning for demo purposes */}
      <Alert className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          This is a demo page. In a real application, you would be able to manage your subscription,
          update payment methods, and download actual invoices.
        </AlertDescription>
      </Alert>
    </div>
  );
}
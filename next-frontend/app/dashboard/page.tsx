'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
  HardDrive,
  Settings,
  BarChart
} from 'lucide-react';

interface UsageMetrics {
  storage: {
    used: number;
    total: number;
  };
  projects: {
    active: number;
    total: number;
  };
  teamMembers: number;
}

const DashboardPage = () => {
  // This would typically come from your API
  const [usage] = useState<UsageMetrics>({
    storage: {
      used: 7.2,
      total: 10
    },
    projects: {
      active: 3,
      total: 5
    },
    teamMembers: 3
  });

  const [subscriptionDetails] = useState({
    plan: 'Basic Plan',
    status: 'Active',
    billingPeriod: 'Monthly',
    nextBilling: '2024-03-01',
    amount: 9.99
  });

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, User!</h1>
        <p className="text-muted-foreground">Here's an overview of your account</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full p-3 bg-blue-100">
              <HardDrive className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Storage Used</p>
              <p className="text-2xl font-bold">{usage.storage.used}GB / {usage.storage.total}GB</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full p-3 bg-green-100">
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Projects</p>
              <p className="text-2xl font-bold">{usage.projects.active} / {usage.projects.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full p-3 bg-purple-100">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Team Members</p>
              <p className="text-2xl font-bold">{usage.teamMembers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="rounded-full p-3 bg-yellow-100">
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Monthly Cost</p>
              <p className="text-2xl font-bold">${subscriptionDetails.amount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Details */}
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Subscription Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{subscriptionDetails.plan}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {subscriptionDetails.status}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-muted-foreground">Billing Period</span>
                <span className="font-medium">{subscriptionDetails.billingPeriod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Next Billing Date</span>
                <span className="font-medium">{subscriptionDetails.nextBilling}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Usage Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.storage.used}GB of {usage.storage.total}GB
                  </span>
                </div>
                <Progress
                  value={(usage.storage.used / usage.storage.total) * 100}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Project Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.projects.active} of {usage.projects.total} Projects
                  </span>
                </div>
                <Progress
                  value={(usage.projects.active / usage.projects.total) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Account Settings
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
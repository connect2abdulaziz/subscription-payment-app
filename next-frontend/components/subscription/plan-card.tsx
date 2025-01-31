'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FeatureList from './feature-list';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  priceId: string;
}

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (priceId: string) => Promise<void>;
  isLoading: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSubscribe, isLoading }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>
          ${plan.price}/{plan.interval}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <FeatureList features={plan.features} />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onSubscribe(plan.priceId)}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : `Subscribe to ${plan.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface FeatureListProps {
  features: string[];
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="w-4 h-4 mr-2 text-green-500" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList;
import React from 'react';
import { StepIndicator } from './StepIndicator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from './ui/separator';

interface BookingLayoutProps {
  currentStep: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function BookingLayout({ currentStep, title, description, children }: BookingLayoutProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <StepIndicator currentStep={currentStep} />
      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}


"use client";

import { useEffect, type ElementType } from "react";
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { tests } from '@/data/mock-data';
import type { Test } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FlaskConical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookingLayout } from '@/components/BookingLayout';

const testIcons: { [key: string]: ElementType } = {
  default: FlaskConical,
};

export default function TestSelectionPage() {
  const router = useRouter();
  const { isLoggedIn, selectedTest, setTest, resetBooking } = useBooking();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn) {
      // Reset booking state when landing on the first page after login
      resetBooking();
    }
  }, [isLoggedIn, resetBooking]);

  const handleSelectTest = (test: Test) => {
    setTest(test);
  };

  const handleNext = () => {
    if (selectedTest) {
      router.push('/doctor-selection');
    }
  };
  
  if (!isLoggedIn) {
    return null; // or a loading spinner while redirecting
  }

  return (
    <BookingLayout
      currentStep={1}
      title="Select a Medical Test"
      description="Choose from our available tests to get started."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test) => {
          const Icon = testIcons[test.icon] || testIcons.default;
          return (
            <Card
              key={test.id}
              onClick={() => handleSelectTest(test)}
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary',
                selectedTest?.id === test.id && 'border-primary ring-2 ring-primary'
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg">{test.name}</CardTitle>
                </div>
                {selectedTest?.id === test.id && (
                  <CheckCircle className="w-6 h-6 text-accent" />
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{test.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-lg font-semibold text-primary">${test.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-end mt-8">
        <Button onClick={handleNext} disabled={!selectedTest} size="lg">
          Next Step
        </Button>
      </div>
    </BookingLayout>
  );
}

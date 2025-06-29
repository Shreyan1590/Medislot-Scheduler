
"use client";

import React, { useEffect, useState, type ElementType } from "react";
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import type { Test } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FlaskConical, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookingLayout } from '@/components/BookingLayout';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";

const testIcons: { [key: string]: ElementType } = {
  default: FlaskConical,
};

export default function TestSelectionPage() {
  const router = useRouter();
  const { isLoggedIn, selectedTest, setTest, resetBooking } = useBooking();
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      resetBooking(); // Reset previous booking state when starting a new one
      const fetchTests = async () => {
          setIsLoading(true);
          try {
              const testsCollection = collection(db, 'tests');
              const testSnapshot = await getDocs(testsCollection);
              const testsList = testSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Test));
              setTests(testsList);
          } catch (error) {
              console.error("Error fetching tests: ", error);
              toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch medical tests. Make sure you have added data to your Firestore `tests` collection.' });
          } finally {
              setIsLoading(false);
          }
      };
      fetchTests();
    }
  }, [isLoggedIn, router, resetBooking, toast]);

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

  if (isLoading) {
    return (
        <BookingLayout
            currentStep={1}
            title="Select a Medical Test"
            description="Choose from our available tests to get started."
        >
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="ml-4">Loading tests...</p>
            </div>
        </BookingLayout>
    );
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

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingLayout } from '@/components/BookingLayout';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function ReceiptPage() {
  const router = useRouter();
  const { selectedTest, selectedDoctor, appointmentDate, resetBooking } = useBooking();
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedTest || !selectedDoctor || !appointmentDate) {
      router.push('/');
    }
  }, [selectedTest, selectedDoctor, appointmentDate, router]);

  useEffect(() => {
    // Generate ID on client mount to avoid hydration mismatch
    setReferenceId(Math.random().toString(36).substring(2, 11).toUpperCase());
  }, []);

  const handleNewBooking = () => {
    resetBooking();
    router.push('/');
  };

  if (!selectedTest || !selectedDoctor || !appointmentDate) {
    return null;
  }

  return (
    <BookingLayout
      currentStep={5}
      title="Appointment Confirmed!"
      description="Your booking is complete. A confirmation has been sent to your email."
    >
      <div className="flex flex-col items-center text-center">
        <CheckCircle className="w-16 h-16 text-accent mb-4" />
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Reference ID: #{referenceId || '...'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Test</span>
              <span className="font-semibold">{selectedTest.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Doctor</span>
              <span className="font-semibold">{selectedDoctor.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-semibold">{format(appointmentDate, 'EEEE, MMMM do, yyyy')} at {format(appointmentDate, 'h:mm a')}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-xl">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-primary">${selectedTest.price.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground text-center w-full">
              If you need to reschedule or cancel, please contact our support team at least 24 hours in advance.
            </p>
          </CardFooter>
        </Card>
        <Button onClick={handleNewBooking} size="lg" className="mt-8 bg-accent hover:bg-accent/90">
          Book Another Appointment
        </Button>
      </div>
    </BookingLayout>
  );
}

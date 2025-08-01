
"use client";

import { useEffect } from 'react';
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
  const { selectedTest, selectedDoctor, appointmentDate, resetBooking, isLoggedIn, patientName, appointmentId } = useBooking();

  useEffect(() => {
    if (!isLoggedIn) {
        router.push('/login');
    } else if (!selectedTest || !selectedDoctor || !appointmentDate || !appointmentId) {
      // Redirect if any crucial information is missing
      router.push('/booking');
    }
  }, [isLoggedIn, selectedTest, selectedDoctor, appointmentDate, appointmentId, router]);


  const handleNewBooking = () => {
    resetBooking();
    router.push('/booking');
  };

  if (!isLoggedIn || !selectedTest || !selectedDoctor || !appointmentDate || !appointmentId) {
    return null; // or a loading skeleton
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
            <CardTitle>Booking Receipt</CardTitle>
            <CardDescription>Appointment Number: #{appointmentId || '...'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
             <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Patient Name</span>
              <span className="font-semibold">{patientName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Test</span>
              <span className="font-semibold">{selectedTest.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Doctor</span>
              <span className="font-semibold">{selectedDoctor.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Consultation Date & Timing</span>
              <span className="font-semibold">{format(appointmentDate, 'EEEE, MMMM do, yyyy')} at {format(appointmentDate, 'h:mm a')}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-xl">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold text-primary">${selectedTest.price.toFixed(2)}</span>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed">
                <span className="text-muted-foreground text-sm">Computerized Signature</span>
                <div className="font-serif italic text-lg text-right mt-2">{selectedDoctor.name}</div>
                <div className="text-xs text-muted-foreground text-right">(Not a pen signature)</div>
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

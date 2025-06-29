
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingLayout } from '@/components/BookingLayout';
import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const paymentSchema = z.object({
  cardName: z.string().min(2, 'Name is too short'),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val.replace(/\s/g, '')), 'Card number must be 16 digits.'),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), 'Invalid format (MM/YY)'),
  cvc: z.string().refine((val) => /^\d{3,4}$/.test(val), 'Invalid CVC'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentPage() {
  const router = useRouter();
  const { user, selectedTest, selectedDoctor, appointmentDate, setPaymentDetails, isLoggedIn, setAppointmentId } = useBooking();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else if (!selectedTest || !selectedDoctor || !appointmentDate) {
      router.push('/schedule');
    }
  }, [isLoggedIn, selectedTest, selectedDoctor, appointmentDate, router]);

  if (!isLoggedIn || !selectedTest || !selectedDoctor || !appointmentDate) {
    return null;
  }

  const onSubmit = async (data: PaymentFormData) => {
    if (!user) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to make a payment.' });
        return;
    }

    setIsSubmitting(true);
    // Simulate payment processing
    setPaymentDetails(data);
    
    const appointmentId = Math.random().toString(36).substring(2, 11).toUpperCase();
    setAppointmentId(appointmentId);

    try {
        const appointmentData = {
            patientId: user.uid,
            patientName: user.displayName,
            testId: selectedTest.id,
            testName: selectedTest.name,
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            appointmentDate: appointmentDate,
            price: selectedTest.price,
            status: 'confirmed',
            createdAt: new Date(),
        };

        await setDoc(doc(db, "appointments", appointmentId), appointmentData);
        
        toast({ title: 'Payment Successful', description: 'Your appointment is confirmed.' });
        router.push('/receipt');
    } catch (error) {
        console.error("Error saving appointment: ", error);
        toast({ variant: 'destructive', title: 'Booking Failed', description: 'Could not save your appointment. Please try again.' });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/schedule');
  };

  return (
    <BookingLayout
      currentStep={4}
      title="Complete Your Payment"
      description="Securely enter your payment details to confirm your appointment."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="•••• •••• •••• ••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input placeholder="•••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Test:</span>
                <span className="font-medium">{selectedTest.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Doctor:</span>
                <span className="font-medium">{selectedDoctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Date & Time:</span>
                <span className="font-medium text-right">{format(appointmentDate, 'MMM d, yyyy, h:mm a')}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${selectedTest.price.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={handleBack} variant="outline" size="lg" disabled={isSubmitting}>Back</Button>
        <Button onClick={form.handleSubmit(onSubmit)} size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Pay & Confirm
        </Button>
      </div>
    </BookingLayout>
  );
}

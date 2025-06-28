"use client";

import { useEffect } from 'react';
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

const paymentSchema = z.object({
  cardName: z.string().min(2, 'Name is too short'),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val), 'Invalid card number'),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), 'Invalid format (MM/YY)'),
  cvc: z.string().refine((val) => /^\d{3,4}$/.test(val), 'Invalid CVC'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentPage() {
  const router = useRouter();
  const { selectedTest, selectedDoctor, appointmentDate, setPaymentDetails } = useBooking();

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
    if (!selectedTest || !selectedDoctor || !appointmentDate) {
      router.push('/schedule');
    }
  }, [selectedTest, selectedDoctor, appointmentDate, router]);

  if (!selectedTest || !selectedDoctor || !appointmentDate) {
    return null;
  }

  const onSubmit = (data: PaymentFormData) => {
    // Simulate payment processing
    setPaymentDetails(data);
    router.push('/receipt');
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
        <Button onClick={handleBack} variant="outline" size="lg">Back</Button>
        <Button onClick={form.handleSubmit(onSubmit)} size="lg" type="submit">
          Pay & Confirm
        </Button>
      </div>
    </BookingLayout>
  );
}

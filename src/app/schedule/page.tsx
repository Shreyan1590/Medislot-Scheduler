"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { BookingLayout } from '@/components/BookingLayout';
import { TimeSuggestion } from '@/components/TimeSuggestion';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export default function SchedulePage() {
  const router = useRouter();
  const { selectedDoctor, appointmentDate, setAppointmentDate, selectedTest } = useBooking();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDoctor || !selectedTest) {
      router.push('/doctor-selection');
    }
  }, [selectedDoctor, selectedTest, router]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const currentFullDate = appointmentDate || new Date();
      const hours = currentFullDate.getHours();
      const minutes = currentFullDate.getMinutes();
      date.setHours(hours, minutes);
      setAppointmentDate(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (appointmentDate) {
      const [timePart, ampm] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);

      if (ampm === 'PM' && hours < 12) {
        hours += 12;
      }
      if (ampm === 'AM' && hours === 12) {
        hours = 0;
      }

      const newDate = new Date(appointmentDate);
      newDate.setHours(hours, minutes, 0, 0);
      setAppointmentDate(newDate);
    }
  };

  const handleNext = () => {
    if (appointmentDate && selectedTime) {
      router.push('/payment');
    }
  };

  const handleBack = () => {
    router.push('/doctor-selection');
  };
  
  const handleSuggestedTime = (suggested: Date) => {
    setAppointmentDate(suggested);
    setSelectedTime(format(suggested, "hh:mm a"));
  }

  if (!selectedDoctor || !selectedTest) return null;

  return (
    <BookingLayout
      currentStep={3}
      title="Schedule Your Appointment"
      description={`Select a date and time to meet with ${selectedDoctor.name}.`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={appointmentDate || undefined}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
              className="rounded-md border"
            />
          </div>
          {appointmentDate && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Select a Time Slot</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="md:col-span-1">
          <TimeSuggestion 
            doctor={selectedDoctor} 
            test={selectedTest} 
            onSuggestionSelect={handleSuggestedTime}
          />
        </div>
      </div>
      
      {appointmentDate && selectedTime && (
        <Alert className="mt-8 bg-blue-50 border-blue-200">
          <Clock className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">Appointment Time Confirmation</AlertTitle>
          <AlertDescription>
            Your appointment is scheduled for{' '}
            <span className="font-semibold">{format(appointmentDate, "MMMM do, yyyy")}</span> at{' '}
            <span className="font-semibold">{selectedTime}</span>.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between mt-8">
        <Button onClick={handleBack} variant="outline" size="lg">Back</Button>
        <Button onClick={handleNext} disabled={!appointmentDate || !selectedTime} size="lg">
          Next Step
        </Button>
      </div>
    </BookingLayout>
  );
}

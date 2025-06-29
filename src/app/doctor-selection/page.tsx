
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useBooking } from '@/context/BookingContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle, Stethoscope, User, Loader2 } from 'lucide-react';
import { BookingLayout } from '@/components/BookingLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Doctor } from '@/lib/types';

export default function DoctorSelectionPage() {
  const router = useRouter();
  const { selectedTest, selectedDoctor, setDoctor, isLoggedIn } = useBooking();
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else if (!selectedTest) {
      router.push('/booking');
    } else {
        const fetchDoctors = async () => {
            setIsLoading(true);
            try {
                const doctorsCollection = collection(db, 'doctors');
                const q = query(doctorsCollection, where("specialties", "array-contains", selectedTest.id));
                const doctorSnapshot = await getDocs(q);
                const doctorsList = doctorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doctor));
                setAvailableDoctors(doctorsList);
            } catch (error) {
                console.error("Error fetching doctors: ", error);
                toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch doctors. Make sure you have added data to your Firestore `doctors` collection.' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchDoctors();
    }
  }, [isLoggedIn, selectedTest, router, toast]);

  if (!isLoggedIn || !selectedTest) {
    return null; // or a loading spinner
  }

  const handleNext = () => {
    if (selectedDoctor) {
      router.push('/schedule');
    }
  };

  const handleBack = () => {
    router.push('/booking');
  };
  
  if (isLoading) {
    return (
        <BookingLayout
            currentStep={2}
            title={`Select a Doctor for ${selectedTest.name}`}
            description="Our expert physicians are here to help."
        >
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                 <p className="ml-4">Finding available doctors...</p>
            </div>
        </BookingLayout>
    );
  }

  return (
    <BookingLayout
      currentStep={2}
      title={`Select a Doctor for ${selectedTest.name}`}
      description="Our expert physicians are here to help."
    >
      {availableDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableDoctors.map(doctor => (
            <Card
              key={doctor.id}
              onClick={() => setDoctor(doctor)}
              className={cn(
                'cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary',
                selectedDoctor?.id === doctor.id && 'border-primary ring-2 ring-primary'
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                    data-ai-hint="doctor person"
                  />
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                </div>
                {selectedDoctor?.id === doctor.id && <CheckCircle className="w-6 h-6 text-accent" />}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>{selectedTest.name} Specialist</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Alert>
          <User className="h-4 w-4" />
          <AlertTitle>No Doctors Available</AlertTitle>
          <AlertDescription>
            We're sorry, but there are no doctors available for this test. Please{' '}
            <Link href="/booking" className="underline">select another test</Link>.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex justify-between mt-8">
        <Button onClick={handleBack} variant="outline" size="lg">
          Back
        </Button>
        <Button onClick={handleNext} disabled={!selectedDoctor} size="lg">
          Next Step
        </Button>
      </div>
    </BookingLayout>
  );
}

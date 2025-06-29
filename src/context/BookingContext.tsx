
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Test, Doctor } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface BookingState {
  isLoggedIn: boolean;
  user: User | null;
  patientName: string | null;
  selectedTest: Test | null;
  selectedDoctor: Doctor | null;
  appointmentDate: Date | null;
  paymentDetails: any | null; 
  appointmentId: string | null;
}

interface BookingContextType extends BookingState {
  logout: () => void;
  setTest: (test: Test) => void;
  setDoctor: (doctor: Doctor) => void;
  setAppointmentDate: (date: Date | null) => void;
  setPaymentDetails: (details: any) => void;
  setAppointmentId: (id: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  isLoggedIn: false,
  user: null,
  patientName: null,
  selectedTest: null,
  selectedDoctor: null,
  appointmentDate: null,
  paymentDetails: null,
  appointmentId: null,
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>(initialState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setState(prevState => ({
          ...prevState,
          isLoggedIn: true,
          user: user,
          patientName: user.displayName || user.email,
        }));
      } else {
        setState(initialState);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    await firebaseSignOut(auth);
    router.push('/login');
  }, [router]);

  const setTest = (test: Test) => {
    setState(prevState => ({ ...prevState, selectedTest: test, selectedDoctor: null, appointmentDate: null, paymentDetails: null, appointmentId: null }));
  };

  const setDoctor = (doctor: Doctor) => {
    setState(prevState => ({ ...prevState, selectedDoctor: doctor }));
  };

  const setAppointmentDate = (date: Date | null) => {
    setState(prevState => ({ ...prevState, appointmentDate: date }));
  };

  const setPaymentDetails = (details: any) => {
    setState(prevState => ({ ...prevState, paymentDetails: details }));
  };

  const setAppointmentId = (id: string) => {
    setState(prevState => ({ ...prevState, appointmentId: id }));
  };

  const resetBooking = useCallback(() => {
    // Resets booking details but keeps user logged in
    setState(prevState => ({
      ...prevState,
      selectedTest: null,
      selectedDoctor: null,
      appointmentDate: null,
      paymentDetails: null,
      appointmentId: null,
    }));
  }, []);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        logout,
        setTest,
        setDoctor,
        setAppointmentDate,
        setPaymentDetails,
        setAppointmentId,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

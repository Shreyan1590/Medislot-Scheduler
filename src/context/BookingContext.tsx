"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Test, Doctor } from '@/lib/types';

interface BookingState {
  selectedTest: Test | null;
  selectedDoctor: Doctor | null;
  appointmentDate: Date | null;
  paymentDetails: any | null; // Replace 'any' with a proper payment details type
}

interface BookingContextType extends BookingState {
  setTest: (test: Test) => void;
  setDoctor: (doctor: Doctor) => void;
  setAppointmentDate: (date: Date | null) => void;
  setPaymentDetails: (details: any) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  selectedTest: null,
  selectedDoctor: null,
  appointmentDate: null,
  paymentDetails: null,
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>(initialState);

  const setTest = (test: Test) => {
    setState(prevState => ({ ...prevState, selectedTest: test }));
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

  const resetBooking = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setTest,
        setDoctor,
        setAppointmentDate,
        setPaymentDetails,
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

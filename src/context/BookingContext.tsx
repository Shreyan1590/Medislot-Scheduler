
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import type { Test, Doctor } from '@/lib/types';

interface BookingState {
  isLoggedIn: boolean;
  patientName: string | null;
  selectedTest: Test | null;
  selectedDoctor: Doctor | null;
  appointmentDate: Date | null;
  paymentDetails: any | null; // Replace 'any' with a proper payment details type
}

interface BookingContextType extends BookingState {
  login: (name: string) => void;
  logout: () => void;
  setTest: (test: Test) => void;
  setDoctor: (doctor: Doctor) => void;
  setAppointmentDate: (date: Date | null) => void;
  setPaymentDetails: (details: any) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  isLoggedIn: false,
  patientName: null,
  selectedTest: null,
  selectedDoctor: null,
  appointmentDate: null,
  paymentDetails: null,
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BookingState>(initialState);

  const login = (name: string) => {
    setState({
      ...initialState, // Clear previous booking data on login
      isLoggedIn: true,
      patientName: name,
    });
  };

  const logout = useCallback(() => {
    setState(initialState);
  }, []);

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
    // Resets booking details but keeps user logged in
    setState(prevState => ({
      ...prevState,
      selectedTest: null,
      selectedDoctor: null,
      appointmentDate: null,
      paymentDetails: null,
    }));
  }, []);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        login,
        logout,
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

import type { Test, Doctor } from '@/lib/types';

export const tests: Test[] = [
  {
    id: 't1',
    name: 'Comprehensive Blood Panel',
    description: 'A full-spectrum blood test covering all major health markers.',
    price: 150,
    icon: 'blood',
  },
  {
    id: 't2',
    name: 'Allergy Testing',
    description: 'Identifies common environmental and food allergies.',
    price: 250,
    icon: 'allergy',
  },
  {
    id: 't3',
    name: 'Diagnostic Imaging (X-Ray)',
    description: 'Standard X-ray imaging for bones and internal structures.',
    price: 300,
    icon: 'xray',
  },
];

export const doctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Evelyn Reed',
    image: 'https://placehold.co/100x100',
    availability: 'Monday-Friday, 9:00 AM - 5:00 PM',
    specialties: ['t1', 't2'],
  },
  {
    id: 'd2',
    name: 'Dr. Julian Hayes',
    image: 'https://placehold.co/100x100',
    availability: 'Tuesday, Thursday, Friday, 10:00 AM - 6:00 PM',
    specialties: ['t1'],
  },
  {
    id: 'd3',
    name: 'Dr. Anya Sharma',
    image: 'https://placehold.co/100x100',
    availability: 'Monday, Wednesday, 8:00 AM - 4:00 PM',
    specialties: ['t3'],
  },
   {
    id: 'd4',
    name: 'Dr. Marcus Thorne',
    image: 'https://placehold.co/100x100',
    availability: 'Wednesday-Friday, 11:00 AM - 7:00 PM',
    specialties: ['t2', 't3'],
  },
];

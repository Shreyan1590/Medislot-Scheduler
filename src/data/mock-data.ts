import type { Test, Doctor } from '@/lib/types';

export const tests: Test[] = [
  { id: 't1', name: 'Comprehensive Blood Panel', description: 'Full-spectrum blood test for major health markers.', price: 150, icon: 'blood' },
  { id: 't2', name: 'Allergy Testing', description: 'Identifies common environmental and food allergies.', price: 250, icon: 'allergy' },
  { id: 't3', name: 'Diagnostic Imaging (X-Ray)', description: 'Standard X-ray for bones and internal structures.', price: 300, icon: 'xray' },
  { id: 't4', name: 'Lipid Panel', description: 'Measures cholesterol and triglyceride levels.', price: 80, icon: 'heart' },
  { id: 't5', name: 'Thyroid Function Test (TSH)', description: 'Checks for thyroid gland problems.', price: 110, icon: 'activity' },
  { id: 't6', name: 'Complete Blood Count (CBC)', description: 'Evaluates overall health and detects a wide range of disorders.', price: 75, icon: 'blood' },
  { id: 't7', name: 'Urinalysis', description: 'Analyzes urine for various medical conditions.', price: 50, icon: 'microscope' },
  { id: 't8', name: 'Glucose Tolerance Test', description: 'Measures your body\'s response to sugar (glucose).', price: 120, icon: 'blood' },
  { id: 't9', name: 'MRI Scan', description: 'Magnetic resonance imaging for detailed internal views.', price: 800, icon: 'xray' },
  { id: 't10', name: 'CT Scan', description: 'Computed tomography scan for cross-sectional images.', price: 650, icon: 'xray' },
  { id: 't11', name: 'Echocardiogram', description: 'Ultrasound of the heart to check its function.', price: 450, icon: 'heart' },
  { id: 't12', name: 'Electrocardiogram (ECG)', description: 'Records the electrical signal from the heart.', price: 150, icon: 'heart' },
  { id: 't13', name: 'Vitamin D Test', description: 'Measures the level of Vitamin D in your blood.', price: 90, icon: 'default' },
  { id: 't14', name: 'C-Reactive Protein (CRP) Test', description: 'Measures the level of inflammation in the body.', price: 60, icon: 'blood' },
  { id: 't15', name: 'Liver Function Tests (LFT)', description: 'Measures enzymes and proteins in your blood.', price: 130, icon: 'microscope' },
  { id: 't16', name: 'Kidney Function Tests (KFT)', description: 'Assesses how well your kidneys are working.', price: 125, icon: 'microscope' },
  { id: 't17', name: 'Genetic Screening', description: 'Analyzes your DNA for genetic disorders or predispositions.', price: 1200, icon: 'genetic' },
  { id: 't18', name: 'Pap Smear', description: 'Screens for cervical cancer in women.', price: 180, icon: 'microscope' },
  { id: 't19', name: 'Colonoscopy', description: 'Examines the large intestine for abnormalities.', price: 1500, icon: 'xray' },
  { id: 't20', name: 'Bone Density Scan', description: 'Measures bone loss and risk of osteoporosis.', price: 220, icon: 'xray' },
];

export const doctors: Doctor[] = [
  { id: 'd1', name: 'Dr. Evelyn Reed', image: 'https://placehold.co/100x100.png', availability: 'Monday-Friday, 9:00 AM - 5:00 PM', specialties: ['t1', 't2', 't6', 't14'] },
  { id: 'd2', name: 'Dr. Julian Hayes', image: 'https://placehold.co/100x100.png', availability: 'Tuesday, Thursday, Friday, 10:00 AM - 6:00 PM', specialties: ['t1', 't4', 't8', 't12', 't13'] },
  { id: 'd3', name: 'Dr. Anya Sharma', image: 'https://placehold.co/100x100.png', availability: 'Monday, Wednesday, 8:00 AM - 4:00 PM', specialties: ['t3', 't9', 't10', 't19', 't20'] },
  { id: 'd4', name: 'Dr. Marcus Thorne', image: 'https://placehold.co/100x100.png', availability: 'Wednesday-Friday, 11:00 AM - 7:00 PM', specialties: ['t2', 't3', 't5'] },
  { id: 'd5', name: 'Dr. Lena Petrova', image: 'https://placehold.co/100x100.png', availability: 'Monday-Wednesday, 10:00 AM - 4:00 PM', specialties: ['t7', 't15', 't16', 't18'] },
  { id: 'd6', name: 'Dr. Kenji Tanaka', image: 'https://placehold.co/100x100.png', availability: 'Thursday-Saturday, 9:00 AM - 3:00 PM', specialties: ['t11', 't12', 't4'] },
  { id: 'd7', name: 'Dr. Sofia Rossi', image: 'https://placehold.co/100x100.png', availability: 'Tuesday, Wednesday, Friday, 8:00 AM - 2:00 PM', specialties: ['t17', 't18'] },
];

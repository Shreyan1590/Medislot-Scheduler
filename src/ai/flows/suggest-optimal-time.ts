'use server';

/**
 * @fileOverview An AI agent that suggests optimal appointment times based on doctor availability and selected test.
 *
 * - suggestOptimalTime - A function that suggests optimal appointment times.
 * - SuggestOptimalTimeInput - The input type for the suggestOptimalTime function.
 * - SuggestOptimalTimeOutput - The return type for the suggestOptimalTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalTimeInputSchema = z.object({
  testName: z.string().describe('The name of the selected test.'),
  doctorName: z.string().describe('The name of the selected doctor.'),
  doctorAvailability: z.string().describe('The availability of the doctor, as a string.'),
  patientPreferences: z.string().describe('The patient time preferences, such as morning or afternoon.'),
});
export type SuggestOptimalTimeInput = z.infer<typeof SuggestOptimalTimeInputSchema>;

const SuggestOptimalTimeOutputSchema = z.object({
  suggestedTime: z.string().describe('The suggested optimal appointment time.'),
  reasoning: z.string().describe('The reasoning behind the suggested time.'),
});
export type SuggestOptimalTimeOutput = z.infer<typeof SuggestOptimalTimeOutputSchema>;

export async function suggestOptimalTime(input: SuggestOptimalTimeInput): Promise<SuggestOptimalTimeOutput> {
  return suggestOptimalTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalTimePrompt',
  input: {schema: SuggestOptimalTimeInputSchema},
  output: {schema: SuggestOptimalTimeOutputSchema},
  prompt: `You are an AI assistant specialized in scheduling appointments.

  Based on the following information, suggest the optimal appointment time for the patient.

  Test Name: {{{testName}}}
  Doctor Name: {{{doctorName}}}
  Doctor Availability: {{{doctorAvailability}}}
  Patient Preferences: {{{patientPreferences}}}

  Consider the doctor's availability, the patient's preferences, and the type of test to suggest the best appointment time.
  Explain your reasoning behind the suggested time.
  `,
});

const suggestOptimalTimeFlow = ai.defineFlow(
  {
    name: 'suggestOptimalTimeFlow',
    inputSchema: SuggestOptimalTimeInputSchema,
    outputSchema: SuggestOptimalTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

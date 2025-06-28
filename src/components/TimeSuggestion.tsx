"use client";

import { useState, useTransition } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { suggestOptimalTime, SuggestOptimalTimeOutput } from '@/ai/flows/suggest-optimal-time';
import type { Doctor, Test } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { format } from 'date-fns';

interface TimeSuggestionProps {
  doctor: Doctor;
  test: Test;
  onSuggestionSelect: (date: Date) => void;
}

export function TimeSuggestion({ doctor, test, onSuggestionSelect }: TimeSuggestionProps) {
  const [preference, setPreference] = useState('any');
  const [suggestion, setSuggestion] = useState<SuggestOptimalTimeOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSuggestTime = () => {
    startTransition(async () => {
      setSuggestion(null);
      try {
        const result = await suggestOptimalTime({
          doctorName: doctor.name,
          doctorAvailability: doctor.availability,
          testName: test.name,
          patientPreferences: preference,
        });
        setSuggestion(result);
      } catch (error) {
        console.error('AI suggestion failed:', error);
        toast({
          variant: 'destructive',
          title: 'Suggestion Failed',
          description: 'Could not get an AI-powered time suggestion. Please select a time manually.',
        });
      }
    });
  };

  const handleAcceptSuggestion = () => {
    if (suggestion) {
        // This is a simplified parsing. A real app would need robust date parsing.
        // Assuming the AI returns a format like "Friday at 2:00 PM"
        const now = new Date();
        const suggestedDate = new Date(now); // We'll just set it for today for simplicity
        try {
            const timeString = suggestion.suggestedTime.split(' at ')[1];
            const [time, ampm] = timeString.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
            if (ampm === 'PM' && hours < 12) hours += 12;
            if (ampm === 'AM' && hours === 12) hours = 0;
            suggestedDate.setHours(hours, minutes, 0, 0);

            onSuggestionSelect(suggestedDate);
            toast({
                title: 'Time selected!',
                description: `Scheduled for ${format(suggestedDate, "hh:mm a")}.`,
            });
        } catch (e) {
             toast({
                variant: 'destructive',
                title: 'Error Parsing Time',
                description: 'Could not apply the suggested time.',
            });
        }
    }
  };

  return (
    <Card className="bg-blue-50/50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-yellow-400" />
          <span>Intelligent Suggestion</span>
        </CardTitle>
        <CardDescription>
          Let our AI assistant find the optimal time for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="font-semibold">Your Preference</Label>
            <RadioGroup defaultValue="any" onValueChange={setPreference} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="morning" id="morning" />
                <Label htmlFor="morning">Morning</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="afternoon" id="afternoon" />
                <Label htmlFor="afternoon">Afternoon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Any Time</Label>
              </div>
            </RadioGroup>
          </div>
          <Button onClick={handleSuggestTime} disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              'Suggest a Time'
            )}
          </Button>

          {suggestion && (
            <Alert className="bg-white">
              <AlertTitle className="font-semibold">{suggestion.suggestedTime}</AlertTitle>
              <AlertDescription>
                {suggestion.reasoning}
              </AlertDescription>
              <Button size="sm" className="mt-4 w-full" onClick={handleAcceptSuggestion}>
                Accept Suggestion
              </Button>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

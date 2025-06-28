import { cn } from '@/lib/utils';
import { Check, FlaskConical, Stethoscope, Calendar, CreditCard, Receipt } from 'lucide-react';

const steps = [
  { name: 'Select Test', icon: FlaskConical },
  { name: 'Select Doctor', icon: Stethoscope },
  { name: 'Schedule', icon: Calendar },
  { name: 'Payment', icon: CreditCard },
  { name: 'Confirmation', icon: Receipt },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={cn('relative', stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20 flex-1' : '')}>
            {stepIdx < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-primary rounded-full">
                  <Check className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                </div>
                <span className="absolute -bottom-7 w-max text-xs text-primary font-medium">{step.name}</span>
              </>
            ) : stepIdx === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-primary rounded-full border-2 border-primary" aria-current="step">
                  <step.icon className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                </div>
                <span className="absolute -bottom-7 w-max text-xs text-primary font-bold">{step.name}</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center bg-background border-2 border-gray-300 rounded-full">
                  <step.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                 <span className="absolute -bottom-7 w-max text-xs text-gray-500">{step.name}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

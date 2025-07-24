import { CheckCircle } from 'lucide-react';
import { RegistrationStep } from '../types';

interface RegistrationProgressProps {
  currentStep: RegistrationStep;
}

const steps = [
  { key: 'personal', label: 'Personal Information', number: 1 },
  { key: 'identification', label: 'Identification Details', number: 2 },
  { key: 'medical', label: 'Medical Information', number: 3 },
  { key: 'sponsor', label: 'Sponsor Information', number: 4 },
];

export function RegistrationProgress({
  currentStep,
}: RegistrationProgressProps) {
  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isUpcoming = index > currentStepIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${isCompleted ? 'form-step-completed' : ''}
                  ${isCurrent ? 'form-step-active' : ''}
                  ${isUpcoming ? 'form-step-inactive' : ''}
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="ml-3 hidden sm:block">
                <p
                  className={`text-sm font-medium ${isCurrent ? 'text-primary' : 'text-gray-500'}`}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

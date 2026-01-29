import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingOption {
  value: string;
  label: string;
  description?: string;
}

interface OnboardingStep {
  id: number;
  question: string;
  options: OnboardingOption[];
  field: string;
}

const STEPS: OnboardingStep[] = [
  {
    id: 1,
    question: "Which best describes you today?",
    field: 'current_stage',
    options: [
      { value: 'exploring', label: 'Exploring the industry', description: 'Researching or planning to start' },
      { value: '1-2_properties', label: '1–2 properties', description: 'Building the foundation' },
      { value: '3-10_properties', label: '3–10 properties', description: 'Scaling operations' },
      { value: '10+_properties', label: '10+ properties', description: 'Portfolio operator' },
      { value: 'property_manager', label: 'Property manager', description: 'Managing for others' },
      { value: 'industry_provider', label: 'Industry provider', description: 'Serving the industry' },
    ],
  },
  {
    id: 2,
    question: "What outcome matters most right now?",
    field: 'primary_outcome',
    options: [
      { value: 'confidence', label: 'More confidence', description: 'In my decisions and direction' },
      { value: 'better_guests', label: 'Better guests', description: 'Higher quality bookings' },
      { value: 'higher_rates', label: 'Higher rates', description: 'Premium positioning' },
      { value: 'direct_bookings', label: 'More direct bookings', description: 'Less platform dependence' },
      { value: 'stronger_brand', label: 'Stronger brand', description: 'Stand out in the market' },
      { value: 'professional_credibility', label: 'Professional credibility', description: 'Industry recognition' },
    ],
  },
  {
    id: 3,
    question: "When something goes wrong, what's your instinct?",
    field: 'decision_pattern',
    options: [
      { value: 'fix_fast', label: 'Fix it fast', description: 'Action first, analysis later' },
      { value: 'explain_away', label: 'Explain it away', description: 'Smooth things over' },
      { value: 'refund_avoid_conflict', label: 'Refund to avoid conflict', description: 'Keep the peace at any cost' },
      { value: 'investigate_calmly', label: 'Investigate calmly', description: 'Understand before acting' },
      { value: 'ask_advice', label: 'Ask for advice', description: 'Consult before deciding' },
    ],
  },
  {
    id: 4,
    question: "Which statement feels closest to you?",
    field: 'hospitality_belief',
    options: [
      { value: 'logistics', label: 'Hospitality is mostly logistics', description: 'Systems and operations' },
      { value: 'people', label: 'Hospitality is mostly people', description: 'Human connection' },
      { value: 'brand_experience', label: 'Hospitality is brand + experience', description: 'Curated moments' },
      { value: 'professional_craft', label: 'Hospitality is a professional craft', description: 'Standards and excellence' },
    ],
  },
  {
    id: 5,
    question: "In 3 years, how do you want to be perceived?",
    field: 'future_perception',
    options: [
      { value: 'side_host', label: 'As a side host', description: 'Supplemental income' },
      { value: 'solid_operator', label: 'As a solid operator', description: 'Reliable and consistent' },
      { value: 'professional_authority', label: 'As a professional authority', description: 'Industry expert' },
      { value: 'respected_brand', label: 'As a respected brand', description: 'Market leader' },
    ],
  },
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatingInsights, setGeneratingInsights] = useState(false);

  const step = STEPS[currentStep];

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [step.field]: value });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    setGeneratingInsights(true);

    // Simulate saving and generating insights
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save to localStorage for demo
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('identity_assessment', JSON.stringify(answers));

    // Redirect to dashboard
    window.location.href = '/';
  };

  const canProceed = answers[step.field];
  const isLastStep = currentStep === STEPS.length - 1;

  if (generatingInsights) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
          <Sparkles className="text-gold animate-pulse" size={28} />
        </div>
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-6" />
        <p className="text-muted-foreground font-serif italic">
          Preparing your personalized insights...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-16">
      <div className="w-full max-w-2xl px-6">
        {/* Progress indicators */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {STEPS.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === currentStep
                  ? "w-8 bg-gold"
                  : idx < currentStep
                  ? "bg-gold/50"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Question */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Step {step.id} of {STEPS.length}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif text-foreground">
            {step.question}
          </h1>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-12">
          {step.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "w-full p-5 rounded border text-left transition-all duration-300",
                answers[step.field] === option.value
                  ? "bg-gold/10 border-gold"
                  : "bg-card border-border hover:border-gold/50"
              )}
            >
              <p className="font-medium text-foreground mb-1">
                {option.label}
              </p>
              {option.description && (
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>

          {isLastStep ? (
            <Button
              onClick={handleComplete}
              disabled={!canProceed || isSubmitting}
              className="bg-gold text-black hover:bg-gold/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Saving...
                </>
              ) : (
                <>
                  Begin Your Path
                  <ArrowRight className="ml-2" size={16} />
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gold text-black hover:bg-gold/90"
            >
              Continue
              <ArrowRight className="ml-2" size={16} />
            </Button>
          )}
        </div>

        {/* JAiNE acknowledgment on last step */}
        {isLastStep && canProceed && (
          <p className="text-center text-muted-foreground text-sm mt-12 font-serif italic animate-in fade-in-50 duration-500">
            "Every professional host deserves a tailored path."
          </p>
        )}
      </div>
    </div>
  );
}




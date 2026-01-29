import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, Lock, User, Building, Home, Sparkles, Globe, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/Badge';

const stages = [
  {
    id: 'identity',
    title: 'Identity',
    description: 'A clear identity builds trust fast—especially on first click.',
    icon: User,
    steps: [
      { id: 'photo', label: 'Add profile photo', benefit: 'Profiles with photos get 31% more clicks', completed: false, locked: false },
      { id: 'name', label: 'Complete your name', benefit: 'Required for public profile', completed: true, locked: false },
    ],
  },
  {
    id: 'properties',
    title: 'Properties',
    description: 'Showcase your portfolio to drive bookings.',
    icon: Home,
    steps: [
      { id: 'first_property', label: 'Add first property', benefit: 'Required for directory exposure', completed: false, locked: false },
    ],
  },
  {
    id: 'ai',
    title: 'AI Concierge',
    description: 'Train your AI to represent your brand.',
    icon: Sparkles,
    steps: [
      { id: 'ai_memory', label: 'Answer AI questions', benefit: 'Personalized responses', completed: false, locked: false },
    ],
  },
];

export function ActivationStages() {
  const [openStages, setOpenStages] = useState<string[]>(['identity']);

  const toggleStage = (id: string) => {
    setOpenStages(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-serif text-white mb-6">Your Activation Journey</h2>
      
      {stages.map((stage) => {
        const isOpen = openStages.includes(stage.id);
        const completedCount = stage.steps.filter(s => s.completed).length;
        
        return (
          <div key={stage.id} className="border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/20">
            <button
              onClick={() => toggleStage(stage.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-zinc-900/40 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-900 rounded-xl">
                  <stage.icon size={24} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{stage.title}</h3>
                  <p className="text-sm text-zinc-500">{stage.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Progress</span>
                  <span className="text-sm text-white font-medium">{completedCount} / {stage.steps.length}</span>
                </div>
                {isOpen ? <ChevronUp className="text-zinc-600" /> : <ChevronDown className="text-zinc-600" />}
              </div>
            </button>
            
            {isOpen && (
              <div className="px-6 pb-6 space-y-3">
                {stage.steps.map((step) => (
                  <div 
                    key={step.id} 
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all",
                      step.completed 
                        ? "bg-orange-500/5 border-orange-500/20" 
                        : "bg-zinc-900/20 border-zinc-800"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        step.completed ? "bg-orange-500 text-black" : "border-2 border-zinc-800"
                      )}>
                        {step.completed && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div>
                        <p className={cn("text-sm font-medium", step.completed ? "text-white" : "text-zinc-400")}>
                          {step.label}
                        </p>
                        {step.benefit && <p className="text-xs text-zinc-500 mt-0.5">{step.benefit}</p>}
                      </div>
                    </div>
                    
                    {!step.completed && !step.locked && (
                      <Badge variant="outline" className="text-[10px] py-0 px-2">+25 XP</Badge>
                    )}
                    {step.locked && <Lock size={14} className="text-zinc-700" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}





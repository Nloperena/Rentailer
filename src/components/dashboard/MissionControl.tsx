import React from 'react';
import { ArrowRight, Check, Circle } from 'lucide-react';
import { FadeIn } from '../motion/MotionWrapper';
import type { JourneyStep, UserProfile } from '@/lib/types';

interface MissionControlProps {
  user: UserProfile;
  journey: JourneyStep[];
  stats: any;
}

export function MissionControl({ user, journey, stats }: MissionControlProps) {
  const nextAction = journey.find(s => !s.completed && !s.locked);
  const completedCount = journey.filter(s => s.completed).length;

  return (
    <div className="max-w-lg mx-auto space-y-10">
      {/* Clean Header */}
      <FadeIn className="space-y-1">
        <p className="text-sm text-muted-foreground">Good morning,</p>
        <h1 className="text-3xl font-serif text-foreground">
          {user.full_name.split(' ')[0]}
        </h1>
      </FadeIn>

      {/* Next Action - Clean Card */}
      {nextAction && (
        <FadeIn className="bg-card border border-border/60 rounded-2xl p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Up next</p>
            <h2 className="text-xl font-semibold text-foreground leading-snug">{nextAction.label}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{nextAction.benefit}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn-gold h-11 px-6 rounded-xl text-sm font-semibold flex items-center gap-2">
              Start <ArrowRight size={16} />
            </button>
            <span className="text-xs text-gold font-medium">+{nextAction.xp} XP</span>
          </div>
        </FadeIn>
      )}

      {/* Progress - Minimal List */}
      <FadeIn className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Your journey</h3>
          <span className="text-xs text-muted-foreground">{completedCount} of {journey.length}</span>
        </div>
        
        <div className="space-y-1">
          {journey.map((step, i) => (
            <div 
              key={step.id} 
              className={`flex items-center gap-3 py-3 px-1 border-b border-border/40 last:border-0 ${
                step.locked ? "opacity-40" : ""
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                step.completed 
                  ? "bg-gold text-primary-foreground" 
                  : "border border-border"
              }`}>
                {step.completed && <Check size={12} strokeWidth={3} />}
              </div>
              <span className={`text-sm flex-1 ${
                step.completed ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.label}
              </span>
              {step.completed && (
                <span className="text-[10px] text-muted-foreground">Done</span>
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Stats - Simple Row */}
      <FadeIn className="flex gap-8 pt-4 border-t border-border/40">
        <div>
          <p className="text-2xl font-semibold text-foreground">{stats.profileViews.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Profile views</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-gold">{stats.xp.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground">{stats.completionPercentage}%</p>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </FadeIn>
    </div>
  );
}

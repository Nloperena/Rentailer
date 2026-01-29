import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, Lock, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivationStep {
  id: string;
  label: string;
  benefit?: string;
  completed: boolean;
  locked: boolean;
  href: string;
  xp?: number;
}

interface ActivationPhase {
  name: string;
  description: string;
}

interface ActivationCardProps {
  percentage: number;
  phase: ActivationPhase;
  nextActions: ActivationStep[];
  onActionClick?: (step: ActivationStep) => void;
}

const PHASE_COLORS: Record<string, string> = {
  'Foundation': 'bg-muted/50 text-muted-foreground',
  'Visibility': 'bg-primary/10 text-primary',
  'Authority': 'bg-emerald-500/10 text-emerald-400',
  'Certified Authority': 'bg-primary/10 text-primary',
};

export function ActivationCard({ percentage, phase, nextActions, onActionClick }: ActivationCardProps) {
  const incompleteActions = nextActions.filter(a => !a.completed && !a.locked).slice(0, 3);
  
  const justUnlocked60 = percentage >= 60 && percentage < 65;
  const justUnlocked80 = percentage >= 80 && percentage < 85;
  const isComplete = percentage >= 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className={cn(
        "card-game p-4 sm:p-6 lg:p-8 relative overflow-hidden border border-border/60 rounded-xl bg-card",
        isComplete && "border-primary/40"
      )}
    >
      {/* Ambient glow for complete state */}
      {isComplete && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
      )}

      {/* Phase Badge & Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <motion.div 
            className={cn(
              "w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              isComplete ? "bg-primary/20" : "bg-primary/10"
            )}
            animate={isComplete ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isComplete ? (
              <Sparkles className="text-primary" size={22} />
            ) : (
              <Target className="text-primary" size={22} />
            )}
          </motion.div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              {isComplete ? "Fully Activated!" : "Activation Progress"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {isComplete 
                ? "Your profile is working for you" 
                : `${percentage}% complete`
              }
            </p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Badge className={cn("text-[10px] sm:text-xs px-3 py-1", PHASE_COLORS[phase.name] || 'bg-muted/50 text-muted-foreground')}>
            {phase.name}
          </Badge>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5 sm:mb-6">
        <div className="relative h-3 sm:h-4 bg-muted/50 rounded-full overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ 
              background: 'linear-gradient(to right, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)))',
              boxShadow: '0 0 12px hsl(var(--gold) / 0.4)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          />
          {/* Milestone markers */}
          <div className="absolute inset-0 flex items-center justify-between px-1">
            {[60, 80].map(milestone => (
              <div 
                key={milestone}
                className="absolute h-full w-0.5 bg-background/50"
                style={{ left: `${milestone}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-[10px] sm:text-xs">
          <span className="text-muted-foreground">Start</span>
          <div className="flex gap-4 sm:gap-6">
            <span className={cn(
              "transition-colors",
              percentage >= 60 ? 'text-gold font-semibold' : 'text-muted-foreground'
            )}>60%</span>
            <span className={cn(
              "transition-colors",
              percentage >= 80 ? 'text-emerald-400 font-semibold' : 'text-muted-foreground'
            )}>80%</span>
          </div>
          <span className={cn(
            "transition-colors",
            percentage >= 100 ? 'text-gold font-semibold' : 'text-muted-foreground'
          )}>100%</span>
        </div>
      </div>

      {/* Celebration Messages */}
      <AnimatePresence>
        {justUnlocked60 && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="p-4 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden"
          >
            <p className="text-sm font-medium text-gold flex items-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5 }}>
                🎉
              </motion.span>
              <Sparkles size={16} />
              Visibility unlocked — people can now discover you!
            </p>
          </motion.div>
        )}
        
        {justUnlocked80 && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 overflow-hidden"
          >
            <p className="text-sm font-medium text-emerald-400 flex items-center gap-2">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5 }}>
                🚀
              </motion.span>
              <Sparkles size={16} />
              You're now operating as a professional brand!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Actions Checklist */}
      {!isComplete && incompleteActions.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Complete to level up:
          </p>
          
          <div className="space-y-2">
            {incompleteActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <a
                  href={action.href}
                  className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border border-border/60 bg-card/50 hover:bg-card hover:border-primary/30 transition-all group"
                  onClick={() => onActionClick?.(action)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <motion.div 
                      className="w-7 h-7 rounded-full border-2 border-dashed border-primary/30 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, borderColor: 'hsl(var(--gold))' }}
                    >
                      {action.completed ? (
                        <CheckCircle2 className="text-gold" size={16} />
                      ) : action.locked ? (
                        <Lock className="text-muted-foreground" size={12} />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-primary/40" />
                      )}
                    </motion.div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-gold transition-colors truncate">
                        {action.label}
                      </p>
                      {action.benefit && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {action.benefit}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {action.xp && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/40 shadow-sm shadow-primary/10"
                      >
                        <Zap className="text-gold" size={12} />
                        <span className="text-[11px] sm:text-xs font-bold text-gold whitespace-nowrap">
                          +{action.xp} XP
                        </span>
                      </motion.div>
                    )}
                    <ArrowRight className="text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0" size={16} />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Full activation message */}
      {isComplete && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center py-4"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Your profile is optimized for discovery. Keep it fresh!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="/directory">
              <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary hover:bg-primary/5">
                View Directory
              </Button>
            </a>
            <a href="/jaine">
              <Button className="btn-gold shadow-lg shadow-primary/20" size="sm">
                Ask JAiNE
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}




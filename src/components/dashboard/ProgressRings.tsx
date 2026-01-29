import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressRingsProps {
  profileStrength: number;
  propertyReadiness: number;
  certificationProgress: number;
  aiReadiness: number;
  showAIRing?: boolean;
}

interface RingConfig {
  label: string;
  value: number;
  color: string;
  glowColor: string;
}

function CircularProgress({ 
  value, 
  size = 80, 
  strokeWidth = 6,
  color,
  glowColor,
  label,
  delay = 0,
}: { 
  value: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  glowColor: string;
  label: string;
  delay?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, value));
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg className="absolute inset-0" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            opacity={0.3}
          />
        </svg>
        
        {/* Progress ring */}
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, delay, ease: 'easeOut' }}
            style={{
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }}
          />
        </svg>
        
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-sm font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            {progress}%
          </motion.span>
        </div>
      </div>
      
      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium text-center">
        {label}
      </span>
    </div>
  );
}

export function ProgressRings({
  profileStrength,
  propertyReadiness,
  certificationProgress,
  aiReadiness,
  showAIRing = true,
}: ProgressRingsProps) {
  const rings: RingConfig[] = [
    { 
      label: 'Profile', 
      value: profileStrength, 
      color: 'hsl(var(--gold))', 
      glowColor: 'hsl(var(--gold) / 0.4)' 
    },
    { 
      label: 'Properties', 
      value: propertyReadiness, 
      color: 'hsl(142 71% 45%)', 
      glowColor: 'hsl(142 71% 45% / 0.4)' 
    },
    { 
      label: 'Certification', 
      value: certificationProgress, 
      color: 'hsl(270 70% 55%)', 
      glowColor: 'hsl(270 70% 55% / 0.4)' 
    },
  ];

  if (showAIRing) {
    rings.push({
      label: 'AI Ready',
      value: aiReadiness,
      color: 'hsl(185 85% 55%)',
      glowColor: 'hsl(185 85% 55% / 0.4)',
    });
  }

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-6 sm:gap-10 lg:gap-14 py-6 px-4 rounded-2xl border border-border/40 bg-gradient-to-br from-card to-muted/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {rings.map((ring, index) => (
        <CircularProgress
          key={ring.label}
          value={ring.value}
          size={70}
          strokeWidth={5}
          color={ring.color}
          glowColor={ring.glowColor}
          label={ring.label}
          delay={0.2 + index * 0.15}
        />
      ))}
    </motion.div>
  );
}

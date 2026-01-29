import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MousePointer, Home, Shield, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStatsProps {
  profileViews: number;
  bookingClicks: number;
  propertyViews: number;
  certificationStatus: string;
  lowDataMessage?: string;
}

const statConfig = [
  { key: 'profileViews', label: 'Profile Views', icon: Eye, format: (v: number) => v.toLocaleString() },
  { key: 'bookingClicks', label: 'Booking Clicks', icon: MousePointer, format: (v: number) => v.toLocaleString() },
  { key: 'propertyViews', label: 'Property Views', icon: Home, format: (v: number) => v.toLocaleString() },
  { key: 'certificationStatus', label: 'Certification', icon: Shield, format: (v: string) => v },
];

export function QuickStats({
  profileViews,
  bookingClicks,
  propertyViews,
  certificationStatus,
  lowDataMessage,
}: QuickStatsProps) {
  const stats = { profileViews, bookingClicks, propertyViews, certificationStatus };

  return (
    <div className="space-y-4">
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {statConfig.map((stat, index) => {
          const value = stats[stat.key as keyof typeof stats];
          const isZero = typeof value === 'number' && value === 0;
          
          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={cn(
                "surface-panel p-4 sm:p-5 relative overflow-hidden group",
                "border border-border/60 rounded-xl bg-card",
                isZero && "opacity-60"
              )}
            >
              {/* Subtle gold glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="text-gold" size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">
                    {stat.label}
                  </p>
                  <p className={cn(
                    "text-lg sm:text-xl font-bold tracking-tight",
                    typeof value === 'string' && value === 'Certified' 
                      ? 'text-gold' 
                      : 'text-foreground'
                  )}>
                    {stat.format(value as any)}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Low data message */}
      {lowDataMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted/30 border border-border/40"
        >
          <Info size={14} className="text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">{lowDataMessage}</p>
        </motion.div>
      )}
    </div>
  );
}

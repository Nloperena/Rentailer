import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Camera, Sparkles, Shield, CheckCircle2 } from 'lucide-react';

interface WelcomeHeroProps {
  displayName: string;
  avatarUrl?: string | null;
  companyLogoUrl?: string | null;
  companyName?: string | null;
  market?: string | null;
  currentRank: string;
  tagline: string;
  xpTotal: number;
  xpToNextRank: number;
  nextRankXP: number;
  isCertified: boolean;
  certificationLevel?: string | null;
  isGoldCheck?: boolean;
  nextActionLabel?: string;
  nextActionHref?: string;
  nextActionXP?: number;
  nextActionExposure?: number;
}

export function WelcomeHero({
  displayName,
  avatarUrl,
  companyLogoUrl,
  companyName,
  market,
  currentRank,
  tagline,
  xpTotal,
  xpToNextRank,
  nextRankXP,
  isCertified,
  certificationLevel,
  isGoldCheck = false,
  nextActionLabel,
  nextActionHref,
  nextActionXP = 25,
  nextActionExposure = 8,
}: WelcomeHeroProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const firstName = displayName.split(' ')[0];
  const xpProgress = Math.min(100, (xpTotal / nextRankXP) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-gold/3 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left: Identity Block */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 flex-1 min-w-0">
            
            {/* Profile Photo */}
            <motion.div 
              className="shrink-0 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <a href="/profile" className="block relative group">
                {/* Glow effect */}
                <div 
                  className="absolute rounded-full pointer-events-none opacity-60"
                  style={{ 
                    inset: isCertified ? '-0.75rem' : '-0.5rem',
                    background: isCertified 
                      ? 'radial-gradient(circle at center, hsl(var(--gold)) 0%, hsl(var(--gold) / 0.15) 50%, transparent 75%)'
                      : 'radial-gradient(circle at center, hsl(var(--gold) / 0.3) 0%, hsl(var(--gold) / 0.08) 50%, transparent 75%)',
                    filter: 'blur(8px)',
                  }}
                />
                
                {/* Avatar */}
                <div 
                  className="relative rounded-3xl overflow-hidden flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 ring-1 ring-white/10 p-1 bg-background group-hover:ring-gold/50 transition-all"
                  style={{
                    boxShadow: isCertified
                      ? `0 4px 20px hsl(var(--gold) / 0.3)`
                      : `0 4px 12px rgba(0, 0, 0, 0.4)`,
                  }}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover object-center rounded-2xl" />
                  ) : (
                    <span className="text-sm sm:text-lg font-bold text-gold uppercase tracking-tighter">
                      {getInitials(displayName)}
                    </span>
                  )}
                </div>
                
                {/* Badge */}
                {isCertified ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.4 }}
                    className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-xl btn-gold text-primary-foreground flex items-center justify-center border border-gold/50 shadow-lg"
                  >
                    <Shield size={14} strokeWidth={3} />
                  </motion.div>
                ) : !avatarUrl && (
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-xl btn-gold text-primary-foreground flex items-center justify-center border border-gold/50 shadow-lg"
                  >
                    <Camera size={12} />
                  </motion.div>
                )}
              </a>
            </motion.div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-12 lg:h-16 bg-gradient-to-b from-transparent via-border/60 to-transparent" />

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h1 className="text-base sm:text-xl lg:text-3xl font-serif font-medium text-foreground tracking-tight leading-tight">
                  Welcome back, <span className="text-gradient-gold font-semibold">{firstName}<span className="tm">™</span></span>
                </h1>
                <p className="text-[10px] sm:text-xs font-black text-muted-foreground/60 uppercase tracking-[0.3em] mt-1.5 sm:mt-2">
                  Hospitality Intelligence & Strategy
                </p>
              </motion.div>

              {/* Meta info */}
              <motion.div 
                className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                {isCertified ? (
                  <Badge className="bg-gold/10 text-gold border-gold/20 font-black text-[9px] sm:text-[10px] uppercase tracking-widest px-2 sm:px-3 py-1">
                    <Shield size={10} className="mr-1.5" />
                    {certificationLevel === 'council' ? 'Council Elite' : 'Certified Host'}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-gold border-gold/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-1">
                    {currentRank}
                  </Badge>
                )}
                {(companyName || market) && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-border hidden sm:block" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-widest hidden sm:block opacity-60">
                      {[companyName, market].filter(Boolean).join(' • ')}
                    </span>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* Right: CTA + XP Progress */}
          <motion.div 
            className="shrink-0 flex flex-col items-start sm:items-end gap-4 sm:gap-6 w-full sm:w-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* XP Progress */}
            {!isCertified && (
              <div className="w-full sm:w-full lg:w-64 p-4 rounded-2xl bg-muted/20 border border-border/40">
                <div className="flex items-center justify-between text-[10px] mb-2 font-black uppercase tracking-widest">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Sparkles size={10} className="text-gold" />
                    {xpTotal} <span className="opacity-40">Authority XP</span>
                  </span>
                  <span className="text-gold">{xpToNextRank} to next</span>
                </div>
                <div className="relative w-full h-1.5 bg-background rounded-full overflow-hidden border border-border/20">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* CTA Button */}
            {nextActionLabel && nextActionHref && (
              <div className="w-full sm:w-auto sm:text-right">
                <a href={nextActionHref} className="block">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}>
                    <Button className="btn-gold shadow-xl shadow-gold/10 w-full sm:w-auto text-xs sm:text-sm text-primary-foreground font-black uppercase tracking-widest h-12 px-8 rounded-xl">
                      {nextActionLabel}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </a>
                {nextActionExposure > 0 && (
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-3 flex items-center gap-2 justify-center sm:justify-end opacity-60">
                    <Sparkles size={8} className="text-gold" />
                    +{nextActionExposure} Exposure Increase
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

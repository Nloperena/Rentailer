import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Building2, ShoppingBag, GraduationCap, Users, 
  BarChart3, Sparkles, User, Settings, X, Menu,
  Zap, Trophy, Target, Star, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
  color: string;
  xp?: number;
}

const navItems: NavItem[] = [
  { 
    id: 'dashboard', 
    label: 'Mission Control', 
    href: '/', 
    icon: Home,
    description: 'Your command center',
    color: 'from-gold/20 to-gold/5',
    xp: 0
  },
  { 
    id: 'properties', 
    label: 'Properties', 
    href: '/properties', 
    icon: Building2,
    description: 'Manage your portfolio',
    color: 'from-gold/20 to-gold/5',
    xp: 50
  },
  { 
    id: 'marketplace', 
    label: 'Marketplace', 
    href: '/marketplace', 
    icon: ShoppingBag,
    description: 'Discover & connect',
    color: 'from-gold/20 to-gold/5',
    xp: 25
  },
  { 
    id: 'learning', 
    label: 'Academy', 
    href: '/learning', 
    icon: GraduationCap,
    description: 'Level up your skills',
    color: 'from-gold/20 to-gold/5',
    xp: 100
  },
  { 
    id: 'analytics', 
    label: 'Insights', 
    href: '/analytics', 
    icon: BarChart3,
    description: 'Track performance',
    color: 'from-gold/20 to-gold/5',
    xp: 40
  },
  { 
    id: 'jaine', 
    label: 'JAiNE', 
    href: '/jaine', 
    icon: Sparkles,
    description: 'AI assistant',
    color: 'from-gold/30 to-gold/10',
    xp: 0
  },
];

const secondaryItems: NavItem[] = [
  { 
    id: 'profile', 
    label: 'Profile', 
    href: '/profile', 
    icon: User,
    description: 'Your identity',
    color: 'from-slate-500/20 to-slate-500/5'
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'Preferences',
    color: 'from-slate-500/20 to-slate-500/5'
  },
];

// Floating particle component
function FloatingParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-gold/30"
      initial={{ 
        x: Math.random() * 100 - 50, 
        y: Math.random() * 100,
        opacity: 0 
      }}
      animate={{ 
        y: [null, -200],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
    />
  );
}

// XP Bar component
function XPBar({ current, max, level }: { current: number; max: number; level: number }) {
  const percentage = (current / max) * 100;
  
  return (
    <motion.div 
      className="flex items-center gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center gap-2">
        <motion.div 
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Trophy className="w-5 h-5 text-black" />
        </motion.div>
        <div>
          <p className="text-xs text-muted-foreground">Level</p>
          <p className="text-lg font-bold text-gold">{level}</p>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">XP Progress</span>
          <span className="text-gold">{current} / {max}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-gold to-amber-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Nav item card component
function NavCard({ item, index, onNavigate }: { 
  item: NavItem; 
  index: number;
  onNavigate: (href: string) => void;
}) {
  const Icon = item.icon;
  
  return (
    <motion.a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.href);
      }}
      className={cn(
        "relative group block p-5 rounded-2xl border border-border/60",
        "bg-card hover:bg-gold/5 transition-all duration-300",
        "overflow-hidden shadow-xl hover:border-gold/40"
      )}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ 
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      whileHover={{ 
        y: -4,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--gold) / 0.05) 0%, transparent 70%)'
        }}
      />
      
      {/* Icon with animation */}
      <motion.div 
        className="relative z-10 flex items-start gap-5"
      >
        <motion.div 
          className="w-14 h-14 rounded-2xl bg-background border border-border/60 flex items-center justify-center shadow-inner group-hover:border-gold/30 transition-colors"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Icon className="w-7 h-7 text-gold" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="font-bold text-foreground text-lg tracking-tight truncate">{item.label}</h3>
            {item.xp && item.xp > 0 && (
              <motion.span 
                className="text-[9px] px-2 py-0.5 rounded-full bg-gold/10 text-gold font-black uppercase tracking-widest border border-gold/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.3, type: "spring" }}
              >
                +{item.xp} XP
              </motion.span>
            )}
          </div>
          <p className="text-sm text-muted-foreground font-medium truncate opacity-80 group-hover:opacity-100 transition-opacity">{item.description}</p>
        </div>
        
        {/* Action indicator */}
        <motion.div 
          className="w-8 h-8 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 border border-gold/20 shadow-lg transition-all"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <ArrowRight className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

export function GameNav({ currentPath = '/' }: { currentPath?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  
  // Mock user data
  const userData = {
    name: 'Nicholas',
    level: 3,
    currentXP: 1250,
    maxXP: 2000,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  };

  const handleNavigate = (href: string) => {
    setNavigating(true);
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  };

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Floating Menu Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed top-4 left-4 z-50 w-14 h-14 rounded-2xl",
          "bg-gradient-to-br from-gold to-amber-600",
          "flex items-center justify-center",
          "shadow-lg shadow-gold/25",
          "md:hidden"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Menu className="w-6 h-6 text-black" />
      </motion.button>

      {/* Desktop Sidebar Trigger */}
      <motion.div 
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 flex-col items-center py-6 bg-card/50 backdrop-blur-sm border-r border-border z-40"
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Logo */}
        <motion.a 
          href="/"
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center mb-8"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-black font-bold text-lg">R</span>
        </motion.a>

        {/* Quick nav icons */}
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.slice(0, 6).map((item, i) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href || 
              (item.href !== '/' && currentPath.startsWith(item.href));
            
            return (
              <motion.a
                key={item.id}
                href={item.href}
                className={cn(
                  "relative w-12 h-12 rounded-xl flex items-center justify-center",
                  "transition-colors group",
                  isActive ? "bg-gold/20 text-gold" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div 
                    className="absolute left-0 w-1 h-6 bg-gold rounded-r-full"
                    layoutId="activeIndicator"
                  />
                )}
                
                {/* Tooltip */}
                <motion.div 
                  className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-card border border-border shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              </motion.a>
            );
          })}
        </nav>

        {/* Expand button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Full Screen Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-background/98 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              {[...Array(20)].map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.3} />
              ))}
            </div>

            {/* Content */}
            <motion.div 
              className={cn(
                "relative z-10 h-full overflow-auto custom-scrollbar",
                "px-6 py-12 md:px-24 md:py-24",
                navigating && "pointer-events-none"
              )}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-16">
                <motion.div 
                  className="flex items-center gap-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div className="relative">
                    <motion.img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-20 h-20 rounded-3xl object-cover ring-1 ring-gold/30 p-1 bg-card shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl btn-gold flex items-center justify-center border border-gold/50 shadow-lg">
                      <span className="text-[10px] font-black text-primary-foreground">{userData.level}</span>
                    </div>
                  </motion.div>
                  <div>
                    <h2 className="heading-section text-foreground mb-1">
                      Welcome back, {userData.name}<span className="tm">™</span>
                    </h2>
                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Strategic Command Interface</p>
                  </div>
                </motion.div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-14 h-14 rounded-2xl bg-card border border-border/60 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-all shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                >
                  <X className="w-7 h-7" />
                </motion.button>
              </div>

              {/* XP Bar */}
              <div className="mb-16 max-w-xl">
                <div className="p-6 rounded-3xl bg-card/50 border border-border/40 backdrop-blur-sm shadow-inner">
                  <XPBar 
                    current={userData.currentXP} 
                    max={userData.maxXP} 
                    level={userData.level} 
                  />
                </div>
              </div>

              {/* Main Navigation Grid */}
              <div className="mb-16">
                <motion.div 
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-1 h-4 bg-gold rounded-full" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Strategic Sections</h3>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {navItems.map((item, index) => (
                    <NavCard 
                      key={item.id} 
                      item={item} 
                      index={index}
                      onNavigate={handleNavigate}
                    />
                  ))}
                </div>
              </div>

              {/* Secondary Navigation */}
              <div>
                <motion.div 
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="w-1 h-4 bg-muted rounded-full" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Intelligence & Settings</h3>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {secondaryItems.map((item, index) => (
                    <NavCard 
                      key={item.id} 
                      item={item} 
                      index={index + navItems.length}
                      onNavigate={handleNavigate}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Stats Footer */}
              <motion.div 
                className="mt-20 flex flex-wrap gap-10 p-8 rounded-3xl bg-card/30 border border-border/40"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                    <Star className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">2</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Active Properties</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Target className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">12%</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Profile Authority</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <Zap className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">3</p>
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Active Objectives</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default GameNav;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Trophy, Target, Star, ChevronRight, ArrowRight,
  Sparkles, TrendingUp, Calendar, MessageCircle,
  Crown, Shield, Gem, Flame, Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Player stats card
function PlayerCard() {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div 
      className="relative overflow-hidden rounded-2xl bg-card border border-border/60 p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      
      <div className="relative z-10">
        {/* Header with avatar and level */}
        <div className="flex items-start gap-6 mb-8">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-24 h-24 rounded-2xl object-cover ring-1 ring-gold/30 p-1 bg-background"
            />
            {/* Level badge */}
            <motion.div 
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl btn-gold flex items-center justify-center shadow-lg border border-gold/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <span className="text-sm font-bold text-primary-foreground">3</span>
            </motion.div>
          </motion.div>
          
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="heading-section text-foreground leading-tight">
                Nicholas Miller<span className="tm">™</span>
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest border border-gold/20">
                  Candidate
                </span>
                <span className="text-muted-foreground text-sm font-medium tracking-tight">Miller Stays</span>
              </div>
            </motion.div>
          </div>

          {/* Daily streak */}
          <motion.div 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-muted/30 border border-border/60 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <Flame className="w-6 h-6 text-gold" />
            <div>
              <p className="text-xs font-bold text-gold uppercase tracking-wider">7 Day</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Streak</p>
            </div>
          </motion.div>
        </div>

        {/* XP Progress */}
        <div className="mb-8 p-6 rounded-2xl bg-muted/20 border border-border/40">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Experience Points</span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold fill-gold/20" />
              <span className="text-gold font-bold tracking-tight">1,250 <span className="text-muted-foreground/50 font-medium">/ 2,000 XP</span></span>
            </div>
          </div>
          <div className="relative h-2.5 bg-background rounded-full overflow-hidden border border-border/20">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              initial={{ width: 0 }}
              animate={{ width: '62.5%' }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            />
          </div>
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-3 flex justify-center">
            750 XP to Level 4
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <QuickStat icon={Star} label="Properties" value="2" />
          <QuickStat icon={Trophy} label="Rank" value="#42" />
          <QuickStat icon={Target} label="Profile" value="12%" />
        </div>
      </div>
    </motion.div>
  );
}

function QuickStat({ icon: Icon, label, value }: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <motion.div 
      className="p-4 rounded-2xl bg-card border border-border/60 hover:border-gold/30 transition-all duration-300 group"
      whileHover={{ y: -4 }}
    >
      <Icon className="w-5 h-5 mb-3 text-gold transition-transform group-hover:scale-110" />
      <p className="text-xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{label}</p>
    </motion.div>
  );
}

// Quest/Mission card
interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  progress?: number;
  maxProgress?: number;
  type: 'daily' | 'weekly' | 'main';
  icon: React.ElementType;
}

const quests: Quest[] = [
  {
    id: '1',
    title: 'Complete Your Profile',
    description: 'Add a bio and profile photo',
    xp: 50,
    progress: 1,
    maxProgress: 3,
    type: 'main',
    icon: Shield
  },
  {
    id: '2',
    title: 'Add Your First Property',
    description: 'List a property to unlock insights',
    xp: 100,
    type: 'main',
    icon: Crown
  },
  {
    id: '3',
    title: 'Complete a Lesson',
    description: 'Finish any lesson in the Academy',
    xp: 25,
    type: 'daily',
    icon: Award
  },
];

function QuestCard({ quest, index }: { quest: Quest; index: number }) {
  const Icon = quest.icon;
  
  return (
    <motion.a
      href={quest.id === '1' ? '/profile' : quest.id === '2' ? '/properties' : '/learning'}
      className="block group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center gap-5 p-5 rounded-2xl bg-card border border-border/60 hover:border-gold/40 transition-all duration-300 group shadow-sm">
        {/* Quest icon */}
        <motion.div 
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/20"
          )}
          whileHover={{ rotate: [0, -10, 10, 0] }}
        >
          <Icon className={cn(
            "w-6 h-6 text-gold"
          )} />
        </motion.div>

        {/* Quest info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h4 className="font-bold text-foreground truncate tracking-tight">{quest.title}</h4>
            <span className={cn(
              "text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest bg-gold/10 text-gold border border-gold/20"
            )}>
              {quest.type === 'main' ? 'Elite' : quest.type === 'daily' ? 'Daily' : 'Weekly'}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-medium truncate">{quest.description}</p>
          
          {/* Progress bar */}
          {quest.progress !== undefined && quest.maxProgress && (
            <div className="mt-3">
              <div className="h-1.5 bg-background rounded-full overflow-hidden border border-border/20">
                <motion.div 
                  className="h-full bg-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                />
              </div>
              <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1.5">{quest.progress} / {quest.maxProgress} completed</p>
            </div>
          )}
        </div>

        {/* XP reward */}
        <div className="flex flex-col items-end gap-2">
          <motion.div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold/10 border border-gold/20"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-3.5 h-3.5 text-gold fill-gold/20" />
            <span className="text-xs font-bold text-gold">+{quest.xp}</span>
          </motion.div>
          <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-gold group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.a>
  );
}

function QuestBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-5"
    >
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-gold" />
          </div>
          <h3 className="text-lg font-bold text-foreground tracking-tight uppercase">Active Quests</h3>
        </div>
        <a href="/quests" className="text-[10px] font-black text-gold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">View All</a>
      </div>
      
      <div className="space-y-3">
        {quests.map((quest, i) => (
          <QuestCard key={quest.id} quest={quest} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

// Activity feed with achievements
function ActivityFeed() {
  const activities = [
    { id: 1, type: 'xp', message: 'Earned 25 XP for logging in', time: '2h ago', icon: Zap },
    { id: 2, type: 'achievement', message: 'Unlocked "Early Bird" badge', time: '1d ago', icon: Award },
    { id: 3, type: 'level', message: 'Reached Level 3!', time: '3d ago', icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-5"
    >
      <div className="flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-gold" />
        </div>
        <h3 className="text-lg font-bold text-foreground tracking-tight uppercase">Recent Activity</h3>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <motion.div 
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60 hover:border-gold/30 transition-all group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/20"
              )}>
                <Icon className={cn(
                  "w-5 h-5 text-gold group-hover:scale-110 transition-transform"
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate tracking-tight">{activity.message}</p>
                <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest mt-1">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Quick action buttons
function QuickActions() {
  const actions = [
    { id: 'jaine', label: 'Ask JAiNE', href: '/jaine', icon: Sparkles, color: 'from-gold to-gold-dark' },
    { id: 'learn', label: 'Academy', href: '/learning', icon: Award, color: 'from-gold/20 to-gold/10' },
    { id: 'calendar', label: 'Calendar', href: '/calendar', icon: Calendar, color: 'from-gold/20 to-gold/10' },
  ];

  return (
    <motion.div 
      className="grid grid-cols-3 gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <motion.a
            key={action.id}
            href={action.href}
            className={cn(
              "relative overflow-hidden p-4 rounded-2xl",
              "bg-gradient-to-br", action.color,
              "flex flex-col items-center justify-center text-center",
              "min-h-[100px] border border-gold/10 hover:border-gold/30 transition-all",
              action.id === 'jaine' ? "text-primary-foreground" : "text-foreground"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={cn("w-6 h-6 mb-2", action.id === 'jaine' ? "text-primary-foreground" : "text-gold")} />
            <span className="text-sm font-bold uppercase tracking-wider">{action.label}</span>
            
            {/* Shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
        );
      })}
    </motion.div>
  );
}

export function GameDashboard() {
  return (
    <div className="space-y-6">
      {/* Hero greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2"
      >
        <h1 className="text-3xl font-serif text-foreground">Mission Control</h1>
        <p className="text-muted-foreground">Ready to level up today?</p>
      </motion.div>

      {/* Player stats */}
      <PlayerCard />

      {/* Quick actions */}
      <QuickActions />

      {/* Two column layout for quest board and activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuestBoard />
        <ActivityFeed />
      </div>
    </div>
  );
}

export default GameDashboard;



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Building2, ShoppingBag, GraduationCap, Users, 
  BarChart3, Sparkles, Settings,
  ChevronRight, LogOut, User, Bell, Shield, CreditCard,
  Moon, Sun, Circle, Edit3, CheckCircle2, ListTodo
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { id: 'properties', label: 'Properties', href: '/properties', icon: Building2, badge: 2 },
  { id: 'marketplace', label: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { id: 'learning', label: 'Academy', href: '/learning', icon: GraduationCap },
];

const bottomNavItems: NavItem[] = [
  { id: 'analytics', label: 'Insights', href: '/analytics', icon: BarChart3 },
  { id: 'jaine', label: 'JAiNE', href: '/jaine', icon: Sparkles },
];

// User data (mock)
const userData = {
  name: 'Nicholas Miller',
  username: 'nicholas',
  email: 'nicholas@rentalier.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  status: 'online' as 'online' | 'idle' | 'dnd' | 'offline',
  level: 3,
  xp: 1250,
  maxXP: 2000,
  company: 'Miller Stays',
  rank: 'Candidate',
};

const statusColors = {
  online: 'bg-emerald-500',
  idle: 'bg-amber-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
};

// User Panel Component (Discord-style bottom panel)
function UserPanel() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="relative">
      {/* Profile Card Popup */}
      <AnimatePresence>
        {showProfile && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
            />
            
            {/* Profile Card */}
            <motion.div
              className="absolute bottom-full left-0 right-0 mb-4 mx-3 bg-card border border-border/60 rounded-[2rem] shadow-2xl overflow-hidden z-50 p-6 space-y-6"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
            >
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-20 h-20 rounded-3xl object-cover ring-2 ring-gold/30 p-1 bg-background shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl btn-gold flex items-center justify-center border border-gold/50 shadow-lg">
                    <span className="text-[10px] font-black text-primary-foreground">{userData.level}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{userData.name}<span className="tm">™</span></h3>
                  <p className="text-[10px] text-gold font-black uppercase tracking-widest mt-1">{userData.rank} • {userData.company}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-end px-1">
                  <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">Authority Progress</span>
                  <span className="text-[10px] text-gold font-black">{userData.xp} / {userData.maxXP} XP</span>
                </div>
                <div className="h-1.5 bg-background rounded-full overflow-hidden border border-border/20">
                  <motion.div 
                    className="h-full bg-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(userData.xp / userData.maxXP) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-muted/30 border border-border/60 text-xs font-bold text-foreground hover:bg-gold/10 transition-colors group">
                  <User className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                  Profile
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-muted/30 border border-border/60 text-xs font-bold text-foreground hover:bg-gold/10 transition-colors group">
                  <Settings className="w-4 h-4 text-gold group-hover:rotate-90 transition-transform" />
                  Settings
                </button>
              </div>

              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-destructive/5 border border-destructive/10 text-xs font-bold text-destructive hover:bg-destructive/10 transition-all">
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Panel Bar */}
      <div className="bg-muted/30 border-t border-border/60 p-3">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-gold/5 transition-all group border border-transparent hover:border-gold/10"
        >
          <div className="relative flex-shrink-0">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10 group-hover:ring-gold/50 transition-all shadow-md"
            />
            <div className={cn(
              "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-muted",
              statusColors[userData.status]
            )} />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-bold text-foreground leading-tight tracking-tight">{userData.name}</p>
            <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest opacity-60">Level {userData.level} Strategist</p>
          </div>
        </button>
      </div>
    </div>
  );
}

function MenuLink({ href, icon: Icon, label, badge }: { 
  href: string; 
  icon: React.ElementType; 
  label: string;
  badge?: number;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors group"
    >
      <Icon className="w-4 h-4 text-gold/70 group-hover:text-gold transition-colors" />
      <span className="flex-1 text-sm">{label}</span>
      {badge && (
        <span className="px-1.5 py-0.5 rounded bg-gold text-primary-foreground text-[10px] font-bold">
          {badge}
        </span>
      )}
      <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-gold/50 transition-all" />
    </a>
  );
}

function StatusButton({ status, current }: { status: string; current: string }) {
  const labels = { online: 'Online', idle: 'Idle', dnd: 'DND', offline: 'Invisible' };
  const isActive = status === current;
  
  return (
    <button
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded transition-colors",
        isActive ? "bg-white/10" : "hover:bg-white/5"
      )}
    >
      <div className={cn("w-3 h-3 rounded-full", statusColors[status as keyof typeof statusColors])} />
      <span className="text-[10px] text-gray-400">{labels[status as keyof typeof labels]}</span>
    </button>
  );
}

// Main Navigation Component
export function DiscordNav({ currentPath = '/' }: { currentPath?: string }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isToDoCompleted, setIsToDoCompleted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (stored) setTheme(stored);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] flex-col bg-background z-40 border-r border-border/60"
    >
      {/* Header */}
      <div className="h-14 px-5 flex items-center justify-between border-b border-border/60 bg-background/50 backdrop-blur-md">
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20 group-hover:scale-110 transition-transform">
            <span className="text-primary-foreground font-bold text-sm">R</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground tracking-tight leading-none">Rentalier</span>
            <span className="text-[9px] text-gold font-black uppercase tracking-widest mt-0.5">Community</span>
          </div>
        </a>
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all active:scale-95"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-3 custom-scrollbar overflow-y-auto">
        <div className="space-y-6">
          {/* Temporary To Do Section */}
          {!isToDoCompleted && (
            <div className="space-y-2">
              <p className="px-3 text-[9px] font-black text-gold uppercase tracking-[0.2em]">Immediate</p>
              <a
                href="/"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group relative overflow-hidden",
                  currentPath === '/' 
                    ? "bg-gold/10 text-foreground border border-gold/20" 
                    : "bg-muted/20 text-muted-foreground hover:bg-gold/5 hover:text-gold border border-transparent"
                )}
              >
                <ListTodo className={cn(
                  "w-5 h-5 transition-colors",
                  currentPath === '/' ? "text-gold" : "group-hover:text-gold"
                )} />
                <span className="flex-1 text-sm font-black uppercase tracking-widest">To Do:</span>
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
              </a>
            </div>
          )}

          {/* Main Strategic Section */}
          <div className="space-y-1">
            <p className="px-3 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 opacity-50 text-center">Portfolio Management</p>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href || 
                (item.href !== '/' && currentPath.startsWith(item.href));
              
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden",
                    isActive 
                      ? "bg-gold/10 text-foreground" 
                      : "text-muted-foreground hover:bg-gold/5 hover:text-gold"
                  )}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    />
                  )}
                  <Icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-gold" : "group-hover:text-gold-light"
                  )} />
                  <span className="flex-1 text-sm font-bold tracking-tight">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-gold text-primary-foreground text-[10px] font-black shadow-lg shadow-gold/20">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-auto pt-6 space-y-1 border-t border-border/40">
          <p className="px-3 text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 opacity-50 text-center">Intelligence & Network</p>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href || 
              (item.href !== '/' && currentPath.startsWith(item.href));
            
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative overflow-hidden",
                  isActive 
                    ? "bg-gold/10 text-foreground" 
                    : "text-muted-foreground hover:bg-gold/5 hover:text-gold"
                )}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  />
                )}
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-gold" : "group-hover:text-gold-light"
                )} />
                <span className="flex-1 text-sm font-bold tracking-tight">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* User Panel */}
      <UserPanel />
    </aside>
  );
}

export default DiscordNav;


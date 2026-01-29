import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Building2, ShoppingBag, GraduationCap, Users, 
  BarChart3, Sparkles, Settings,
  ChevronRight, LogOut, User, Bell, Shield, CreditCard,
  Moon, Sun, Circle, Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Mission Control', href: '/', icon: Home },
  { id: 'properties', label: 'Properties', href: '/properties', icon: Building2, badge: 2 },
  { id: 'marketplace', label: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
  { id: 'learning', label: 'Academy', href: '/learning', icon: GraduationCap },
  { id: 'community', label: 'Guild', href: '/community', icon: Users },
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
};

const statusColors = {
  online: 'bg-emerald-500',
  idle: 'bg-amber-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
};

// User Panel Component (Discord-style bottom panel)
function UserPanel() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      {/* User Menu Popup */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="absolute bottom-full left-0 right-0 mb-2 mx-2 bg-card border border-border/60 rounded-xl shadow-2xl overflow-hidden z-50"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
            >
              {/* User Header */}
              <div className="p-4 bg-gradient-to-br from-gold/10 via-transparent to-transparent">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={userData.avatar}
                      alt={userData.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                    />
                    <div className={cn(
                      "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-card",
                      statusColors[userData.status]
                    )} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight">{userData.name}</h3>
                    <p className="text-xs text-muted-foreground">@{userData.username}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider border border-gold/20">
                        Level {userData.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <MenuLink href="/profile" icon={User} label="Profile" />
                <MenuLink href="/settings" icon={Settings} label="Settings" />
                <MenuLink href="/settings#notifications" icon={Bell} label="Notifications" badge={3} />
                <MenuLink href="/settings#billing" icon={CreditCard} label="Subscription" />
                
                <div className="h-px bg-border/60 my-2 mx-2" />
                
                {/* Status Selector */}
                <div className="px-3 py-1.5">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-3">Presence</p>
                  <div className="grid grid-cols-4 gap-2">
                    <StatusButton status="online" current={userData.status} />
                    <StatusButton status="idle" current={userData.status} />
                    <StatusButton status="dnd" current={userData.status} />
                    <StatusButton status="offline" current={userData.status} />
                  </div>
                </div>

                <div className="h-px bg-border/60 my-2 mx-2" />
                
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 text-destructive transition-all text-left group">
                  <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Panel Bar */}
      <div className="bg-muted/30 border-t border-border/60 p-3">
        <div className="flex items-center gap-3">
          {/* Avatar & Info */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex-1 flex items-center gap-3 p-1 rounded-lg hover:bg-white/5 transition-all group"
          >
            <div className="relative flex-shrink-0">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-white/10 group-hover:ring-gold/50 transition-all"
              />
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-muted",
                statusColors[userData.status]
              )} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-bold text-foreground leading-none mb-1">{userData.name}</p>
              <p className="text-[10px] text-muted-foreground font-medium">Level {userData.level} • {userData.xp} XP</p>
            </div>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <a
              href="/settings"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-white/5 transition-colors border border-transparent hover:border-gold/10 active:scale-95"
            >
              <Settings className="w-4 h-4" />
            </a>
          </div>
        </div>
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
      <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        <div className="space-y-1">
          {navItems.map((item) => {
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

      </nav>

      {/* User Panel */}
      <UserPanel />
    </aside>
  );
}

export default DiscordNav;


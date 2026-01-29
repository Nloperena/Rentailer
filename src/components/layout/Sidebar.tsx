import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Globe, 
  BookOpen, 
  User,
  Settings,
  BarChart3,
  Users,
  Sparkles,
  Building2,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

const mainNavItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Building2, label: 'Properties', href: '/properties' },
  { icon: Globe, label: 'Marketplace', href: '/marketplace' },
  { icon: BookOpen, label: 'Learning', href: '/learning' },
  { icon: Users, label: 'Community', href: '/community' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Sparkles, label: 'JAiNE', href: '/jaine' },
];

const bottomNavItems = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar min-h-screen flex flex-col fixed left-0 top-0 z-50 hidden lg:flex">
      <div className="p-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 mb-8 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center font-bold text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl text-sidebar-foreground tracking-tight leading-none">
              Rentalier<span className="tm">™</span>
            </span>
            <span className="text-[9px] text-sidebar-foreground/50 uppercase font-bold tracking-[0.2em] mt-1">
              Professional
            </span>
          </div>
        </a>
        
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center justify-between group px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive 
                    ? "bg-sidebar-primary/10 text-sidebar-primary shadow-sm" 
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon 
                    size={18} 
                    className={cn(
                      "transition-colors", 
                      isActive ? "text-sidebar-primary" : "group-hover:text-sidebar-primary/70"
                    )} 
                  />
                  {item.label}
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-sidebar-primary shadow-[0_0_8px_hsl(var(--sidebar-primary)/0.8)]" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-auto p-6 border-t border-sidebar-border/50">
        {/* Bottom Nav Items */}
        <nav className="space-y-1 mb-6">
          {bottomNavItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive
                    ? "bg-sidebar-primary/10 text-sidebar-primary" 
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon 
                  size={18} 
                  className={cn(
                    "transition-all", 
                    isActive ? "text-sidebar-primary" : "group-hover:rotate-12"
                  )} 
                />
                {item.label}
              </a>
            );
          })}
        </nav>
        
        {/* Theme Toggle + User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent border border-sidebar-border flex items-center justify-center text-[10px] font-bold text-sidebar-foreground">
              NM
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-sidebar-foreground truncate">Nicholas Miller</span>
              <span className="text-[9px] text-sidebar-foreground/50 font-bold uppercase tracking-widest truncate">
                Candidate
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

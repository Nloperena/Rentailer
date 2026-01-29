import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, BookOpen, User, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Building2, label: 'Properties', href: '/properties' },
  { icon: BookOpen, label: 'Learn', href: '/learning' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function AppDock() {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="app-dock safe-area-bottom border-t border-border/60 bg-background/80 backdrop-blur-xl">
      {navItems.map((item) => {
        const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
        return (
          <a
            key={item.label}
            href={item.href}
            className={cn("app-dock-item flex flex-col items-center gap-1.5 transition-all", isActive ? "text-gold" : "text-muted-foreground hover:text-foreground")}
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="relative"
            >
              <item.icon size={22} className={cn("transition-colors", isActive ? "text-gold" : "text-muted-foreground")} />
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  style={{ backgroundColor: 'hsl(var(--gold))' }}
                />
              )}
            </motion.div>
            <span className="text-[9px] font-black uppercase tracking-[0.15em]">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}

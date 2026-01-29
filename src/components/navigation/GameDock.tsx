import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Building2, GraduationCap, BarChart3, User,
  Sparkles, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

const dockItems: DockItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: Home, color: 'text-gold' },
  { id: 'properties', label: 'Properties', href: '/properties', icon: Building2, color: 'text-gold' },
  { id: 'add', label: 'Add', href: '/properties/new', icon: Plus, color: 'text-primary-foreground' },
  { id: 'learn', label: 'Learn', href: '/learning', icon: GraduationCap, color: 'text-gold' },
  { id: 'profile', label: 'Profile', href: '/profile', icon: User, color: 'text-gold' },
];

function DockIcon({ item, isActive, onHover }: { 
  item: DockItem; 
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  const Icon = item.icon;
  const isAddButton = item.id === 'add';
  
  return (
    <motion.a
      href={item.href}
      className={cn(
        "relative flex flex-col items-center justify-center",
        isAddButton ? "w-16 -mt-6" : "w-14"
      )}
      onHoverStart={() => onHover(item.id)}
      onHoverEnd={() => onHover(null)}
      whileTap={{ scale: 0.9 }}
    >
      {/* Glow effect for active state */}
      {isActive && !isAddButton && (
        <motion.div
          className="absolute -inset-2 rounded-full bg-gold/20 blur-lg"
          layoutId="activeGlow"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      
      {/* Icon container */}
      <motion.div
        className={cn(
          "relative flex items-center justify-center",
          isAddButton 
            ? "w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark shadow-lg shadow-gold/30 border border-gold/50"
            : "w-12 h-12 rounded-xl",
          !isAddButton && isActive && "bg-gold/10",
          !isAddButton && !isActive && "bg-transparent"
        )}
        whileHover={{ 
          scale: isAddButton ? 1.1 : 1.15,
          y: isAddButton ? -4 : -8,
        }}
        animate={{
          y: isActive && !isAddButton ? -4 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Icon 
          className={cn(
            "w-6 h-6 transition-colors",
            isAddButton ? "text-black" : isActive ? item.color : "text-muted-foreground"
          )} 
        />
        
        {/* Pulse animation for add button */}
        {isAddButton && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gold/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>
      
      {/* Label */}
      <AnimatePresence>
        {!isAddButton && (
          <motion.span 
            className={cn(
              "text-[10px] mt-1 font-medium",
              isActive ? "text-gold" : "text-muted-foreground"
            )}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
      
      {/* Active dot indicator */}
      {isActive && !isAddButton && (
        <motion.div
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-gold"
          layoutId="activeDot"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.a>
  );
}

export function GameDock({ currentPath = '/' }: { currentPath?: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const getIsActive = (item: DockItem) => {
    if (item.id === 'add') return false;
    if (item.href === '/') return currentPath === '/';
    return currentPath.startsWith(item.href);
  };

  return (
    <>
      {/* Safe area spacer */}
      <div className="h-24 md:hidden" />
      
      {/* Dock container */}
      <motion.nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 md:hidden",
          "pb-safe"
        )}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Background blur */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        
        {/* Dock items */}
        <div className="relative flex items-end justify-around px-2 pt-2 pb-2">
          {dockItems.map((item) => (
            <DockIcon
              key={item.id}
              item={item}
              isActive={getIsActive(item)}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </motion.nav>

      {/* JAiNE Floating Button - appears on mobile when not on jaine page */}
      {currentPath !== '/jaine' && (
        <motion.a
          href="/jaine"
          className={cn(
            "fixed right-4 bottom-28 z-40 md:bottom-4",
            "w-14 h-14 rounded-2xl",
            "bg-gradient-to-br from-gold to-gold-dark",
            "flex items-center justify-center",
            "shadow-lg shadow-gold/25",
            "backdrop-blur-sm border border-gold/50"
          )}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-6 h-6 text-black" />
          </motion.div>
          
          {/* Notification dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-[8px] font-bold text-white">1</span>
          </motion.div>
        </motion.a>
      )}
    </>
  );
}

export default GameDock;



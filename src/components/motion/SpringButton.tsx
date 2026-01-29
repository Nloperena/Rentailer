import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpringButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'jewel' | 'ghost' | 'outline';
  className?: string;
}

export function SpringButton({ 
  children, 
  variant = 'jewel', 
  className, 
  ...props 
}: SpringButtonProps) {
  const variants = {
    jewel: 'jewel-button',
    ghost: 'text-zinc-500 hover:text-charcoal px-4 py-2 transition-colors',
    outline: 'border border-zinc-200 text-charcoal hover:bg-zinc-50 px-6 py-3 rounded-full transition-all'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(variants[variant], className)}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}




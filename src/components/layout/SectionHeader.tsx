import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, className, children }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-8 group", className)}>
      <div className="flex items-center gap-3">
        <div className="w-1 h-4 bg-gold rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
        <h2 className="text-lg font-bold text-foreground tracking-tight uppercase">{title}</h2>
      </div>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
}





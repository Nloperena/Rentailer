import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-3 mb-10 relative", className)}>
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
        <h1 className="heading-section text-foreground leading-tight">{title}</h1>
      </div>
      {description && (
        <p className="text-muted-foreground max-w-2xl text-sm font-medium leading-relaxed border-l border-border/40 pl-4 ml-0.5">
          {description}
        </p>
      )}
    </div>
  );
}

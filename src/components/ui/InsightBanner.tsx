import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface InsightBannerProps {
  title: string;
  description: string;
  actionLabel?: string;
}

export function InsightBanner({ title, description, actionLabel = "Ask JAiNE for details" }: InsightBannerProps) {
  return (
    <div className="p-8 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex flex-col justify-center items-center text-center space-y-4">
      <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
        <Info className="text-orange-500" size={24} />
      </div>
      <div className="space-y-2">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-sm text-zinc-400 max-w-xs">{description}</p>
      </div>
      <Button variant="outline" size="sm">{actionLabel}</Button>
    </div>
  );
}





import React, { useState } from 'react';
import { Plus, Home, MapPin, Settings2, BarChart3, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpringButton } from '../motion/SpringButton';
import { FadeIn, StaggerContainer } from '../motion/MotionWrapper';
import { BottomSheet } from '../ui/BottomSheet';
import { JaineFieldHelper } from '../ui/JaineFieldHelper';
import { routes } from '@/lib/routes';

const mockProperties = [
  { id: '1', name: 'Sunset Beach House', location: 'Destin, FL', status: 'Published', views: 1240, bookings: 12, description: '' },
  { id: '2', name: 'Lakeside Retreat', location: 'Lake Tahoe, CA', status: 'Draft', views: 0, bookings: 0, description: '' },
];

export function PortfolioManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [desc, setDesc] = useState('');

  return (
    <StaggerContainer className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <FadeIn className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
            <h1 className="heading-section text-foreground leading-tight">Market Hub</h1>
          </div>
          <p className="text-muted-foreground font-medium leading-relaxed italic opacity-80 max-w-md border-l border-border/40 pl-4">"Your portfolio is your promise."</p>
        </FadeIn>
        
        <FadeIn>
          <SpringButton onClick={() => setIsAdding(true)} className="gap-2 btn-gold text-primary-foreground font-bold uppercase tracking-widest px-8">
            <Plus size={20} /> Add Asset
          </SpringButton>
        </FadeIn>
      </div>

      {/* Stats Quick Bar */}
      <FadeIn className="grid grid-cols-3 gap-4 bg-muted/20 p-2 rounded-3xl border border-border/40 backdrop-blur-sm shadow-inner">
        {[
          { label: 'Strategic Assets', value: '2', icon: Home },
          { label: 'Operational Reach', value: '4.2k', icon: Globe },
          { label: 'Authority XP', value: '82', icon: BarChart3 },
        ].map(s => (
          <div key={s.label} className="bg-card/50 rounded-2xl p-5 text-center space-y-1 shadow-sm border border-border/40 group hover:bg-gold/5 transition-all">
            <p className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-[0.2em]">{s.label}</p>
            <p className="text-2xl font-bold text-foreground tracking-tighter group-hover:text-gold transition-colors">{s.value}</p>
          </div>
        ))}
      </FadeIn>

      <div className="grid gap-6">
        {mockProperties.map((prop) => (
          <FadeIn key={prop.id} className="surface-panel group hover:border-gold/40 cursor-pointer p-6 relative overflow-hidden transition-all duration-300 shadow-xl" onClick={() => setEditingId(prop.id)}>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-background rounded-2xl flex items-center justify-center border border-border/60 group-hover:bg-gold/5 group-hover:border-gold/20 transition-all duration-500 shadow-inner">
                  <Home className="text-muted-foreground/40 group-hover:text-gold/60 transition-colors" size={36} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-foreground tracking-tight">{prop.name}<span className="tm">™</span></h3>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors",
                      prop.status === 'Published' 
                        ? 'bg-gold/10 text-gold border-gold/30 group-hover:bg-gold/20' 
                        : 'bg-muted/30 text-muted-foreground border-border/40'
                    )}>
                      {prop.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground tracking-tight">
                    <MapPin size={14} className="text-gold/40" />
                    {prop.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10 text-right hidden sm:flex">
                <div>
                  <p className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] mb-1">Portfolio Reach</p>
                  <p className="text-xl font-bold text-foreground tracking-tighter">{prop.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] mb-1">Direct ROI</p>
                  <p className="text-xl font-bold text-gold tracking-tighter">{prop.bookings}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground group-hover:text-gold group-hover:bg-gold/10 transition-all">
                  <Settings2 size={20} />
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Add Property Sheet */}
      <BottomSheet 
        isOpen={isAdding} 
        onClose={() => setIsAdding(false)} 
        title="Register Strategic Asset"
      >
        <div className="space-y-8 p-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Asset Name</label>
              <input type="text" className="w-full h-14 bg-background border border-border/60 rounded-2xl px-6 text-foreground font-bold tracking-tight focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all shadow-inner" placeholder="e.g. Sunset Beach House" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Market Location</label>
              <input type="text" className="w-full h-14 bg-background border border-border/60 rounded-2xl px-6 text-foreground font-bold tracking-tight focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all shadow-inner" placeholder="e.g. Destin, FL" />
            </div>
          </div>
          <SpringButton className="w-full h-14 text-lg btn-gold text-primary-foreground font-black uppercase tracking-widest shadow-xl shadow-gold/10">
            Verify & Create Asset
          </SpringButton>
        </div>
      </BottomSheet>

      {/* Edit Property Sheet */}
      <BottomSheet 
        isOpen={!!editingId} 
        onClose={() => setEditingId(null)} 
        title="Refine Asset Strategy"
      >
        <div className="space-y-8 p-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Strategic Description</label>
              <textarea 
                className="w-full h-40 bg-background border border-border/60 rounded-3xl p-6 text-foreground font-medium leading-relaxed focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all resize-none shadow-inner" 
                placeholder="Describe your standard of excellence..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="pt-2">
                <JaineFieldHelper 
                  context="property-description" 
                  onSuggest={(s) => setDesc(s)} 
                />
              </div>
            </div>
          </div>
          <SpringButton className="w-full h-14 text-lg btn-gold text-primary-foreground font-black uppercase tracking-widest shadow-xl shadow-gold/10">
            Save Strategy Changes
          </SpringButton>
        </div>
      </BottomSheet>
    </StaggerContainer>
  );
}

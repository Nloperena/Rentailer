import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Home, MapPin, BedDouble, Bath, Users, 
  ArrowRight, ArrowLeft, Camera, Sparkles, Loader2,
  Building2, CheckCircle2, Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BottomSheet } from '../ui/BottomSheet';
import { JaineFieldHelper } from '../ui/JaineFieldHelper';
import { SpringButton } from '../motion/SpringButton';

interface AddPropertyFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (property: any) => void;
}

type Step = 'identity' | 'details' | 'description' | 'activation';

export function AddPropertyFlow({ isOpen, onClose, onSuccess }: AddPropertyFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('identity');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'house',
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    description: '',
  });

  const steps: { id: Step; label: string }[] = [
    { id: 'identity', label: 'Identity' },
    { id: 'details', label: 'Capacity' },
    { id: 'description', label: 'Strategy' },
    { id: 'activation', label: 'Activation' },
  ];

  const handleNext = () => {
    if (currentStep === 'identity') setCurrentStep('details');
    else if (currentStep === 'details') setCurrentStep('description');
    else if (currentStep === 'description') setCurrentStep('activation');
  };

  const handleBack = () => {
    if (currentStep === 'details') setCurrentStep('identity');
    else if (currentStep === 'description') setCurrentStep('details');
    else if (currentStep === 'activation') setCurrentStep('description');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    onSuccess(formData);
    onClose();
    // Reset state for next time
    setCurrentStep('identity');
    setFormData({
      name: '',
      type: 'house',
      location: '',
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      description: '',
    });
  };

  return (
    <BottomSheet 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Register Strategic Asset"
    >
      <div className="space-y-10">
        {/* Progress Indicators */}
        <div className="flex items-center justify-between px-2">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all border",
                  currentStep === s.id 
                    ? "bg-gold text-primary-foreground border-gold shadow-lg shadow-gold/20" 
                    : steps.findIndex(x => x.id === currentStep) > idx
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-muted/30 text-muted-foreground border-border/40"
                )}>
                  {steps.findIndex(x => x.id === currentStep) > idx ? <CheckCircle2 size={14} /> : idx + 1}
                </div>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-widest",
                  currentStep === s.id ? "text-gold" : "text-muted-foreground opacity-40"
                )}>
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px bg-border/40 mx-4 mt-[-18px]" />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {currentStep === 'identity' && (
              <motion.div 
                key="identity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Asset Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-14 bg-background border border-border/60 rounded-2xl px-6 text-foreground font-bold tracking-tight focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all" 
                    placeholder="e.g. Sunset Beach House" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Asset Type</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                      className="w-full h-14 bg-background border border-border/60 rounded-2xl px-6 text-foreground font-bold tracking-tight focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all appearance-none"
                    >
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Market Location</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full h-14 bg-background border border-border/60 rounded-2xl px-6 text-foreground font-bold tracking-tight focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all" 
                      placeholder="e.g. Destin, FL" 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'details' && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { label: 'Bedrooms', icon: BedDouble, key: 'bedrooms' },
                  { label: 'Bathrooms', icon: Bath, key: 'bathrooms' },
                  { label: 'Max Guests', icon: Users, key: 'guests' },
                ].map(item => (
                  <div key={item.key} className="space-y-3">
                    <div className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-muted/20 border border-border/40">
                      <item.icon size={24} className="text-gold/60" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                      <div className="flex items-center gap-4 mt-2">
                        <button 
                          onClick={() => setFormData({ ...formData, [item.key]: Math.max(1, (formData as any)[item.key] - 1) })}
                          className="w-8 h-8 rounded-lg bg-background border border-border/60 flex items-center justify-center text-foreground hover:border-gold/40 transition-colors"
                        >-</button>
                        <span className="text-xl font-bold text-foreground">{(formData as any)[item.key]}</span>
                        <button 
                          onClick={() => setFormData({ ...formData, [item.key]: (formData as any)[item.key] + 1 })}
                          className="w-8 h-8 rounded-lg bg-background border border-border/60 flex items-center justify-center text-foreground hover:border-gold/40 transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {currentStep === 'description' && (
              <motion.div 
                key="description"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Strategic Narrative</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full h-48 bg-background border border-border/60 rounded-3xl p-6 text-foreground font-medium leading-relaxed focus:outline-none focus:border-gold/50 focus:bg-gold/5 transition-all resize-none" 
                    placeholder="Describe your standard of excellence..."
                  />
                  <JaineFieldHelper 
                    context="property-description" 
                    onSuggest={(s) => setFormData({ ...formData, description: s })} 
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 'activation' && (
              <motion.div 
                key="activation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-8 py-6"
              >
                <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto border border-gold/20 shadow-2xl">
                  <Shield size={40} className="text-gold" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">Ready for Verification</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto italic">
                    "Standards are verified through attention to detail. Your asset is ready to join the Rentalier portfolio."
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
                  <div className="p-4 rounded-xl bg-muted/20 border border-border/40">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Exposure Level</p>
                    <p className="text-lg font-bold text-foreground tracking-tight">Tier 1 Unlocked</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gold/5 border border-gold/20">
                    <p className="text-[8px] font-black text-gold uppercase tracking-widest mb-1">Potential Reward</p>
                    <p className="text-lg font-bold text-gold tracking-tight">+150 XP</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center gap-4 pt-6 border-t border-border/40">
          {currentStep !== 'identity' && (
            <button 
              onClick={handleBack}
              disabled={isSubmitting}
              className="h-14 px-8 rounded-2xl bg-muted/20 border border-border/60 text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back</span>
            </button>
          )}
          
          <button 
            onClick={currentStep === 'activation' ? handleSubmit : handleNext}
            disabled={isSubmitting || (currentStep === 'identity' && (!formData.name || !formData.location))}
            className="flex-1 h-14 btn-gold text-primary-foreground font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-gold/10 disabled:opacity-50 disabled:grayscale transition-all"
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : currentStep === 'activation' ? (
              <>
                <CheckCircle2 size={20} />
                Activate Asset
              </>
            ) : (
              <>
                <span className="text-[10px]">Next Phase</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}


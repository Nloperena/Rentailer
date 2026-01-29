import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-[60]"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/60 rounded-t-[3rem] shadow-2xl z-[70] max-h-[90vh] overflow-y-auto scrollbar-hide"
          >
            <div className="sticky top-0 bg-background/80 backdrop-blur-md px-8 py-6 flex items-center justify-between border-b border-border/40 z-10">
              <div className="w-12 h-1 bg-border/40 rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
              <h2 className="text-2xl font-serif text-foreground tracking-tight">{title}</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 pb-12">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}




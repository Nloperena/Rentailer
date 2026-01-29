import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, MessageSquare, Lightbulb, TrendingUp } from 'lucide-react';

export function JaineFab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-zinc-100"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-orange-500" />
                </div>
                <div>
                  <h4 className="font-serif text-charcoal">JAiNE Intelligence</h4>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Active Insight</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: Lightbulb, text: "Finish your bio to boost trust score by 15%", color: "text-amber-500" },
                  { icon: TrendingUp, text: "Your market is seeing 20% higher demand", color: "text-emerald-500" },
                  { icon: MessageSquare, text: "New lesson: The Stray Cat Method", color: "text-blue-500" },
                ].map((tip, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3 p-3 bg-zinc-50 rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors"
                  >
                    <tip.icon size={14} className={tip.color} />
                    <p className="text-xs text-zinc-600 leading-relaxed">{tip.text}</p>
                  </motion.div>
                ))}
              </div>

              <button className="w-full py-3 bg-charcoal text-white rounded-2xl text-sm font-medium hover:bg-zinc-800 transition-all">
                Open Full Concierge
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center shadow-2xl text-white relative group"
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 0 0px rgba(249, 115, 22, 0.4)",
              "0 0 0 20px rgba(249, 115, 22, 0)",
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full"
        />
        
        {isOpen ? <X size={24} /> : <Sparkles size={28} className="text-jewel-orange" />}
      </motion.button>
    </div>
  );
}




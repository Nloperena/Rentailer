import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Zap, BookOpen, Home, Globe } from 'lucide-react';

export function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = [
    { icon: Home, label: 'Go to Mission Control', href: '/' },
    { icon: BookOpen, label: 'Continue: Stray Cat Method', href: '/growth' },
    { icon: Globe, label: 'Manage Sunset Beach House', href: '/market' },
    { icon: Zap, label: 'Ask JAiNE about Miami demand', href: '#' },
  ].filter(r => r.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-md z-[100]"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-card rounded-[2rem] shadow-2xl z-[110] overflow-hidden border border-border/60"
          >
            <div className="p-6 border-b border-border/40 flex items-center gap-4">
              <Search className="text-gold" size={20} />
              <input
                autoFocus
                placeholder="Search the Guild or Academy..."
                className="flex-1 bg-transparent border-0 text-xl font-serif text-foreground focus:outline-none placeholder:text-muted-foreground/50"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-1 px-2 py-1 bg-background rounded-lg border border-border/40">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">ESC</span>
              </div>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto scrollbar-hide bg-card">
              {results.length > 0 ? (
                <div className="space-y-1">
                  {results.map((result, i) => (
                    <a
                      key={i}
                      href={result.href}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-gold/5 transition-all group border border-transparent hover:border-gold/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-muted-foreground group-hover:text-gold group-hover:bg-gold/10 border border-border/40 transition-colors">
                          <result.icon size={20} />
                        </div>
                        <span className="text-sm font-bold text-foreground group-hover:text-gold transition-colors">{result.label}</span>
                      </div>
                      <ArrowRight size={16} className="text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-2">
                  <p className="text-muted-foreground">No matching commands found for "{query}"</p>
                  <p className="text-[10px] text-gold uppercase font-black tracking-widest">Try searching for 'Academy' or 'Properties'</p>
                </div>
              )}
            </div>

            <div className="p-4 bg-background border-t border-border/40 flex items-center justify-between text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest px-8">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Command size={10} /> + K to open</span>
                <span>↑↓ to navigate</span>
              </div>
              <div className="flex items-center gap-1 text-gold">
                <Zap size={10} className="fill-gold/20" /> Powered by JAiNE
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}




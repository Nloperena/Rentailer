import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface JaineFieldHelperProps {
  onSuggest: (suggestion: string) => void;
  context: string;
}

export function JaineFieldHelper({ onSuggest, context }: JaineFieldHelperProps) {
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const handleHelp = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      const suggestions: Record<string, string> = {
        'bio': "Nicholas is a verified property operator in Miami with over 10 years of hospitality experience, specializing in premium vacation rentals that combine local expertise with luxury standards.",
        'property-description': "Escape to our tranquil beachfront retreat in Destin. Featuring panoramic ocean views, a private heated pool, and designer interiors, this 4-bedroom villa is the ultimate haven for discerning travelers.",
      };
      
      onSuggest(suggestions[context] || "I've analyzed your context and suggest making this more concise.");
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-end mt-2">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleHelp}
        disabled={isAnalyzing}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-jewel-orange hover:text-jewel-orange-hover transition-colors"
      >
        {isAnalyzing ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <Sparkles size={12} />
        )}
        Ask JAiNE to polish
      </motion.button>
    </div>
  );
}




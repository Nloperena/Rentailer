import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, SlidersHorizontal, Heart, Star, 
  ChevronLeft, ChevronRight, Check, X, Shield,
  Sparkles, Award, Clock, MessageCircle, ExternalLink,
  Grid3X3, List, Map, TrendingDown, DollarSign, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface PlatformPrice {
  name: string;
  price: number;
  icon?: string;
}

interface Listing {
  id: string;
  title: string;
  images: string[];
  location: string;
  rating: number;
  reviews: number;
  details: {
    bedrooms: number;
    bathrooms: number;
    guests: number;
  };
  prices: {
    direct: number;
    platforms: PlatformPrice[];
  };
  isSaved?: boolean;
  isNew?: boolean;
}

// Property Categories
const categories = [
  { id: 'beach', label: 'Beachfront', emoji: '🏖️' },
  { id: 'modern', label: 'Modern', emoji: '🏙️' },
  { id: 'luxury', label: 'Luxury', emoji: '💎' },
  { id: 'cabin', label: 'Cabin', emoji: '🪵' },
  { id: 'pool', label: 'Amazing Pools', emoji: '🏊' },
  { id: 'view', label: 'Views', emoji: '🏔️' },
];

// Mock Property Data
const mockProperties: Listing[] = [
  {
    id: '1',
    title: 'Sunset Beach Villa',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    ],
    location: 'Miami Beach, FL',
    rating: 4.92,
    reviews: 124,
    details: { bedrooms: 4, bathrooms: 3, guests: 8 },
    prices: {
      direct: 299,
      platforms: [
        { name: 'Airbnb', price: 345 },
        { name: 'VRBO', price: 358 },
      ]
    },
    isNew: true,
  },
  {
    id: '2',
    title: 'Modern Downtown Loft',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    ],
    location: 'Miami, FL',
    rating: 4.85,
    reviews: 89,
    details: { bedrooms: 1, bathrooms: 1, guests: 2 },
    prices: {
      direct: 149,
      platforms: [
        { name: 'Airbnb', price: 172 },
        { name: 'VRBO', price: 185 },
      ]
    }
  },
  {
    id: '3',
    title: 'Coastal Serenity House',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    ],
    location: 'Destin, FL',
    rating: 4.98,
    reviews: 56,
    details: { bedrooms: 3, bathrooms: 2, guests: 6 },
    prices: {
      direct: 225,
      platforms: [
        { name: 'Airbnb', price: 260 },
        { name: 'VRBO', price: 275 },
      ]
    }
  },
  {
    id: '4',
    title: 'The Sky Penthouse',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    ],
    location: 'Brickell, FL',
    rating: 4.78,
    reviews: 42,
    details: { bedrooms: 2, bathrooms: 2, guests: 4 },
    prices: {
      direct: 450,
      platforms: [
        { name: 'Airbnb', price: 518 },
        { name: 'VRBO', price: 542 },
      ]
    }
  }
];

// Price Comparison Tooltip/Badge
function PriceBadge({ prices }: { prices: Listing['prices'] }) {
  const averagePlatformPrice = prices.platforms.reduce((acc, p) => acc + p.price, 0) / prices.platforms.length;
  const savings = averagePlatformPrice - prices.direct;
  const savingsPercent = Math.round((savings / averagePlatformPrice) * 100);

  return (
    <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-gold/30 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Platform Compare</span>
        <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold">
          <TrendingDown size={12} />
          Save {savingsPercent}%
        </div>
      </div>
      
      <div className="space-y-1">
        {prices.platforms.map(p => (
          <div key={p.name} className="flex items-center justify-between text-xs opacity-50">
            <span>{p.name}</span>
            <span className="line-through">${p.price}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1 mt-1 border-t border-white/5">
          <span className="text-xs font-bold text-gold flex items-center gap-1">
            <Check size={12} strokeWidth={3} /> Direct
          </span>
          <span className="text-sm font-black text-white">${prices.direct}</span>
        </div>
      </div>
    </div>
  );
}

// Listing Card
function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(listing.isSaved || false);

  return (
    <motion.div
      className="group cursor-pointer relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-border/60 hover:border-gold/40 transition-all shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {/* Background Image - Full Card */}
      <div className="absolute inset-0">
        <motion.img
          key={currentImage}
          src={listing.images[currentImage]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
      </div>
      
      {/* Top Actions */}
      <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-10">
        <div className="flex flex-col gap-2">
          {listing.isNew && (
            <span className="w-fit px-3 py-1 rounded-full bg-gold text-black text-[10px] font-black uppercase tracking-widest shadow-lg">
              New Intel
            </span>
          )}
          <span className="w-fit px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">
            {listing.location}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
          className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:scale-110 transition-all z-10"
        >
          <Heart className={cn("w-6 h-6 transition-colors", isSaved && "fill-red-500 text-red-500")} />
        </button>
      </div>

      {/* Bottom Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-6 z-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-gold transition-colors">
              {listing.title}
            </h3>
            <div className="flex items-center gap-1.5 bg-gold/20 backdrop-blur-md px-2.5 py-1 rounded-xl border border-gold/30">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-xs font-black text-gold">{listing.rating}</span>
            </div>
          </div>
          <p className="text-xs text-white/60 font-medium uppercase tracking-[0.1em]">
            {listing.details.bedrooms} Bed • {listing.details.bathrooms} Bath • {listing.details.guests} Guests
          </p>
        </div>

        {/* Price Comparison Block - Compact Glass Style */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Direct vs Platforms</span>
            <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase">
              <TrendingDown size={12} />
              Save {Math.round(((listing.prices.platforms[0].price - listing.prices.direct) / listing.prices.platforms[0].price) * 100)}%
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">${listing.prices.direct}</span>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">/ night</span>
            </div>
            <div className="text-right opacity-40 text-[10px] font-bold">
              OTA Average: <span className="line-through">${Math.round(listing.prices.platforms.reduce((a, b) => a + b.price, 0) / listing.prices.platforms.length)}</span>
            </div>
          </div>
        </div>

        {/* Interactive Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="h-12 rounded-2xl bg-gold text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gold/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
            View Home
            <ArrowRight size={14} />
          </button>
          <button className="h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
            Visit Website
            <Globe size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Main Marketplace Component
export function MarketplaceHub() {
  const [selectedCategory, setSelectedCategory] = useState('beach');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]" />
            <h1 className="heading-section text-foreground leading-tight">Global Market Feed</h1>
          </div>
          <p className="text-muted-foreground font-medium leading-relaxed italic opacity-80 max-w-md border-l border-border/40 pl-4">
            "Direct transparency is the ultimate luxury."
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-card p-1 rounded-2xl border border-border/60">
          <button className="px-6 py-2 rounded-xl bg-gold text-black text-[10px] font-black uppercase tracking-widest shadow-lg">Feed</button>
          <button className="px-6 py-2 rounded-xl hover:bg-white/5 text-muted-foreground text-[10px] font-black uppercase tracking-widest">Map</button>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground opacity-40" />
          <input
            type="text"
            placeholder="Search by destination or market..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-16 pr-6 rounded-[2rem] bg-card border border-border/60 focus:border-gold/50 focus:bg-gold/5 outline-none transition-all text-lg font-medium"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                selectedCategory === cat.id
                  ? "bg-gold/10 text-gold border-gold/40"
                  : "bg-card border-border/60 text-muted-foreground hover:border-gold/20"
              )}
            >
              <span className="text-base leading-none">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Market Intel Bar */}
      <div className="p-4 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Info size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Market Insight</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Booking direct is currently averaging 18% lower than platform rates.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <div className="text-right">
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest opacity-60">Direct Avg.</p>
            <p className="text-sm font-bold text-foreground">$242</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest opacity-60">OTA Avg.</p>
            <p className="text-sm font-bold text-red-400">$286</p>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
        {mockProperties.map((prop, index) => (
          <ListingCard key={prop.id} listing={prop} index={index} />
        ))}
      </div>
    </div>
  );
}

export default MarketplaceHub;

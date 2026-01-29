import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, SlidersHorizontal, Heart, Star, 
  ChevronLeft, ChevronRight, Check, X, Shield,
  Sparkles, Award, Clock, MessageCircle, ExternalLink,
  Grid3X3, List, Map
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  priceUnit: string;
  rating: number;
  reviews: number;
  location: string;
  distance?: string;
  category: string;
  seller: {
    name: string;
    avatar: string;
    verified: boolean;
    responseTime?: string;
  };
  badges: string[];
  isSaved?: boolean;
  isNew?: boolean;
}

// Categories
const categories = [
  { id: 'all', label: 'All', icon: Grid3X3 },
  { id: 'services', label: 'Services', emoji: '🛠️' },
  { id: 'products', label: 'Products', emoji: '📦' },
  { id: 'software', label: 'Software', emoji: '💻' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'cleaning', label: 'Cleaning', emoji: '🧹' },
  { id: 'maintenance', label: 'Maintenance', emoji: '🔧' },
  { id: 'design', label: 'Design', emoji: '🎨' },
  { id: 'marketing', label: 'Marketing', emoji: '📣' },
  { id: 'consulting', label: 'Consulting', emoji: '💼' },
];

// Mock listings data
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Professional Property Photography',
    description: 'HDR photos, drone shots, and virtual tours for your listings',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    ],
    price: 299,
    priceUnit: 'per property',
    rating: 4.9,
    reviews: 127,
    location: 'Miami, FL',
    distance: '2.3 mi',
    category: 'photography',
    seller: {
      name: 'Alex Studio',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      verified: true,
      responseTime: '< 1 hour',
    },
    badges: ['Top Rated', 'Quick Response'],
    isNew: true,
  },
  {
    id: '2',
    title: 'Premium Cleaning Service',
    description: 'Hotel-quality turnover cleaning with linens included',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=400&fit=crop',
    ],
    price: 85,
    priceUnit: 'per turnover',
    rating: 4.8,
    reviews: 89,
    location: 'Miami Beach, FL',
    distance: '4.1 mi',
    category: 'cleaning',
    seller: {
      name: 'Sparkle Cleans',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      verified: true,
      responseTime: '< 2 hours',
    },
    badges: ['Verified', 'Insured'],
  },
  {
    id: '3',
    title: 'Smart Pricing Software',
    description: 'AI-powered dynamic pricing that maximizes your revenue',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    ],
    price: 29,
    priceUnit: 'per month',
    rating: 4.7,
    reviews: 234,
    location: 'Online',
    category: 'software',
    seller: {
      name: 'PriceWise',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      verified: true,
    },
    badges: ['Featured'],
    isSaved: true,
  },
  {
    id: '4',
    title: 'Handyman Services',
    description: 'Quick repairs, furniture assembly, and maintenance',
    images: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop',
    ],
    price: 65,
    priceUnit: 'per hour',
    rating: 4.6,
    reviews: 56,
    location: 'Fort Lauderdale, FL',
    distance: '8.2 mi',
    category: 'maintenance',
    seller: {
      name: 'Mike\'s Repairs',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      verified: false,
      responseTime: '< 4 hours',
    },
    badges: [],
  },
  {
    id: '5',
    title: 'Interior Design Consultation',
    description: 'Transform your space with professional design advice',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&h=400&fit=crop',
    ],
    price: 150,
    priceUnit: 'per session',
    rating: 5.0,
    reviews: 42,
    location: 'Miami, FL',
    distance: '1.5 mi',
    category: 'design',
    seller: {
      name: 'Luna Interiors',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      verified: true,
      responseTime: '< 1 hour',
    },
    badges: ['Top Rated', 'Superhost Favorite'],
    isNew: true,
  },
  {
    id: '6',
    title: 'Guest Welcome Basket Kit',
    description: 'Premium local snacks and amenities for your guests',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop',
    ],
    price: 45,
    priceUnit: 'per kit',
    rating: 4.8,
    reviews: 167,
    location: 'Ships nationwide',
    category: 'products',
    seller: {
      name: 'Host Essentials',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      verified: true,
    },
    badges: ['Verified', 'Fast Shipping'],
  },
  {
    id: '7',
    title: 'Social Media Management',
    description: 'Grow your direct bookings with targeted content',
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop',
    ],
    price: 499,
    priceUnit: 'per month',
    rating: 4.5,
    reviews: 38,
    location: 'Remote',
    category: 'marketing',
    seller: {
      name: 'Boost Agency',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
      verified: true,
      responseTime: '< 12 hours',
    },
    badges: ['Featured'],
  },
  {
    id: '8',
    title: 'Revenue Optimization Consulting',
    description: 'Personalized strategy to maximize your earnings',
    images: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    ],
    price: 200,
    priceUnit: 'per hour',
    rating: 4.9,
    reviews: 28,
    location: 'Virtual',
    category: 'consulting',
    seller: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      verified: true,
      responseTime: '< 6 hours',
    },
    badges: ['Rentalier Pro', 'Expert'],
  },
];

// Search & Filter Bar
function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border pb-4">
      {/* Search Input */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services, products, or vendors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-full bg-card border border-border focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <button className="h-12 px-4 rounded-full bg-card border border-border flex items-center gap-2 hover:border-gold transition-colors">
          <MapPin className="w-5 h-5 text-gold" />
          <span className="hidden sm:inline text-sm">Miami, FL</span>
        </button>
        <motion.button 
          className={cn(
            "h-12 px-4 rounded-full border flex items-center gap-2 transition-colors",
            showFilters ? "bg-gold text-black border-gold" : "bg-card border-border hover:border-gold"
          )}
          onClick={() => setShowFilters(!showFilters)}
          whileTap={{ scale: 0.95 }}
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">Filters</span>
        </motion.button>
      </div>

      {/* Filter Pills */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <FilterPill label="Price" options={['Any', '$', '$$', '$$$']} />
            <FilterPill label="Rating" options={['Any', '4+', '4.5+', '5']} />
            <FilterPill label="Distance" options={['Any', '5 mi', '10 mi', '25 mi']} />
            <FilterPill label="Response Time" options={['Any', '< 1hr', '< 4hr', '< 24hr']} />
            <button className="px-3 py-1.5 text-sm text-gold hover:underline">
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPill({ label, options }: { label: string; options: string[] }) {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
          selected !== options[0]
            ? "bg-gold/10 border-gold text-gold"
            : "bg-card border-border hover:border-muted-foreground"
        )}
      >
        {label}: {selected}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-2 left-0 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => { setSelected(option); setIsOpen(false); }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between",
                  selected === option && "text-gold"
                )}
              >
                {option}
                {selected === option && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Category Bar
function CategoryBar({ 
  selected, 
  onSelect 
}: { 
  selected: string; 
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 -mx-4 px-4 mb-6">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
            selected === cat.id
              ? "bg-gold text-black border-gold"
              : "bg-card border-border hover:border-gold/50"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {'emoji' in cat ? (
            <span>{cat.emoji}</span>
          ) : (
            <cat.icon className="w-4 h-4" />
          )}
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}

// Listing Card
function ListingCard({ listing, index }: { listing: Listing; index: number }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isSaved, setIsSaved] = useState(listing.isSaved || false);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-3">
        {/* Images */}
        <motion.img
          key={currentImage}
          src={listing.images[currentImage]}
          alt={listing.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Navigation */}
        {listing.images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </>
        )}

        {/* Image Dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {listing.images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  i === currentImage ? "bg-white w-2.5" : "bg-white/50"
                )}
              />
            ))}
          </div>
        )}

        {/* Save Button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={cn(
              "w-5 h-5 transition-colors",
              isSaved ? "text-red-500 fill-red-500" : "text-gray-700"
            )} 
          />
        </motion.button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {listing.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-gold text-black text-xs font-semibold">
              New
            </span>
          )}
          {listing.badges.includes('Top Rated') && (
            <span className="px-2.5 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold flex items-center gap-1">
              <Award className="w-3 h-3" />
              Top Rated
            </span>
          )}
          {listing.badges.includes('Featured') && (
            <span className="px-2.5 py-1 rounded-full bg-violet-500 text-white text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-gold transition-colors">
            {listing.title}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 text-foreground fill-foreground" />
            <span className="text-sm font-medium">{listing.rating}</span>
            <span className="text-sm text-muted-foreground">({listing.reviews})</span>
          </div>
        </div>

        {/* Location */}
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {listing.location}
          {listing.distance && ` · ${listing.distance}`}
        </p>

        {/* Seller */}
        <div className="flex items-center gap-2 pt-1">
          <img
            src={listing.seller.avatar}
            alt={listing.seller.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">{listing.seller.name}</span>
          {listing.seller.verified && (
            <Shield className="w-4 h-4 text-blue-500" />
          )}
        </div>

        {/* Price */}
        <p className="pt-1">
          <span className="font-semibold text-foreground">${listing.price}</span>
          <span className="text-muted-foreground text-sm"> {listing.priceUnit}</span>
        </p>
      </div>
    </motion.div>
  );
}

// Main Marketplace Component
export function MarketplaceHub() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = mockListings.filter((listing) => {
    if (selectedCategory !== 'all' && listing.category !== selectedCategory) {
      return false;
    }
    if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Marketplace</h1>
          <p className="text-muted-foreground">Discover services, products, and vendors</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-card border border-border hover:border-gold transition-colors">
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-card transition-colors text-muted-foreground">
            <List className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-card transition-colors text-muted-foreground">
            <Map className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <SearchBar onSearch={setSearchQuery} />

      {/* Categories */}
      <CategoryBar selected={selectedCategory} onSelect={setSelectedCategory} />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredListings.length} results
        </p>
        <select className="text-sm bg-transparent border-none text-muted-foreground focus:outline-none cursor-pointer">
          <option>Sort: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Highest Rated</option>
          <option>Most Reviews</option>
        </select>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map((listing, index) => (
          <ListingCard key={listing.id} listing={listing} index={index} />
        ))}
      </div>

      {/* Load More */}
      {filteredListings.length > 0 && (
        <div className="flex justify-center pt-8">
          <motion.button
            className="px-8 py-3 rounded-full bg-card border border-border hover:border-gold transition-colors font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Show more
          </motion.button>
        </div>
      )}

      {/* Empty State */}
      {filteredListings.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default MarketplaceHub;



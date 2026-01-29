import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreHorizontal, Calendar, Star,
  Eye, DollarSign, TrendingUp, TrendingDown, MessageSquare,
  Clock, CheckCircle2, AlertCircle, Camera, Edit3, Trash2,
  ChevronRight, ChevronLeft, ExternalLink, Copy, Settings,
  Percent, Users, BedDouble, Bath, MapPin, Wifi, Car, 
  Snowflake, Tv, Coffee, Shield, Sparkles, BarChart3,
  Home, Building2, Sun, Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddPropertyFlow } from './AddPropertyFlow';

// Types
interface Property {
  id: string;
  name: string;
  address: string;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'active' | 'paused' | 'unlisted' | 'pending';
  images: string[];
  stats: {
    views: number;
    viewsTrend: number;
    bookings: number;
    bookingsTrend: number;
    revenue: number;
    revenueTrend: number;
    rating: number;
    reviews: number;
    occupancy: number;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    guests: number;
    sqft: number;
  };
  amenities: string[];
  pricing: {
    basePrice: number;
    cleaningFee: number;
    weekendPrice?: number;
  };
  calendar: {
    nextCheckIn?: string;
    nextCheckOut?: string;
    blockedDates: number;
  };
  tasks: { id: string; title: string; urgent: boolean }[];
  messages: number;
  qualityScore: number;
}

// Mock data
const properties: Property[] = [
  {
    id: '1',
    name: 'Sunset Beach Villa',
    address: '123 Ocean Drive, Miami Beach, FL 33139',
    type: 'house',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
    ],
    stats: {
      views: 1243,
      viewsTrend: 12,
      bookings: 8,
      bookingsTrend: 25,
      revenue: 8450,
      revenueTrend: 18,
      rating: 4.92,
      reviews: 47,
      occupancy: 78,
    },
    details: {
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      sqft: 2400,
    },
    amenities: ['wifi', 'parking', 'pool', 'ac', 'kitchen', 'washer'],
    pricing: {
      basePrice: 299,
      cleaningFee: 150,
      weekendPrice: 349,
    },
    calendar: {
      nextCheckIn: 'Jun 15',
      nextCheckOut: 'Jun 20',
      blockedDates: 3,
    },
    tasks: [
      { id: '1', title: 'Restock bathroom supplies', urgent: false },
      { id: '2', title: 'Schedule AC maintenance', urgent: true },
    ],
    messages: 3,
    qualityScore: 92,
  },
  {
    id: '2',
    name: 'Downtown Loft',
    address: '456 Main Street, Unit 12A, Miami, FL 33130',
    type: 'apartment',
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    stats: {
      views: 876,
      viewsTrend: -5,
      bookings: 12,
      bookingsTrend: 8,
      revenue: 4200,
      revenueTrend: 15,
      rating: 4.85,
      reviews: 32,
      occupancy: 85,
    },
    details: {
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      sqft: 750,
    },
    amenities: ['wifi', 'gym', 'ac', 'kitchen', 'doorman'],
    pricing: {
      basePrice: 149,
      cleaningFee: 75,
    },
    calendar: {
      nextCheckIn: 'Jun 18',
      nextCheckOut: 'Jun 22',
      blockedDates: 0,
    },
    tasks: [],
    messages: 1,
    qualityScore: 88,
  },
];

const statusColors = {
  active: 'bg-emerald-500/20 text-emerald-400',
  paused: 'bg-amber-500/20 text-amber-400',
  unlisted: 'bg-gray-500/20 text-gray-400',
  pending: 'bg-blue-500/20 text-blue-400',
};

const statusLabels = {
  active: 'Listed',
  paused: 'Paused',
  unlisted: 'Unlisted',
  pending: 'Pending Review',
};

// Property Card Component
function PropertyCard({ property, onSelect }: { property: Property; onSelect: () => void }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <motion.div
      className="bg-[#2b2d31] rounded-2xl overflow-hidden hover:ring-1 hover:ring-gold/30 transition-all cursor-pointer group shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onSelect}
    >
      {/* Image Carousel - Smaller Aspect Ratio */}
      <div className="relative aspect-[16/6] overflow-hidden">
        <img
          src={property.images[currentImage]}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-black/60"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage((prev) => (prev + 1) % property.images.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-black/60"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn("px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg", statusColors[property.status])}>
            {statusLabels[property.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h3 className="font-bold text-white text-lg tracking-tight truncate">{property.name}</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gold/50" />
              {property.address.split(',').slice(0, 2).join(',')}
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-gold/10 px-2 py-1 rounded-lg border border-gold/20">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="font-bold text-gold text-sm">{property.stats.rating}</span>
          </div>
        </div>

        {/* Quick Stats - Larger Numbers */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 bg-white/[0.02] rounded-xl px-2">
          <QuickStat
            label="Views"
            value={property.stats.views}
            trend={property.stats.viewsTrend}
            icon={Eye}
          />
          <QuickStat
            label="Bookings"
            value={property.stats.bookings}
            trend={property.stats.bookingsTrend}
            icon={Calendar}
          />
          <QuickStat
            label="Revenue"
            value={`$${(property.stats.revenue / 1000).toFixed(1)}k`}
            trend={property.stats.revenueTrend}
            icon={DollarSign}
          />
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white tracking-tighter">${property.pricing.basePrice}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">/ night</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60">Occupancy</p>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden border border-border/40">
                  <motion.div
                    className="h-full bg-gold rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${property.stats.occupancy}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-bold text-white">{property.stats.occupancy}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function QuickStat({ 
  label, 
  value, 
  trend, 
  icon: Icon 
}: { 
  label: string; 
  value: string | number; 
  trend: number;
  icon: React.ElementType;
}) {
  const isPositive = trend >= 0;

  return (
    <div className="text-center space-y-1">
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
      <div className={cn(
        "text-[10px] font-bold flex items-center justify-center gap-0.5",
        isPositive ? "text-emerald-400" : "text-red-400"
      )}>
        {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
        {Math.abs(trend)}%
      </div>
    </div>
  );
}

// Property Detail Panel
function PropertyDetailPanel({ 
  property, 
  onClose 
}: { 
  property: Property; 
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'pricing' | 'settings'>('overview');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Panel */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-[#1e1f22] shadow-2xl overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#1e1f22] z-10 border-b border-white/5">
          <div className="relative h-48">
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f22] to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", statusColors[property.status])}>
                  {statusLabels[property.status]}
                </span>
                <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-xs font-medium">
                  Quality Score: {property.qualityScore}%
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{property.name}</h2>
              <p className="text-sm text-gray-400">{property.address}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-4 pt-2">
            {(['overview', 'calendar', 'pricing', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-t-lg text-sm font-medium transition-colors capitalize",
                  activeTab === tab
                    ? "bg-[#2b2d31] text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  label="This Month's Revenue"
                  value={`$${property.stats.revenue.toLocaleString()}`}
                  trend={property.stats.revenueTrend}
                  icon={DollarSign}
                />
                <StatCard
                  label="Occupancy Rate"
                  value={`${property.stats.occupancy}%`}
                  trend={5}
                  icon={Percent}
                />
                <StatCard
                  label="Page Views"
                  value={property.stats.views.toLocaleString()}
                  trend={property.stats.viewsTrend}
                  icon={Eye}
                />
                <StatCard
                  label="Total Bookings"
                  value={property.stats.bookings.toString()}
                  trend={property.stats.bookingsTrend}
                  icon={Calendar}
                />
              </div>

              {/* Upcoming */}
              <div className="bg-[#2b2d31] rounded-xl p-4">
                <h3 className="font-semibold text-white mb-3">Upcoming</h3>
                <div className="space-y-3">
                  {property.calendar.nextCheckIn && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Check-in: {property.calendar.nextCheckIn}</p>
                        <p className="text-xs text-gray-400">Guest arriving soon</p>
                      </div>
                    </div>
                  )}
                  {property.calendar.nextCheckOut && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Check-out: {property.calendar.nextCheckOut}</p>
                        <p className="text-xs text-gray-400">Prepare for turnover</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tasks */}
              {property.tasks.length > 0 && (
                <div className="bg-[#2b2d31] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Tasks</h3>
                    <button className="text-xs text-gold hover:underline">Add Task</button>
                  </div>
                  <div className="space-y-2">
                    {property.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg",
                          task.urgent ? "bg-red-500/10 border border-red-500/20" : "bg-[#1e1f22]"
                        )}
                      >
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <span className={cn(
                          "flex-1 text-sm",
                          task.urgent ? "text-red-400" : "text-gray-300"
                        )}>
                          {task.title}
                        </span>
                        {task.urgent && (
                          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs">
                            Urgent
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Details */}
              <div className="bg-[#2b2d31] rounded-xl p-4">
                <h3 className="font-semibold text-white mb-3">Property Details</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-[#1e1f22]">
                    <BedDouble className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{property.details.bedrooms}</p>
                    <p className="text-xs text-gray-500">Bedrooms</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#1e1f22]">
                    <Bath className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{property.details.bathrooms}</p>
                    <p className="text-xs text-gray-500">Bathrooms</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#1e1f22]">
                    <Users className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{property.details.guests}</p>
                    <p className="text-xs text-gray-500">Guests</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-[#1e1f22]">
                    <Home className="w-5 h-5 text-gold mx-auto mb-1" />
                    <p className="text-sm font-medium text-white">{property.details.sqft}</p>
                    <p className="text-xs text-gray-500">Sq. Ft.</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gold text-black font-medium hover:bg-gold/90 transition-colors">
                  <Edit3 className="w-4 h-4" />
                  Edit Listing
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#2b2d31] text-white hover:bg-[#35373c] transition-colors">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#2b2d31] text-white hover:bg-[#35373c] transition-colors">
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-lg bg-[#2b2d31] text-white hover:bg-[#35373c] transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  Full Analytics
                </button>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Calendar view coming soon</p>
              <p className="text-sm mt-2">Manage availability and bookings</p>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="bg-[#2b2d31] rounded-xl p-4">
                <h3 className="font-semibold text-white mb-4">Pricing Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1e1f22]">
                    <div>
                      <p className="text-sm font-medium text-white">Base Price</p>
                      <p className="text-xs text-gray-500">Default nightly rate</p>
                    </div>
                    <span className="text-lg font-bold text-gold">${property.pricing.basePrice}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1e1f22]">
                    <div>
                      <p className="text-sm font-medium text-white">Cleaning Fee</p>
                      <p className="text-xs text-gray-500">One-time fee per stay</p>
                    </div>
                    <span className="text-lg font-bold text-white">${property.pricing.cleaningFee}</span>
                  </div>
                  {property.pricing.weekendPrice && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-[#1e1f22]">
                      <div>
                        <p className="text-sm font-medium text-white">Weekend Price</p>
                        <p className="text-xs text-gray-500">Fri-Sat rate</p>
                      </div>
                      <span className="text-lg font-bold text-white">${property.pricing.weekendPrice}</span>
                    </div>
                  )}
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gold text-black font-medium hover:bg-gold/90 transition-colors">
                <Sparkles className="w-4 h-4" />
                Enable Smart Pricing
              </button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-[#2b2d31] hover:bg-[#35373c] transition-colors text-left">
                <Settings className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Listing Settings</p>
                  <p className="text-xs text-gray-500">House rules, check-in/out times</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-[#2b2d31] hover:bg-[#35373c] transition-colors text-left">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Messaging</p>
                  <p className="text-xs text-gray-500">Auto-messages, saved replies</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-[#2b2d31] hover:bg-[#35373c] transition-colors text-left">
                <Shield className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Safety & Privacy</p>
                  <p className="text-xs text-gray-500">Security devices, guest ID</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
              <div className="h-px bg-white/5 my-2" />
              <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors text-left border border-red-500/20">
                <Trash2 className="w-5 h-5 text-red-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-400">Deactivate Listing</p>
                  <p className="text-xs text-red-400/70">Temporarily hide from search</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ 
  label, 
  value, 
  trend, 
  icon: Icon 
}: { 
  label: string; 
  value: string; 
  trend: number;
  icon: React.ElementType;
}) {
  const isPositive = trend >= 0;

  return (
    <div className="bg-[#2b2d31] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className="w-5 h-5 text-gold" />
        <span className={cn(
          "flex items-center gap-0.5 text-xs font-medium",
          isPositive ? "text-emerald-400" : "text-red-400"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

// Main Component
export function PropertiesHub() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-white">Your Properties</h1>
          <p className="text-gray-400">{properties.length} listings · Manage your portfolio</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-black font-medium hover:bg-gold/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#2b2d31] text-white placeholder:text-gray-500 outline-none border border-transparent focus:border-gold/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2b2d31] text-gray-300 hover:bg-[#35373c] transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
        <div className="flex rounded-lg bg-[#2b2d31] p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded",
              viewMode === 'grid' ? "bg-gold text-black" : "text-gray-400 hover:text-white"
            )}
          >
            <Building2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded",
              viewMode === 'list' ? "bg-gold text-black" : "text-gray-400 hover:text-white"
            )}
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSelect={() => setSelectedProperty(property)}
          />
        ))}
      </div>

      {/* Empty State for Add More */}
      <motion.button
        onClick={() => setIsAdding(true)}
        className="w-full py-12 rounded-xl border-2 border-dashed border-white/10 hover:border-gold/30 transition-colors group"
        whileHover={{ scale: 1.01 }}
      >
        <Plus className="w-8 h-8 mx-auto mb-2 text-gray-500 group-hover:text-gold transition-colors" />
        <p className="text-gray-500 group-hover:text-gray-300 transition-colors">Add another property</p>
      </motion.button>

      <AddPropertyFlow 
        isOpen={isAdding} 
        onClose={() => setIsAdding(false)}
        onSuccess={(prop) => {
          console.log('Property added:', prop);
        }}
      />

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailPanel
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default PropertiesHub;



import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Plus, ChevronLeft, ChevronRight, Info, Check,
  Clock, Star, Trophy, Lock, Volume2, VolumeX,
  Bookmark, Share2, ThumbsUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  xp: number;
  progress?: number;
  isNew?: boolean;
  isLocked?: boolean;
  rating?: number;
  views?: string;
}

interface VideoRow {
  id: string;
  title: string;
  videos: Video[];
}

// Mock video data
const featuredVideo: Video = {
  id: 'featured-1',
  title: 'The Stray Cat Method',
  description: 'Master the art of high-impact, low-cost property differentiation. Learn how to transform ordinary spaces into memorable experiences that guests rave about.',
  thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop',
  duration: '45 min',
  instructor: 'Sarah Chen',
  category: 'Foundational',
  level: 'Beginner',
  xp: 150,
  rating: 4.9,
  views: '12.5K',
  isNew: true,
};

const videoRows: VideoRow[] = [
  {
    id: 'continue',
    title: 'Continue Watching',
    videos: [
      {
        id: 'v1',
        title: 'Guest Communication Mastery',
        description: 'Learn the art of 5-star communication',
        thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop',
        duration: '32 min',
        instructor: 'James Mitchell',
        category: 'Operations',
        level: 'Intermediate',
        xp: 75,
        progress: 65,
      },
      {
        id: 'v2',
        title: 'Pricing Psychology',
        description: 'Dynamic pricing strategies that work',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop',
        duration: '28 min',
        instructor: 'Emily Rodriguez',
        category: 'Revenue',
        level: 'Advanced',
        xp: 100,
        progress: 30,
      },
    ],
  },
  {
    id: 'popular',
    title: 'Most Popular',
    videos: [
      {
        id: 'v3',
        title: 'Photography for Listings',
        description: 'Capture stunning property photos',
        thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=225&fit=crop',
        duration: '45 min',
        instructor: 'Alex Thompson',
        category: 'Marketing',
        level: 'Beginner',
        xp: 80,
        rating: 4.8,
        views: '8.2K',
      },
      {
        id: 'v4',
        title: 'Direct Booking Mastery',
        description: 'Build your direct booking engine',
        thumbnail: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400&h=225&fit=crop',
        duration: '1h 15min',
        instructor: 'Sarah Chen',
        category: 'Revenue',
        level: 'Advanced',
        xp: 200,
        rating: 4.9,
        views: '15.3K',
        isNew: true,
      },
      {
        id: 'v5',
        title: '5-Star Guest Experience',
        description: 'Create memorable stays',
        thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=225&fit=crop',
        duration: '38 min',
        instructor: 'Michael Park',
        category: 'Hospitality',
        level: 'Intermediate',
        xp: 90,
        rating: 4.7,
        views: '6.1K',
      },
      {
        id: 'v6',
        title: 'Legal Essentials',
        description: 'Protect your business',
        thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop',
        duration: '52 min',
        instructor: 'David Kim',
        category: 'Business',
        level: 'Beginner',
        xp: 100,
        rating: 4.6,
        views: '4.8K',
      },
      {
        id: 'v7',
        title: 'Automation Secrets',
        description: 'Scale with smart systems',
        thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
        duration: '41 min',
        instructor: 'Lisa Wang',
        category: 'Operations',
        level: 'Advanced',
        xp: 120,
        rating: 4.8,
        views: '7.9K',
      },
    ],
  },
  {
    id: 'beginner',
    title: 'Start Your Journey',
    videos: [
      {
        id: 'v8',
        title: 'STR Fundamentals',
        description: 'Your first steps to success',
        thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=225&fit=crop',
        duration: '1h 5min',
        instructor: 'Sarah Chen',
        category: 'Foundational',
        level: 'Beginner',
        xp: 150,
        rating: 4.9,
        views: '22.1K',
      },
      {
        id: 'v9',
        title: 'Setting Up Your First Listing',
        description: 'Step-by-step guide',
        thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=225&fit=crop',
        duration: '35 min',
        instructor: 'James Mitchell',
        category: 'Getting Started',
        level: 'Beginner',
        xp: 60,
        rating: 4.7,
        views: '18.5K',
      },
      {
        id: 'v10',
        title: 'Understanding Your Market',
        description: 'Research like a pro',
        thumbnail: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&h=225&fit=crop',
        duration: '42 min',
        instructor: 'Emily Rodriguez',
        category: 'Strategy',
        level: 'Beginner',
        xp: 70,
        rating: 4.6,
        views: '11.2K',
      },
    ],
  },
  {
    id: 'masterclass',
    title: 'Masterclass Series',
    videos: [
      {
        id: 'v11',
        title: 'Building a Portfolio Empire',
        description: 'Scale to 10+ properties',
        thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=225&fit=crop',
        duration: '2h 15min',
        instructor: 'Sarah Chen',
        category: 'Masterclass',
        level: 'Master',
        xp: 500,
        isLocked: true,
      },
      {
        id: 'v12',
        title: 'Revenue Optimization Pro',
        description: 'Advanced pricing strategies',
        thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=225&fit=crop',
        duration: '1h 45min',
        instructor: 'Emily Rodriguez',
        category: 'Masterclass',
        level: 'Master',
        xp: 400,
        isLocked: true,
      },
      {
        id: 'v13',
        title: 'Luxury Market Secrets',
        description: 'Premium property positioning',
        thumbnail: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=225&fit=crop',
        duration: '1h 30min',
        instructor: 'Michael Park',
        category: 'Masterclass',
        level: 'Master',
        xp: 350,
        isLocked: true,
      },
    ],
  },
];

// Level badge colors
const levelColors = {
  Beginner: 'bg-emerald-500',
  Intermediate: 'bg-blue-500',
  Advanced: 'bg-violet-500',
  Master: 'bg-gold',
};

// Hero Banner Component
function HeroBanner({ video }: { video: Video }) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-16 max-w-3xl">
        {/* Category Badge */}
        <motion.div 
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={cn("px-3 py-1 rounded text-xs font-bold uppercase", levelColors[video.level])}>
            {video.level}
          </span>
          {video.isNew && (
            <span className="px-3 py-1 rounded bg-red-600 text-white text-xs font-bold uppercase">
              New
            </span>
          )}
          <span className="text-gold font-semibold">+{video.xp} XP</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {video.title}
        </motion.h1>

        {/* Description */}
        <motion.p 
          className="text-lg text-gray-300 mb-6 line-clamp-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {video.description}
        </motion.p>

        {/* Meta info */}
        <motion.div 
          className="flex items-center gap-4 text-sm text-gray-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gold fill-gold" />
            {video.rating}
          </span>
          <span>{video.views} views</span>
          <span>{video.duration}</span>
          <span>by {video.instructor}</span>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5 fill-black" />
            Play
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-gray-500/50 text-white font-semibold rounded hover:bg-gray-500/70 transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info className="w-5 h-5" />
            More Info
          </motion.button>
          <motion.button
            className="w-10 h-10 rounded-full bg-gray-500/30 border border-gray-500 flex items-center justify-center hover:bg-gray-500/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Mute button */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-24 right-8 w-10 h-10 rounded-full bg-gray-800/50 border border-gray-600 flex items-center justify-center hover:bg-gray-700/50 transition-colors"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}

// Video Card Component
function VideoCard({ video, index }: { video: Video; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-[300px] group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video rounded-md overflow-hidden bg-card">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Locked overlay */}
        {video.isLocked && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <Lock className="w-8 h-8 text-gold" />
          </div>
        )}

        {/* Progress bar */}
        {video.progress && !video.isLocked && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
            <div 
              className="h-full bg-red-600" 
              style={{ width: `${video.progress}%` }}
            />
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs font-medium">
          {video.duration}
        </div>

        {/* New badge */}
        {video.isNew && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 rounded text-xs font-bold uppercase">
            New
          </div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && !video.isLocked && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
              >
                <Play className="w-6 h-6 text-black fill-black ml-1" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expanded hover card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 w-[350px] bg-card rounded-lg shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Image */}
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              {video.isLocked && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-gold mx-auto mb-2" />
                    <p className="text-sm text-gold">Unlock with Pro</p>
                  </div>
                </div>
              )}
              {video.progress && !video.isLocked && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                  <div className="h-full bg-red-600" style={{ width: `${video.progress}%` }} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Action buttons */}
              <div className="flex items-center gap-2 mb-3">
                <motion.button
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  disabled={video.isLocked}
                >
                  <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                </motion.button>
                <motion.button
                  className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <ThumbsUp className="w-4 h-4" />
                </motion.button>
                <div className="flex-1" />
                <motion.button
                  className="w-10 h-10 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center hover:border-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-emerald-500 font-semibold">
                  {video.progress ? `${video.progress}% watched` : 'New to you'}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{video.duration}</span>
              </div>

              {/* Level & XP */}
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                  levelColors[video.level]
                )}>
                  {video.level}
                </span>
                <span className="text-gold text-sm font-semibold">+{video.xp} XP</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Basic info (always visible) */}
      <div className="mt-2 pr-2">
        <h3 className="font-medium text-sm text-foreground truncate">{video.title}</h3>
        <p className="text-xs text-muted-foreground">{video.instructor}</p>
      </div>
    </motion.div>
  );
}

// Video Row Component
function VideoRowComponent({ row }: { row: VideoRow }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0);
      setShowRightArrow(
        scrollRef.current.scrollLeft < 
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
      );
    }
  };

  return (
    <div className="relative group/row mb-8">
      {/* Row Title */}
      <h2 className="text-xl font-semibold text-foreground mb-4 px-8 md:px-16">
        {row.title}
      </h2>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <AnimatePresence>
          {showLeftArrow && (
            <motion.button
              className="absolute left-0 top-0 bottom-8 w-16 bg-gradient-to-r from-background to-transparent z-20 flex items-center justify-start pl-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
            >
              <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Videos */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-8 md:px-16 pb-4"
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {row.videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Right Arrow */}
        <AnimatePresence>
          {showRightArrow && (
            <motion.button
              className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-background to-transparent z-20 flex items-center justify-end pr-2 opacity-0 group-hover/row:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
            >
              <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors">
                <ChevronRight className="w-6 h-6" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Main Academy Component
export function NetflixAcademy() {
  return (
    <div className="min-h-screen bg-background -mx-4 -my-6 md:-mx-8 md:-my-8">
      {/* Hero Banner */}
      <HeroBanner video={featuredVideo} />

      {/* Video Rows */}
      <div className="relative z-10 -mt-32 pb-16">
        {videoRows.map((row) => (
          <VideoRowComponent key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
}

export default NetflixAcademy;



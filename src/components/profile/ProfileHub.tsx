import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Edit3, MapPin, Calendar, Link2, Star, 
  Trophy, Shield, Award, Zap, ChevronRight, Copy,
  Check, ExternalLink, Building2, Users, BookOpen,
  Settings, Bell, CreditCard, Lock, Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock user data
const user = {
  id: 'nicholas',
  name: 'Nicholas Miller',
  username: 'nicholas',
  email: 'nicholas@rentalier.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  banner: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=400&fit=crop',
  bio: 'Passionate about creating memorable guest experiences. Miami-based host focused on luxury short-term rentals.',
  location: 'Miami, FL',
  company: 'Miller Stays',
  website: 'millerstays.com',
  joinedDate: 'January 2024',
  level: 3,
  xp: 1250,
  xpToNext: 2000,
  tier: 'Candidate',
  stats: {
    properties: 2,
    reviews: 47,
    avgRating: 4.9,
    completedCourses: 5,
    communityPosts: 12,
  },
  badges: [
    { id: 'early-adopter', name: 'Early Adopter', icon: Star, color: 'text-gold' },
    { id: 'quick-learner', name: 'Quick Learner', icon: BookOpen, color: 'text-blue-400' },
    { id: 'community-helper', name: 'Community Helper', icon: Users, color: 'text-pink-400' },
  ],
  achievements: [
    { id: 'first-property', name: 'First Property', description: 'Listed your first property', progress: 100, icon: Building2 },
    { id: 'five-reviews', name: '5-Star Start', description: 'Received 5 five-star reviews', progress: 80, icon: Star },
    { id: 'course-complete', name: 'Scholar', description: 'Complete 10 courses', progress: 50, icon: BookOpen },
  ],
};

// Settings tabs
const settingsTabs = [
  { id: 'account', label: 'Account', icon: Settings },
  { id: 'profile', label: 'Profile', icon: Edit3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

// Profile Header Component
function ProfileHeader() {
  const [copied, setCopied] = useState(false);

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`rentalier.com/@${user.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-32 md:h-48 rounded-t-xl overflow-hidden relative">
        <img
          src={user.banner}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1f22] via-transparent to-transparent" />
        <button className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="absolute -top-16 left-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-[6px] border-[#1e1f22]"
            />
            <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black hover:bg-gold/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
            {/* Level Badge */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1e1f22] border-2 border-gold">
              <span className="text-xs font-bold text-gold">LVL {user.level}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 mb-16 md:mb-4">
          <motion.button
            onClick={copyProfileLink}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
          </motion.button>
          <motion.a
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-black font-medium hover:bg-gold/90 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Edit3 className="w-4 h-4" />
            <span className="text-sm">Edit Profile</span>
          </motion.a>
        </div>

        {/* Name & Info */}
        <div className="md:pl-40">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-xs font-semibold">
              {user.tier}
            </span>
          </div>
          <p className="text-gray-400 mb-3">@{user.username}</p>
          
          {user.bio && (
            <p className="text-gray-300 mb-4 max-w-xl">{user.bio}</p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {user.company && (
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {user.company}
              </span>
            )}
            {user.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.location}
              </span>
            )}
            {user.website && (
              <a href={`https://${user.website}`} className="flex items-center gap-1 text-gold hover:underline">
                <Link2 className="w-4 h-4" />
                {user.website}
              </a>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Joined {user.joinedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card
function StatsCard() {
  return (
    <div className="bg-[#2b2d31] rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatItem label="Properties" value={user.stats.properties} icon={Building2} />
        <StatItem label="Reviews" value={user.stats.reviews} icon={Star} />
        <StatItem label="Avg Rating" value={user.stats.avgRating.toFixed(1)} icon={Trophy} />
        <StatItem label="Courses" value={user.stats.completedCourses} icon={BookOpen} />
        <StatItem label="Posts" value={user.stats.communityPosts} icon={Users} />
      </div>
    </div>
  );
}

function StatItem({ label, value, icon: Icon }: { label: string; value: number | string; icon: React.ElementType }) {
  return (
    <div className="text-center">
      <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}

// XP Progress Card
function XPProgressCard() {
  const progress = (user.xp / user.xpToNext) * 100;

  return (
    <div className="bg-[#2b2d31] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Experience</h3>
        <span className="text-sm text-gold font-medium">{user.xp} / {user.xpToNext} XP</span>
      </div>
      
      <div className="relative h-4 bg-[#1e1f22] rounded-full overflow-hidden mb-2">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-amber-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-xs text-gray-400">{user.xpToNext - user.xp} XP to Level {user.level + 1}</p>
    </div>
  );
}

// Badges Card
function BadgesCard() {
  return (
    <div className="bg-[#2b2d31] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Badges</h3>
        <a href="/badges" className="text-xs text-gold hover:underline">View All</a>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {user.badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <motion.div
              key={badge.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e1f22] hover:bg-[#232428] transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <Icon className={cn("w-4 h-4", badge.color)} />
              <span className="text-sm text-gray-300">{badge.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Achievements Card
function AchievementsCard() {
  return (
    <div className="bg-[#2b2d31] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Achievements</h3>
        <a href="/achievements" className="text-xs text-gold hover:underline">View All</a>
      </div>
      
      <div className="space-y-3">
        {user.achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div key={achievement.id} className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                achievement.progress === 100 ? "bg-gold/20" : "bg-[#1e1f22]"
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  achievement.progress === 100 ? "text-gold" : "text-gray-500"
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-200">{achievement.name}</span>
                  <span className="text-xs text-gray-500">{achievement.progress}%</span>
                </div>
                <div className="h-1.5 bg-[#1e1f22] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold rounded-full transition-all"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Quick Settings Card
function QuickSettingsCard() {
  return (
    <div className="bg-[#2b2d31] rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Quick Settings</h3>
      
      <div className="space-y-1">
        {settingsTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <a
              key={tab.id}
              href={`/settings#${tab.id}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1e1f22] transition-colors group"
            >
              <Icon className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
              <span className="flex-1 text-sm text-gray-300 group-hover:text-white transition-colors">
                {tab.label}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Main Profile Component
export function ProfileHub() {
  return (
    <div className="space-y-6 -mx-4 -my-6 md:-mx-8 md:-my-8">
      {/* Profile Card */}
      <div className="bg-[#1e1f22] rounded-xl overflow-hidden mx-4 md:mx-8 mt-4 md:mt-8">
        <ProfileHeader />
      </div>

      {/* Content Grid */}
      <div className="px-4 md:px-8 pb-24 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <StatsCard />
            <XPProgressCard />
            <AchievementsCard />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <BadgesCard />
            <QuickSettingsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHub;



import type { UserProfile, JourneyStep } from './types';

export const mockUser: UserProfile = {
  id: 'user_123',
  full_name: 'Nicholas Miller',
  email: 'nicholas@rentalier.com',
  avatar_url: 'https://i.pravatar.cc/150?u=nicholas',
  company_name: 'Miller Stays',
  onboarding_completed: true,
  is_public: false,
  directory_opt_in: false,
  slug: 'nicholas',
  market: 'Miami, FL',
  role_type: 'Candidate'
};

export const mockJourneySteps: JourneyStep[] = [
  {
    id: 'photo',
    category: 'identity',
    label: 'Add profile photo',
    benefit: 'Profiles with photos get 31% more clicks',
    completed: true,
    locked: false,
    href: '/profile',
    xp: 25,
    priority: 1,
    weight: 10
  },
  {
    id: 'bio',
    category: 'identity',
    label: 'Write your bio',
    benefit: 'Connect with guests on a human level',
    completed: false,
    locked: false,
    href: '/profile',
    xp: 15,
    priority: 2,
    weight: 5
  },
  {
    id: 'first_property',
    category: 'properties',
    label: 'Add your first property',
    benefit: 'Unlock AI analysis and marketplace visibility',
    completed: false,
    locked: false,
    href: '/properties',
    xp: 50,
    priority: 3,
    weight: 15
  },
  {
    id: 'company_logo',
    category: 'company',
    label: 'Upload company logo',
    benefit: 'Professional branding increases trust',
    completed: false,
    locked: false,
    href: '/profile',
    xp: 20,
    priority: 4,
    weight: 5
  },
  {
    id: 'booking_url',
    category: 'properties',
    label: 'Add booking URL',
    benefit: 'Drive direct bookings from your profile',
    completed: false,
    locked: true,
    unlockAt: 60,
    href: '/properties',
    xp: 30,
    priority: 5,
    weight: 10
  }
];

export const mockStats = {
  xp: 1250,
  xpToNext: 250,
  rank: 'Candidate',
  exposure: 12,
  profileViews: 1240,
  bookingClicks: 34,
  completionPercentage: 12
};

export const mockProperties = [
  { 
    id: '1', 
    name: 'Sunset Beach House', 
    location: 'Destin, FL', 
    status: 'Published', 
    views: 1240, 
    bookings: 12,
    hero_image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    bedrooms: 4,
    bathrooms: 3,
    sleeps: 10
  },
  { 
    id: '2', 
    name: 'Lakeside Retreat', 
    location: 'Lake Tahoe, CA', 
    status: 'Draft', 
    views: 0, 
    bookings: 0,
    hero_image_url: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    bedrooms: 3,
    bathrooms: 2,
    sleeps: 8
  },
];

export const mockCourses = [
  {
    id: '1',
    title: 'The Stray Cat Method',
    slug: 'stray-cat',
    description: 'Master the art of high-impact, low-cost property differentiation.',
    level: 'Foundational',
    duration: '2.5 hrs',
    xp: 500,
    is_foundational: true,
    modules: 6,
    lessons: 24
  },
  {
    id: '2',
    title: 'Direct Booking Mastery',
    slug: 'direct-bookings',
    description: 'Build a direct booking engine that reduces OTA dependency.',
    level: 'Professional',
    duration: '4 hrs',
    xp: 750,
    is_foundational: false,
    modules: 8,
    lessons: 32
  },
  {
    id: '3',
    title: '5-Star Guest Experience',
    slug: 'guest-experience',
    description: 'Create memorable stays that generate reviews and referrals.',
    level: 'Advanced',
    duration: '3 hrs',
    xp: 600,
    is_foundational: false,
    modules: 5,
    lessons: 20
  }
];

export const getHydratedState = () => {
  return {
    user: mockUser,
    journey: mockJourneySteps,
    stats: mockStats,
    properties: mockProperties,
    courses: mockCourses
  };
};

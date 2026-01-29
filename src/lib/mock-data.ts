import type { UserProfile } from './types';

export const mockUser: UserProfile = {
  id: 'user_123',
  full_name: 'Nicholas',
  email: 'nicholas@example.com',
  avatar_url: undefined,
  company_name: 'Rentalier Pro',
  onboarding_completed: true,
  is_public: false,
  directory_opt_in: false,
  slug: 'nicholas',
  market: 'Miami, FL',
  role_type: 'Certified Rentalier'
};

export const mockStats = {
  xp: 0,
  xpToNext: 150,
  rank: 'Candidate',
  exposure: 0
};





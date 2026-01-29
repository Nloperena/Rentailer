// Unified Type System for Rentalier App Rebuild

export type StepCategory = 'identity' | 'company' | 'properties' | 'ai' | 'directory' | 'website' | 'social';

export interface JourneyStep {
  id: string;
  category: StepCategory;
  label: string;
  benefit?: string;
  description?: string;
  completed: boolean;
  locked: boolean;
  unlockAt?: number; // Percentage threshold
  href: string;
  xp?: number;
  priority: number;
  weight?: number; // For percentage calculation
}

export interface ActivationStage {
  id: StepCategory;
  title: string;
  description: string;
  icon: string;
  steps: JourneyStep[];
  completedCount: number;
  totalCount: number;
  isComplete: boolean;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  company_name?: string;
  company_logo_url?: string;
  bio?: string;
  market?: string;
  role_type: 'Candidate' | 'Professional';
  onboarding_completed: boolean;
  is_public: boolean;
  directory_opt_in: boolean;
  slug?: string;
}

// Consolidated Content Model
export type BlockType =
  | 'rich_text'
  | 'checklist'
  | 'image'
  | 'button_cta'
  | 'faq'
  | 'wifi'
  | 'access'
  | 'parking'
  | 'house_rules';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: any;
  order: number;
}

export interface Section {
  id: string;
  title: string;
  icon?: string;
  blocks: ContentBlock[];
  order: number;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  description?: string;
  hero_image_url?: string;
  is_published: boolean;
  bedrooms?: number;
  bathrooms?: number;
  sleeps?: number;
  booking_url?: string;
}

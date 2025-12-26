
import { LucideIcon } from 'lucide-react';

export enum ToolCategory {
  TEXT = 'Text & Content',
  IMAGE = 'Image Tools',
  CALCULATOR = 'Calculators',
  UTILITY = 'Utility Tools'
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  description: string;
  icon: LucideIcon;
  popular?: boolean;
  path: string;
  seoContent: {
    title: string;
    description: string;
    slug: string;
    h1: string;
    shortIntro: string;
    whatIs: string;
    howTo: string[];
    features: string[];
    whyUs: string[];
    whoCanUse: string;
    commonUseCases?: string[];
    benefits: string[];
    faqs: FAQ[];
    // Fix: Added optional privacyAndSecurity property to match data in constants.tsx
    privacyAndSecurity?: string;
  };
}
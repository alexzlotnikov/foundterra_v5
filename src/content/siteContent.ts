// Content loader functions
import englishContent from './languages/english.json';
import hebrewContent from './languages/hebrew.json';
import russianContent from './languages/russian.json';

// Legal content loaders
import privacyEn from './legal/privacy-en.json';
import privacyHe from './legal/privacy-he.json';
import privacyRu from './legal/privacy-ru.json';
import termsEn from './legal/terms-en.json';
import termsHe from './legal/terms-he.json';
import termsRu from './legal/terms-ru.json';
import cookiesEn from './legal/cookies-en.json';
import cookiesHe from './legal/cookies-he.json';
import cookiesRu from './legal/cookies-ru.json';

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  navigation: {
    logo: string;
    services: string;
    packages: string;
    process: string;
    about: string;
    resources: string;
    contact: string;
    languages: {
      english: string;
      hebrew: string;
      russian: string;
    };
  };
  cta: {
    bookSession: string;
    bookCall: string;
    explorePackages: string;
    accessResources: string;
    contact: string;
    calendlyLink: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: string[];
    limitedOffer: string;
    secondaryCta?: string;
  };
  problem?: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  bridge: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    qualifications: { title: string; description: string; }[] | string[];
    closing: string;
  };
  investorPerspective?: {
    title: string;
    subtitle?: string;
    quote: string;
    name: string;
    role: string;
    description: string;
  };
  entryPoints?: {
    title: string;
    items: {
      title: string;
      price: string;
      duration: string;
      description: string;
      cta: string;
    }[];
  };
  services: {
    title: string;
    subtitle: string;
    pitchDecks: {
      title: string;
      description: string;
      price: string;
      features: string[];
      subServices: { name: string; price: string; }[];
    };
    mvpDevelopment: {
      title: string;
      description: string;
      price: string;
      features: string[];
      subServices: { name: string; price: string; }[];
    };
    earlyTraction: {
      title: string;
      description: string;
      price: string;
      features: string[];
      subServices: { name: string; price: string; }[];
    };
  };
  packages: {
    title: string;
    subtitle: string;
    mostPopular: string;
    discountBanner: string;
    plans: {
      name: string;
      price: string;
      duration: string;
      description: string;
      features: string[];
      popular: boolean;
      cta?: string;
    }[];
  };
  process: {
    title: string;
    subtitle: string;
    steps: { 
      number: string;
      title: string; 
      subtitle?: string;
      description: string; 
    }[];
    result: string;
    cta?: string;
  };
  additionalServices: {
    title: string;
    services: {
      title: string;
      description: string;
      features: string[];
    }[];
  };
  whyChoose: {
    title: string;
    subtitle: string;
    reasons: { title: string; description: string; }[];
  };
  resources: {
    title: string;
    highlight: string;
    subtitle: string;
    items: { title: string; description: string; icon: string; }[];
    cta: string;
    ctaSubtext: string;
    emailDialog: {
      title: string;
      description: string;
      form: {
        emailLabel: string;
        emailPlaceholder: string;
        submit: string;
        submitting: string;
        cancel: string;
        privacy: string;
      };
      success: {
        title: string;
        description: string;
        redirectMessage: string;
        accessButton: string;
      };
      error: {
        title: string;
        description: string;
      };
    };
  };
  faq: {
    title: string;
    subtitle: string;
    questions: { question: string; answer: string; }[];
  };
  finalCTA: {
    title: string;
    highlight: string;
    offer: string;
    cardTitle: string;
    cardSubtitle: string;
    benefits: string[];
    primaryButton: string;
    alternativeText: string;
    email: string;
    finalPush: {
      title: string;
      subtitle: string;
      primaryButton: string;
      secondaryButton: string;
    };
  };
  footer: {
    tagline: string;
    email: string;
    sections: {
      title: string;
      links: { label: string; href: string; }[];
    }[];
    copyright: string;
  };
  pages: {
    contact?: {
      title: string;
      subtitle: string;
      email?: string | { title: string; description: string; };
      phone?: string | { title: string; description: string; value: string; };
      address?: string;
      hours?: string;
      calendly?: { title: string; description: string; };
      cta?: { title: string; description: string; button: string; };
      form?: {
        title: string;
        name: {
          label: string;
          placeholder: string;
        };
        email: {
          label: string;
          placeholder: string;
        };
        message: {
          label: string;
          placeholder: string;
        };
        submit: string;
        success: string;
        error: string;
      };
    };
    privacy: { title: string; lastUpdated: string; sections: { title: string; content: string; }[]; };
    terms: { title: string; lastUpdated: string; sections: { title: string; content: string; }[]; };
    cookies: { title: string; lastUpdated: string; sections: { title: string; content: string; }[]; };
    referral: { 
      title: string; 
      subtitle: string; 
      sections?: { title: string; content: string; }[]; 
      how?: { title: string; steps: { title: string; description: string; }[]; };
      benefits?: { title: string; items: { title: string; description: string; }[]; };
      cta?: { title: string; description: string; button: string; terms: string; };
    };
  };
  blog: {
    title: string;
    description: string;
    readMore: string;
    backToBlog: string;
    loading: string;
    noPosts: string;
    noPostsMessage: string;
  };
}

// Enhanced content with legal pages
const getEnhancedContent = (language: 'en' | 'he' | 'ru'): SiteContent => {
  const baseContent = language === 'en' ? englishContent : 
                     language === 'he' ? hebrewContent : russianContent;
  
  const legalContent = {
    privacy: language === 'en' ? privacyEn : language === 'he' ? privacyHe : privacyRu,
    terms: language === 'en' ? termsEn : language === 'he' ? termsHe : termsRu,
    cookies: language === 'en' ? cookiesEn : language === 'he' ? cookiesHe : cookiesRu
  };
  
  return {
    ...baseContent,
    pages: {
      ...baseContent.pages,
      privacy: legalContent.privacy,
      terms: legalContent.terms,
      cookies: legalContent.cookies
    }
  } as SiteContent;
};

// Function to get content by language
export const getContentByLanguage = (language: 'en' | 'he' | 'ru'): SiteContent => {
  return getEnhancedContent(language);
};

// Export content for backward compatibility
export const content = {
  english: englishContent as unknown as SiteContent,
  hebrew: hebrewContent as unknown as SiteContent,
  russian: russianContent as unknown as SiteContent,
};

// Export individual content for components that need it
export { englishContent, hebrewContent, russianContent };
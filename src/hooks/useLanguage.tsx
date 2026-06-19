import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getContentByLanguage, type SiteContent } from '@/content/siteContent';

type Language = 'en' | 'he' | 'ru';

interface LanguageContextType {
  language: Language;
  content: SiteContent;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const USER_LANGUAGE_KEY = 'preferred-language';
const ISRAEL_ENGLISH_OVERRIDE_KEY = 'israel-switched-english-once';

const getLanguageFromPath = (): Language => {
  if (typeof window === 'undefined') return 'en';
  return window.location.pathname.startsWith('/he') ? 'he' : 'en';
};

const getStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;

  const stored = window.localStorage.getItem(USER_LANGUAGE_KEY);
  if (stored === 'en' || stored === 'he' || stored === 'ru') {
    return stored;
  }

  return null;
};

const setStoredLanguage = (lang: Language) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USER_LANGUAGE_KEY, lang);
};

const hasIsraelEnglishOverride = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(ISRAEL_ENGLISH_OVERRIDE_KEY) === 'true';
};

const setIsraelEnglishOverride = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ISRAEL_ENGLISH_OVERRIDE_KEY, 'true');
};

const applyPathForLanguage = (lang: Language) => {
  if (typeof window === 'undefined') return;

  const current = window.location.pathname;
  let nextPath = current;

  if (lang === 'he' && !current.startsWith('/he')) {
    nextPath = current === '/' ? '/he' : `/he${current}`;
  }

  if (lang === 'en' && current.startsWith('/he')) {
    nextPath = current.replace(/^\/he/, '') || '/';
  }

  if (nextPath !== current) {
    window.history.replaceState({}, '', `${nextPath}${window.location.search}${window.location.hash}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
};

const detectCountryCode = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json() as { country_code?: string };
      if (data.country_code) return data.country_code;
    }
  } catch {
    // fall through to next provider
  }

  try {
    const response = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json() as { country_code?: string };
      if (data.country_code) return data.country_code;
    }
  } catch {
    // no-op
  }

  return null;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => getStoredLanguage() ?? getLanguageFromPath());
  const content = getContentByLanguage(language);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);

    if (lang === 'en') {
      setIsraelEnglishOverride();
    }
  };

  useEffect(() => {
    const syncFromPath = () => {
      const detected = getLanguageFromPath();
      setLanguageState((prev) => (prev === detected ? prev : detected));
    };

    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, []);

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    if (storedLanguage) return;

    let isCancelled = false;

    const applyGeoLanguage = async () => {
      const countryCode = (await detectCountryCode())?.toUpperCase();
      if (isCancelled) return;

      const isIsraeliUser = countryCode === 'IL';
      const nextLanguage: Language = isIsraeliUser && !hasIsraelEnglishOverride() ? 'he' : 'en';

      setLanguageState(nextLanguage);
      applyPathForLanguage(nextLanguage);
    };

    void applyGeoLanguage();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, content, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getContentByLanguage, type SiteContent } from '@/content/siteContent';
import { safeStorage } from '@/utils/storage';
import { getLanguageFromPathname } from '@/utils/languagePath';

export type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  content: SiteContent;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const USER_LANGUAGE_KEY = 'preferred-language';

const persistLanguageCookie = (lang: Language) => {
  if (typeof document === 'undefined') return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${USER_LANGUAGE_KEY}=${lang}; Max-Age=31536000; Path=/; SameSite=Lax${secure}`;
};

const getLanguageFromPath = (): Language =>
  typeof window === 'undefined' ? 'en' : getLanguageFromPathname(window.location.pathname);

const getStoredLanguage = (): Language | null => {
  if (typeof window === 'undefined') return null;

  const stored = safeStorage.getItem('localStorage', USER_LANGUAGE_KEY);
  if (stored === 'en' || stored === 'he') {
    return stored;
  }

  return null;
};

const setStoredLanguage = (lang: Language) => {
  if (typeof window === 'undefined') return;
  safeStorage.setItem('localStorage', USER_LANGUAGE_KEY, lang);
  persistLanguageCookie(lang);
};

export const LanguageProvider = ({ children, initialLanguage }: { children: ReactNode; initialLanguage?: Language }) => {
  const [language, setLanguageState] = useState<Language>(() => initialLanguage ?? getLanguageFromPath());
  const content = getContentByLanguage(language);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);

  };

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    if (storedLanguage) {
      persistLanguageCookie(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const syncFromPath = () => {
      const detected = getLanguageFromPath();
      setLanguageState((prev) => (prev === detected ? prev : detected));
    };

    if (!initialLanguage) syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, [initialLanguage]);

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

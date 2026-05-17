'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { en, zh, type Dictionary } from './dictionaries';

export type Locale = 'en' | 'zh';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const DICTS: Record<Locale, Dictionary> = { en, zh };

export function LocaleProvider({ children }: { children: ReactNode }) {
  // SSR-safe initial: always 'en'. Client mount reads stored / navigator preference.
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const saved = (typeof window !== 'undefined' && window.localStorage.getItem('codeindex-locale')) as Locale | null;
      if (saved === 'en' || saved === 'zh') {
        setLocaleState(saved);
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('zh')) {
        setLocaleState('zh');
      }
    } catch {}
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try { window.localStorage.setItem('codeindex-locale', l); } catch {}
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: DICTS[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within <LocaleProvider>');
  return ctx;
}

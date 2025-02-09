"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import cs from "@/locales/cs.json";
import en from "@/locales/en.json";

const translations = { cs, en };

const LanguageContext = createContext({
  locale: "en",
  setLocale: (locale: string) => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState("en");

  // Načti jazyk z localStorage při prvním renderu
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && translations[savedLocale]) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: string) => {
    if (translations[newLocale]) {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale); // Ulož do localStorage
    }
  };

  const t = (key: string) => {
    return key.split(".").reduce((o, i) => o?.[i], translations[locale]) || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import cs from "@/locales/cs.json";
import en from "@/locales/en.json";

const translations: Record<string, any> = { cs, en }; // 🛠 Přidán explicitní typ

type LocaleType = "cs" | "en"; // 🛠 Definujeme možné hodnoty

const LanguageContext = createContext({
  locale: "en" as LocaleType,
  setLocale: (locale: LocaleType) => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<LocaleType>("en");

  // Načti jazyk z localStorage při prvním renderu
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as LocaleType | null;
    if (savedLocale && translations[savedLocale]) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: LocaleType) => {
    if (translations[newLocale]) {
      setLocaleState(newLocale);
      localStorage.setItem("locale", newLocale); // Ulož do localStorage
    }
  };

  const t = (key: string) => {
    return key.split(".").reduce((o, i) => (o as any)?.[i], translations[locale]) || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

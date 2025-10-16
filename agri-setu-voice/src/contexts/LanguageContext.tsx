import { createContext, useContext, useState, ReactNode } from "react";

type Language = "kn" | "hi" | "mr" | "en";

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  kn: {
    market: "मार्केट",
    marketplace: "विक्रेता",
    about: "आमचे",
    help: "मदत",
    profile: "प्रोफाइल",
    todayMarket: "आजची मार्केट किंमत",
    searchCrop: "पीक शोधा",
    liveBuyers: "Live Buyers",
    viewMarket: "मार्केट किंमत पहा",
    talkToAssistant: "AgriSetu शी बोला",
  },
  hi: {
    market: "बाजार",
    marketplace: "विक्रेता",
    about: "हमारे बारे में",
    help: "मदद",
    profile: "प्रोफ़ाइल",
    todayMarket: "आज की बाजार कीमत",
    searchCrop: "फसल खोजें",
    liveBuyers: "लाइव खरीदार",
    viewMarket: "बाजार कीमत देखें",
    talkToAssistant: "AgriSetu से बात करें",
  },
  mr: {
    market: "बाजार",
    marketplace: "विक्रेता",
    about: "आमच्याबद्दल",
    help: "मदत",
    profile: "प्रोफाइल",
    todayMarket: "आजची बाजार किंमत",
    searchCrop: "पीक शोधा",
    liveBuyers: "लाइव खरेदीदार",
    viewMarket: "बाजार किंमत पहा",
    talkToAssistant: "AgriSetu शी बोला",
  },
  en: {
    market: "Market",
    marketplace: "Marketplace",
    about: "About",
    help: "Help",
    profile: "Profile",
    todayMarket: "Today's Market Prices",
    searchCrop: "Search Crop",
    liveBuyers: "Live Buyers",
    viewMarket: "View Market Prices",
    talkToAssistant: "Talk to AgriSetu",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<Language>("kn");

  const t = (key: string) => {
    return translations[currentLang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

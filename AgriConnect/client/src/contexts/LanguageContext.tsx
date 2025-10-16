import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "ta" | "te" | "kn" | "mr" | "bn" | "gu";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translatedContent: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const initialKeys = [
  "Market", "Marketplace", "About", "Help", "Dashboard", "Login", "Register", "Logout",
  "Welcome back", "Total Earnings", "This Month", "Active Listings", "Pending Orders",
  "Market Prices", "View All", "Smart Recommendations", "My Listings", "Buyer Requirements",
  "Recent Messages", "Sales History", "Trends", "Add Listing", "Contact Buyer",
  "Send Message", "Language", "Profile", "Messages", "Analytics", "Settings",
  "🌾 Digital Bridge for Your Farm",
  "Connecting Farmers.",
  "Empowering Agriculture.",
  "Real-time market prices, direct buyers and voice assistant. Conduct business in your regional language.",
  "View Market Prices",
  "Talk to AgriSetu",
  "Farmers",
  "Mandis",
  "Support",
  "Hero Image Placeholder",
  "Live Buyers",
  "Today's Market Prices",
  "View real-time mandi prices and trends. Search using voice!",
  "Search crop (e.g., Tomato, Onion)...",
  "Last updated: Today 2:30 PM",
  "Live Updates",
  "🌾 Wheat prices up in Pune by $5/quintal • 🌶️ Chilli demand high in Belgaum • 🧅 Onion export news from Nashik • 🍅 Tomato season peak in Goa",
  "I'm listening... How can I help?",
  "Speak in Your Voice",
  "AgriSetu understands Konkani, Hindi and Marathi. Ask questions, search prices, or register crops.",
  "🎤 I'm listening...",
  "Press mic to start speaking",
  "Example Questions:",
  "What is the price of tomatoes today?",
  "Register my new crop",
  "Who are the buyers in Goa?",
  "Konkani",
  "Hindi",
  "Marathi",
  "English",
  "Today's Marketplace",
  "Buy directly from farmers. Sell your produce.",
  "✓ Verified",
  "Quantity:",
  "Quality:",
  "Chat",
  "Buy",
  "View All Listings",
  "AgriSetu",
  "Digital bridge between farmers and market. In your language, for you.",
  "Quick Links",
  "Market Prices",
  "Marketplace",
  "About Us",
  "Help Center",
  "For Farmers",
  "Register",
  "List Crop",
  "Find Buyers",
  "Education",
  "Contact",
  "📞 1800-AGRI-SETU",
  "📧 help@agrisetu.com",
  "⏰ 24/7 Available",
  "© 2025 AgriSetu. All rights reserved. | Privacy Policy | Terms & Conditions"
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "en";
  });
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});

  const t = (key: string): string => {
    return translatedContent[key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const fetchTranslations = async (keys: string[], targetLang: Language) => {
    if (targetLang === "en") {
      const englishTranslations: Record<string, string> = {};
      keys.forEach(key => {
        englishTranslations[key] = key;
      });
      setTranslatedContent(englishTranslations);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texts: keys, target_lang: targetLang }),
      });
      const data = await response.json();
      if (data.translated_texts) {
        const newTranslations: Record<string, string> = {};
        keys.forEach((key, index) => {
          newTranslations[key] = data.translated_texts[index];
        });
        setTranslatedContent(newTranslations);
      } else {
        console.error("Translation API error:", data.error);
        const fallbackTranslations: Record<string, string> = {};
        keys.forEach(key => {
          fallbackTranslations[key] = key;
        });
        setTranslatedContent(fallbackTranslations);
      }
    } catch (error) {
      console.error("Error fetching translations:", error);
      const fallbackTranslations: Record<string, string> = {};
      keys.forEach(key => {
        fallbackTranslations[key] = key;
      });
      setTranslatedContent(fallbackTranslations);
    }
  };

  useEffect(() => {
    fetchTranslations(initialKeys, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, translatedContent }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export const languageOptions = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "mr", name: "मराठी" },
  { code: "bn", name: "বাংলা" },
  { code: "gu", name: "ગુજરાતી" },
];

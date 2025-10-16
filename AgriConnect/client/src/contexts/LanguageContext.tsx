import { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "ta" | "te" | "kn" | "mr" | "bn" | "gu" | "ml" | "kok" | "pa" | "or" | "as" | "brx" | "doi" | "ks" | "mai" | "mni" | "ne" | "sa" | "sat" | "sd" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translatedContent: Record<string, string>;
  isLoadingTranslations: boolean;
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
  "© 2025 AgriSetu. All rights reserved. | Privacy Policy | Terms & Conditions",
  "Farmer",
  "Total Earnings",
  "+12.5% from last month",
  "This Month",
  "+8.2% from last month",
  "Active Listings",
  "3 pending approval",
  "Buyer Interests",
  "5 new this week",
  "Welcome back,",
  "Here's what's happening with your farm today",
  "No recommendations available yet.",
  "Add more produce listings to get insights.",
  "Previous:",
  "confidence",
  "Reason:",
  "Best market:",
  "Estimated additional profit:",
  "Translating page...",
  // Additional keys for landing page
  "AgriMandi"
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "en";
  });
  const [translatedContent, setTranslatedContent] = useState<Record<string, string>>({});
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);

  const fetchTranslations = async (keys: string[], targetLang: Language) => {
    // Only proceed if there are keys to translate
    if (!keys || keys.length === 0) {
      setIsLoadingTranslations(false);
      return;
    }
    
    setIsLoadingTranslations(true);
    if (targetLang === "en") {
      const englishTranslations: Record<string, string> = {};
      keys.forEach(key => {
        englishTranslations[key] = key;
      });
      setTranslatedContent(prev => ({...prev, ...englishTranslations}));
      setIsLoadingTranslations(false);
      return;
    }

    // Split into smaller batches to prevent API overloading
    const batchSize = 20;
    const allTranslations: Record<string, string> = {};

    try {
      for (let i = 0; i < keys.length; i += batchSize) {
        const batch = keys.slice(i, i + batchSize);
        
        console.log(`Fetching translation batch: ${batch.length} keys for ${targetLang}`);
        console.log(`Translation API URL: http://localhost:8001/translate`);
        
        const response = await fetch("http://localhost:8001/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ texts: batch, target_lang: targetLang }),
        });
        
        console.log(`Response status: ${response.status}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`API response:`, data);
        
        if (data.translated_texts && Array.isArray(data.translated_texts)) {
          batch.forEach((key, index) => {
            if (index < data.translated_texts.length) {
              allTranslations[key] = data.translated_texts[index];
            } else {
              allTranslations[key] = key; // fallback if lengths don't match
            }
          });
        } else {
          console.error("Translation API error:", data.error || "No translated_texts in response");
          batch.forEach(key => {
            allTranslations[key] = key;
          });
        }
        
        // Update state incrementally so user sees progress
        setTranslatedContent(prev => ({...prev, ...allTranslations}));
      }
    } catch (error) {
      console.error("Error fetching translations:", error);
      console.error("This error usually means the translation API server is not running.");
      console.error("Make sure to start the translation server at http://localhost:8000");
      
      // Fallback: just use original keys as translations for now
      keys.forEach(key => {
        allTranslations[key] = key;
      });
    } finally {
      // Set all translations at the end
      setTranslatedContent(prev => ({...prev, ...allTranslations}));
      setIsLoadingTranslations(false);
    }
  };

  useEffect(() => {
    fetchTranslations(initialKeys, language);
  }, [language]);

  const t = (key: string): string => {
    return translatedContent[key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setTranslatedContent({}); // Clear existing translations
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, translatedContent, isLoadingTranslations }}>
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
  { code: "ml", name: "മലയാളം" },
  { code: "kok", name: "कोंकणी" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "as", name: "অসমীয়া" },
  { code: "brx", name: "बड़ो" },
  { code: "doi", name: "डोगरी" },
  { code: "ks", name: "کٲشُر" },
  { code: "mai", name: "मैथिली" },
  { code: "mni", name: "ꯃꯤꯇꯩ ꯂꯣꯟ" },
  { code: "ne", name: "नेपाली" },
  { code: "sa", name: "संस्कृतम्" },
  { code: "sat", name: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "sd", name: "سنڌي" },
  { code: "ur", name: "اردو" },
];

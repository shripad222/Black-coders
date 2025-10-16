import { createContext, useContext, useState } from "react";

type Language = "en" | "hi" | "ta" | "te" | "kn" | "mr" | "bn" | "gu";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    market: "Market Prices",
    marketplace: "Marketplace",
    messages: "Messages",
    analytics: "Analytics",
    settings: "Settings",
    logout: "Logout",
    welcome: "Welcome back",
    totalEarnings: "Total Earnings",
    thisMonth: "This Month",
    activeListing: "Active Listings",
    pendingOrders: "Pending Orders",
    marketPrices: "Market Prices",
    viewAll: "View All",
    smartRecommendations: "Smart Recommendations",
    myListings: "My Listings",
    buyerRequirements: "Buyer Requirements",
    recentMessages: "Recent Messages",
    salesHistory: "Sales History",
    trends: "Trends",
    addListing: "Add Listing",
    contactBuyer: "Contact Buyer",
    sendMessage: "Send Message",
    language: "Language",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    profile: "प्रोफाइल",
    market: "बाजार मूल्य",
    marketplace: "बाज़ार",
    messages: "संदेश",
    analytics: "विश्लेषण",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    welcome: "वापसी पर स्वागत है",
    totalEarnings: "कुल कमाई",
    thisMonth: "इस महीने",
    activeListing: "सक्रिय सूचियाँ",
    pendingOrders: "लंबित आदेश",
    marketPrices: "बाजार मूल्य",
    viewAll: "सभी देखें",
    smartRecommendations: "स्मार्ट सिफारिशें",
    myListings: "मेरी सूचियाँ",
    buyerRequirements: "खरीदार की आवश्यकताएं",
    recentMessages: "हाल के संदेश",
    salesHistory: "बिक्री इतिहास",
    trends: "रुझान",
    addListing: "सूची जोड़ें",
    contactBuyer: "खरीदार से संपर्क करें",
    sendMessage: "संदेश भेजें",
    language: "भाषा",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    profile: "சுயவிவரம்",
    market: "சந்தை விலைகள்",
    marketplace: "சந்தைஇடம்",
    messages: "செய்திகள்",
    analytics: "பகுப்பாய்வு",
    settings: "அமைப்புகள்",
    logout: "வெளியேறு",
    welcome: "மீண்டும் வரவேற்கிறோம்",
    totalEarnings: "மொத்த வருவாய்",
    thisMonth: "இந்த மாதம்",
    activeListing: "செயலில் பட்டியல்கள்",
    pendingOrders: "நிலுவையில் உள்ள ஆர்டர்கள்",
    marketPrices: "சந்தை விலைகள்",
    viewAll: "அனைத்தையும் பார்க்க",
    smartRecommendations: "திறமையான பரிந்துரைகள்",
    myListings: "என் பட்டியல்கள்",
    buyerRequirements: "வாங்குபவர் தேவைகள்",
    recentMessages: "சமீபத்திய செய்திகள்",
    salesHistory: "விற்பனை வரலாறு",
    trends: "போக்குகள்",
    addListing: "பட்டியல் சேர்க்கவும்",
    contactBuyer: "வாங்குபவரை தொடர்பு கொள்ளுங்கள்",
    sendMessage: "செய்தி அனுப்பு",
    language: "மொழி",
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    profile: "ప్రొఫైల్",
    market: "మార్కెట్ ధరలు",
    marketplace: "మార్కెట్‌ప్లేస్",
    messages: "సందేశాలు",
    analytics: "విశ్లేషణలు",
    settings: "సెట్టింగ్‌లు",
    logout: "లాగౌట్",
    welcome: "తిరిగి స్వాగతం",
    totalEarnings: "మొత్తం ఆదాయం",
    thisMonth: "ఈ నెల",
    activeListing: "క్రియాశీల జాబితాలు",
    pendingOrders: "పెండింగ్ ఆర్డర్లు",
    marketPrices: "మార్కెట్ ధరలు",
    viewAll: "అన్నీ చూడండి",
    smartRecommendations: "స్మార్ట్ సిఫార్సులు",
    myListings: "నా జాబితాలు",
    buyerRequirements: "కొనుగోలుదారు అవసరాలు",
    recentMessages: "ఇటీవలి సందేశాలు",
    salesHistory: "అమ్మకాల చరిత్ర",
    trends: "ట్రెండ్‌లు",
    addListing: "జాబితా జోడించండి",
    contactBuyer: "కొనుగోలుదారుని సంప్రదించండి",
    sendMessage: "సందేశం పంపండి",
    language: "భాష",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    profile: "ಪ್ರೊಫೈಲ್",
    market: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    marketplace: "ಮಾರುಕಟ್ಟೆ ಸ್ಥಳ",
    messages: "ಸಂದೇಶಗಳು",
    analytics: "ವಿಶ್ಲೇಷಣೆ",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    logout: "ಲಾಗ್ ಔಟ್",
    welcome: "ಮರಳಿ ಸ್ವಾಗತ",
    totalEarnings: "ಒಟ್ಟು ಗಳಿಕೆ",
    thisMonth: "ಈ ತಿಂಗಳು",
    activeListing: "ಸಕ್ರಿಯ ಪಟ್ಟಿಗಳು",
    pendingOrders: "ಬಾಕಿ ಇರುವ ಆದೇಶಗಳು",
    marketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    viewAll: "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ",
    smartRecommendations: "ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸುಗಳು",
    myListings: "ನನ್ನ ಪಟ್ಟಿಗಳು",
    buyerRequirements: "ಖರೀದಿದಾರರ ಅವಶ್ಯಕತೆಗಳು",
    recentMessages: "ಇತ್ತೀಚಿನ ಸಂದೇಶಗಳು",
    salesHistory: "ಮಾರಾಟ ಇತಿಹಾಸ",
    trends: "ಪ್ರವೃತ್ತಿಗಳು",
    addListing: "ಪಟ್ಟಿ ಸೇರಿಸಿ",
    contactBuyer: "ಖರೀದಿದಾರನನ್ನು ಸಂಪರ್ಕಿಸಿ",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    language: "ಭಾಷೆ",
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    profile: "प्रोफाइल",
    market: "बाजार किंमती",
    marketplace: "बाजारपेठ",
    messages: "संदेश",
    analytics: "विश्लेषण",
    settings: "सेटिंग्ज",
    logout: "लॉग आउट",
    welcome: "परत स्वागत आहे",
    totalEarnings: "एकूण कमाई",
    thisMonth: "या महिन्यात",
    activeListing: "सक्रिय यादी",
    pendingOrders: "प्रलंबित ऑर्डर",
    marketPrices: "बाजार किंमती",
    viewAll: "सर्व पहा",
    smartRecommendations: "स्मार्ट शिफारसी",
    myListings: "माझ्या यादी",
    buyerRequirements: "खरेदीदाराच्या गरजा",
    recentMessages: "अलीकडील संदेश",
    salesHistory: "विक्री इतिहास",
    trends: "ट्रेंड",
    addListing: "यादी जोडा",
    contactBuyer: "खरेदीदाराशी संपर्क साधा",
    sendMessage: "संदेश पाठवा",
    language: "भाषा",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    profile: "প্রোফাইল",
    market: "বাজার মূল্য",
    marketplace: "বাজারস্থল",
    messages: "বার্তা",
    analytics: "বিশ্লেষণ",
    settings: "সেটিংস",
    logout: "লগ আউট",
    welcome: "ফিরে স্বাগতম",
    totalEarnings: "মোট আয়",
    thisMonth: "এই মাস",
    activeListing: "সক্রিয় তালিকা",
    pendingOrders: "মুলতুবি আদেশ",
    marketPrices: "বাজার মূল্য",
    viewAll: "সব দেখুন",
    smartRecommendations: "স্মার্ট সুপারিশ",
    myListings: "আমার তালিকা",
    buyerRequirements: "ক্রেতার প্রয়োজনীয়তা",
    recentMessages: "সাম্প্রতিক বার্তা",
    salesHistory: "বিক্রয় ইতিহাস",
    trends: "ট্রেন্ড",
    addListing: "তালিকা যোগ করুন",
    contactBuyer: "ক্রেতার সাথে যোগাযোগ করুন",
    sendMessage: "বার্তা পাঠান",
    language: "ভাষা",
  },
  gu: {
    dashboard: "ડૅશબોર્ડ",
    profile: "પ્રોફાઇલ",
    market: "બજાર ભાવ",
    marketplace: "બજાર સ્થળ",
    messages: "સંદેશાઓ",
    analytics: "વિશ્લેષણ",
    settings: "સેટિંગ્સ",
    logout: "લૉગ આઉટ",
    welcome: "પાછા સ્વાગત છે",
    totalEarnings: "કુલ કમાણી",
    thisMonth: "આ મહિને",
    activeListing: "સક્રિય યાદી",
    pendingOrders: "બાકી ઓર્ડર",
    marketPrices: "બજાર ભાવ",
    viewAll: "બધું જુઓ",
    smartRecommendations: "સ્માર્ટ ભલામણો",
    myListings: "મારી યાદી",
    buyerRequirements: "ખરીદદારની જરૂરિયાતો",
    recentMessages: "તાજેતરના સંદેશાઓ",
    salesHistory: "વેચાણ ઇતિહાસ",
    trends: "ટ્રેન્ડ્સ",
    addListing: "યાદી ઉમેરો",
    contactBuyer: "ખરીદદાર સાથે સંપર્ક કરો",
    sendMessage: "સંદેશ મોકલો",
    language: "ભાષા",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "en";
  });

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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

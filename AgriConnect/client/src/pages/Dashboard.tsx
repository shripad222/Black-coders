import { IndianRupee, Package, Volume2, Mic, Thermometer, Sun, CloudRain, Brain, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { MarketPriceCard } from "@/components/MarketPriceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile } from "@/utils/supabase";
import { useEffect, useState } from "react";

// Define types locally
interface MarketPrice {
    id: string;
    commodity: string;
    variety: string;
    min_price: number;
    max_price: number;
    modal_price: number;
    market: string;
    district: string;
    state: string;
    timestamp: string;
}

interface TopCrop {
    name: string;
    scientificName: string;
    imageUrl: string;
    confidenceScore: number;
    description: string;
    climateSuitability: {
        temperature: string;
        rainfall: string;
        season: string;
    };
}

interface OtherCrop {
    name: string;
    description: string;
    imageUrl: string;
    confidenceScore: number;
}

export default function Dashboard() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [userName, setUserName] = useState<string | null>(null);
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [analysisState, setAnalysisState] = useState<'initial' | 'loading' | 'results'>('initial');
    const [loadingText, setLoadingText] = useState('Preparing analysis...');

    // Mock data
    const locationData = {
        location: "Panaji, Goa",
        temperature: "28°C",
        rainfall: "Light Rain",
        season: "Monsoon"
    };

    const topCrop: TopCrop = {
        name: "Coconut Palm",
        scientificName: "Cocos nucifera",
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop&crop=center",
        confidenceScore: 95,
        description: "A perfect match for coastal Goa. Coconuts have high economic value from oil, tourism, and copra.",
        climateSuitability: {
            temperature: "25-30°C",
            rainfall: "High Tolerance",
            season: "Year-Round"
        }
    };

    const otherCrops: OtherCrop[] = [
        {
            name: "Cashew",
            imageUrl: "https://images.unsplash.com/photo-1609501676725-7186f496903b?w=300&h=200&fit=crop&crop=center",
            confidenceScore: 85,
            description: "Excellent secondary crop with good export potential."
        },
        {
            name: "Rice (Kharif)",
            imageUrl: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=300&h=200&fit=crop&crop=center",
            confidenceScore: 78,
            description: "A staple crop that is very suitable for local paddy fields."
        }
    ];

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user?.id) {
                try {
                    const profile = await getUserProfile(user.id);
                    setUserName(profile?.name || t('Farmer'));
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setUserName(user.user_metadata?.name || user.email?.split('@')[0] || t('Farmer'));
                }
            }
        };
        fetchUserProfile();
    }, [user, t]);

    const { data: marketPrices, isLoading: pricesLoading } = useQuery<MarketPrice[]>({
        queryKey: ["/api/market-prices"],
    });

    const handleVoiceRead = () => {
        setIsVoiceActive(!isVoiceActive);
        if (!isVoiceActive && 'speechSynthesis' in window) {
            const text = `Welcome back ${userName}. The top recommended crop for your farm is ${topCrop.name}. It is a ${topCrop.confidenceScore}% match.`;
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);

            utterance.onend = () => setIsVoiceActive(false);
        } else {
            speechSynthesis.cancel();
        }
    };

    const handleStartAnalysis = () => {
        setAnalysisState('loading');
        const messages = [
            "Analyzing local soil composition...",
            "Checking climate patterns...",
            "Cross-referencing market demand...",
            "Calculating optimal crop match...",
        ];
        let messageIndex = 0;
        setLoadingText(messages[messageIndex]);

        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1);
            setLoadingText(messages[messageIndex % messages.length]);
        }, 1200);

        setTimeout(() => {
            clearInterval(intervalId);
            setAnalysisState('results');
        }, 5000);
    };

    const stats = [
        {
            title: t("Total Earnings"),
            value: "₹1,24,350",
            change: t("+12.5% from last month"),
            changeType: "positive" as const,
            icon: IndianRupee,
        },
        {
            title: t("Your Market Activity"),
            value: "12 Active Listings",
            change: t("24 buyer interests"),
            changeType: "neutral" as const,
            icon: Package,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-bold">
                        {t("Welcome,")} {userName || t('Farmer')}! 🌾
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {locationData.location} • {locationData.temperature} • {locationData.rainfall} ({locationData.season})
                    </p>
                </div>
                <Button onClick={handleVoiceRead} variant="outline" disabled={analysisState !== 'results'}>
                    {/* CORRECTED: Increased icon size to h-6 w-6 */}
                    {isVoiceActive ? <Volume2 className="h-6 w-6 mr-2 animate-pulse" /> : <Mic className="h-6 w-6 mr-2" />}
                    {isVoiceActive ? t("Speaking...") : t("Read Summary")}
                </Button>
            </div>

            {/* Main Recommendation Card */}
            <Card className="border-2 border-primary/50 shadow-xl">
                <CardHeader>
                    <CardTitle className="font-heading text-3xl flex items-center gap-3">
                        <Brain className="h-8 w-8 text-primary"/>
                        {t("Top Recommendation for Your Farm")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="min-h-[500px] flex flex-col justify-center items-center">
                    {analysisState === 'initial' && (
                        <div className="text-center">
                            <p className="text-lg text-muted-foreground mb-4">{t("Tap the microphone to start the analysis")}</p>
                            {/* Microphone button for analysis start */}
                            <Button size="lg" className="rounded-full w-24 h-24" onClick={handleStartAnalysis}>
                                <Mic className="w-24 h-24"/>
                            </Button>
                        </div>
                    )}

                    {analysisState === 'loading' && (
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="relative w-48 h-48">
                                <div className="absolute top-1/2 left-1/4 w-1 h-8 bg-primary/70 rounded-full animate-rain-1"></div>
                                <div className="absolute top-1/2 left-1/2 w-1 h-12 bg-primary/70 rounded-full animate-rain-2"></div>
                                <div className="absolute top-1/2 left-3/4 w-1 h-6 bg-primary/70 rounded-full animate-rain-3"></div>
                                <div className="absolute top-1/2 left-1/3 w-1 h-10 bg-primary/70 rounded-full animate-rain-4"></div>
                            </div>
                            <p className="text-2xl font-semibold text-primary">{loadingText}</p>
                            <p className="text-muted-foreground">{t("Please wait, this will just take a moment...")}</p>
                        </div>
                    )}

                    {analysisState === 'results' && (
                        <div className="flex flex-col items-center gap-6 text-center w-full">
                            <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-lg border-4 border-primary/20">
                                <img src={topCrop.imageUrl} alt={topCrop.name} className="absolute inset-0 w-full h-full object-cover" />
                                <div className="absolute top-6 left-1/2 -translate-x-1/2">
                                    <Badge className="text-xl px-4 py-2 bg-green-600 text-white">{topCrop.confidenceScore}% {t("Match")}</Badge>
                                </div>
                            </div>
                            <div className="grid w-full max-w-lg grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                                <div className="flex flex-col items-center gap-1">
                                    <Thermometer className="h-6 w-6 text-red-500" /><span className="text-sm font-semibold text-muted-foreground">{t("Temperature")}</span><span className="text-lg font-bold">{topCrop.climateSuitability.temperature}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <CloudRain className="h-6 w-6 text-blue-500" /><span className="text-sm font-semibold text-muted-foreground">{t("Rainfall")}</span><span className="text-lg font-bold">{topCrop.climateSuitability.rainfall}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Sun className="h-6 w-6 text-orange-500" /><span className="text-sm font-semibold text-muted-foreground">{t("Season")}</span><span className="text-lg font-bold">{topCrop.climateSuitability.season}</span>
                                </div>
                            </div>
                            <div className="w-full max-w-xl">
                                <h3 className="text-4xl font-bold text-foreground mb-1">{topCrop.name}</h3>
                                <p className="text-muted-foreground italic text-lg">{topCrop.scientificName}</p>
                                <p className="text-xl mt-4 leading-relaxed">{topCrop.description}</p>
                                <div className="space-y-3 p-4 bg-muted/50 rounded-lg mt-8 text-left">
                                    <h4 className="font-semibold text-xl mb-2">{t("Why this crop is a good fit:")}</h4>
                                    <div className="flex items-center gap-3 text-lg"><CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" /><span>{t("Your local climate is ideal.")}</span></div>
                                    <div className="flex items-center gap-3 text-lg"><CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" /><span>{t("The soil on your farm is very suitable.")}</span></div>
                                    <div className="flex items-center gap-3 text-lg"><CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" /><span>{t("Good market access from your location.")}</span></div>
                                </div>
                                <Button size="lg" className="w-full text-xl py-7 mt-8">{t("Learn More & Start Growing")}</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {stats.map((stat) => (<StatCard key={stat.title} {...stat} />))}
            </div>

            {/* Market Prices & Other Crops */}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-heading text-2xl font-semibold">📈 {t("Live Market Prices")}</h2>
                        <Button variant="ghost" size="sm">{t("View All")} →</Button>
                    </div>
                    {pricesLoading ? (<Skeleton className="h-40 w-full" />) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {marketPrices?.slice(0, 4).map((price) => (<MarketPriceCard key={price.id} marketPrice={price} />))}
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    <h2 className="font-heading text-2xl font-semibold">🌱 {t("Other Good Crops")}</h2>
                    <div className="space-y-4">
                        {otherCrops.map((crop) => (
                            <Card key={crop.name} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                        <img src={crop.imageUrl} alt={crop.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{crop.name}</h4>
                                        <p className="text-sm text-muted-foreground">{crop.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
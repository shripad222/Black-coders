import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MarketChart from "./MarketChart";
import { useLanguage } from "@/contexts/LanguageContext";

const marketData = [
  { crop: "टोमॅटो (Tomato)", price: "₹32/kg", change: 8.5, market: "Mapusa Mandi", trend: "up" },
  { crop: "कांदा (Onion)", price: "₹25/kg", change: -3.2, market: "Nashik", trend: "down" },
  { crop: "गहू (Wheat)", price: "₹2,150/quintal", change: 5.1, market: "Pune", trend: "up" },
  { crop: "मिरची (Chilli)", price: "₹85/kg", change: 12.3, market: "Belgaum", trend: "up" },
  { crop: "भाजी (Leafy Veg)", price: "₹18/kg", change: -1.5, market: "Panjim", trend: "down" },
  { crop: "भात (Rice)", price: "₹3,200/quintal", change: 2.8, market: "Ratnagiri", trend: "up" },
];

const MarketDashboard = () => {
  const { t } = useLanguage();

  return (
    <section id="market" className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("todayMarket")}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            रिअल-टाइम मंडी भाव आणि ट्रेंड पहा. आवाज वापरून शोधा!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="पीक शोधा (e.g., टोमॅटो, कांदा)..." 
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Market Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((item, idx) => (
            <Card 
              key={idx}
              className="hover:shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{item.crop}</CardTitle>
                    <CardDescription className="mt-1">{item.market}</CardDescription>
                  </div>
                  {item.trend === "up" ? (
                    <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {item.change}%
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {Math.abs(item.change)}%
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{item.price}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Last updated: आज 2:30 PM
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Ticker */}
        <div className="mt-12 bg-card rounded-lg border p-4 overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">Live Updates</span>
          </div>
          <div className="text-sm text-muted-foreground animate-marquee">
            🌾 Wheat prices up in Pune by ₹50/quintal • 🌶️ Chilli demand high in Belgaum • 🧅 Onion export news from Nashik • 🍅 Tomato season peak in Goa
          </div>
        </div>

        {/* Price History Chart */}
        <MarketChart />
      </div>
    </section>
  );
};

export default MarketDashboard;

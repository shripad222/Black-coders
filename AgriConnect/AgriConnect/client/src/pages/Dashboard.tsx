import { IndianRupee, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { MarketPriceCard } from "@/components/MarketPriceCard";
import { RecommendationCard } from "@/components/RecommendationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { MarketPrice, Recommendation } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { t } = useLanguage();

  const { data: marketPrices, isLoading: pricesLoading } = useQuery<MarketPrice[]>({
    queryKey: ["/api/market-prices"],
  });

  const { data: recommendations, isLoading: recsLoading } = useQuery<Recommendation[]>({
    queryKey: ["/api/recommendations"],
  });

  const stats = [
    {
      title: t("totalEarnings"),
      value: "₹1,24,350",
      change: "+12.5% from last month",
      changeType: "positive" as const,
      icon: IndianRupee,
      testId: "stat-total-earnings",
    },
    {
      title: "This Month",
      value: "₹28,450",
      change: "+8.2% from last month",
      changeType: "positive" as const,
      icon: TrendingUp,
      testId: "stat-this-month",
    },
    {
      title: t("activeListing"),
      value: "12",
      change: "3 pending approval",
      changeType: "neutral" as const,
      icon: Package,
      testId: "stat-active-listings",
    },
    {
      title: "Buyer Interests",
      value: "24",
      change: "5 new this week",
      changeType: "positive" as const,
      icon: ShoppingCart,
      testId: "stat-buyer-interests",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl font-bold text-foreground" data-testid="heading-dashboard">
          {t("welcome")}
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your farm today
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-semibold">{t("marketPrices")}</h2>
            <Button variant="ghost" size="sm" data-testid="button-view-all-market-prices">
              {t("viewAll")}
            </Button>
          </div>

          {pricesLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {marketPrices?.slice(0, 6).map((price) => (
                <MarketPriceCard key={price.id} marketPrice={price} />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold">{t("smartRecommendations")}</h2>
          
          {recsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-full mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations?.slice(0, 2).map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>
          )}

          {!recsLoading && (!recommendations || recommendations.length === 0) && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground">
                  No recommendations available yet.
                  <br />
                  Add more produce listings to get insights.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MarketPrice } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";

interface MarketPriceCardProps {
  marketPrice: MarketPrice;
}

export function MarketPriceCard({ marketPrice }: MarketPriceCardProps) {
  const { t } = useLanguage();

  const getTrendIcon = () => {
    if (marketPrice.trend === "up") return <TrendingUp className="h-4 w-4" />;
    if (marketPrice.trend === "down") return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (marketPrice.trend === "up") return "text-chart-3 bg-chart-3/10";
    if (marketPrice.trend === "down") return "text-destructive bg-destructive/10";
    return "text-muted-foreground bg-muted";
  };

  return (
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-800 rounded-lg"
      data-testid={`market-price-${marketPrice.id}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-50 truncate"
            data-testid="text-commodity">
            {marketPrice.commodity}
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate"
            data-testid="text-location">
            {marketPrice.mandiName}, {marketPrice.location}
          </p>
        </div>
        <Badge className={`${getTrendColor()} flex items-center gap-1 text-sm px-3 py-1.5 rounded-full font-semibold`}
          data-testid="badge-trend">
          {getTrendIcon()}
          {marketPrice.changePercent && `${Number(marketPrice.changePercent).toFixed(1)}%`}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tabular-nums"
            data-testid="text-price">
            ₹{Number(marketPrice.currentPrice).toFixed(2)}
          </span>
          <span className="text-base text-gray-600 dark:text-gray-400">/{marketPrice.unit}</span>
        </div>
        {marketPrice.previousPrice && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("Previous:")}{' '}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              ₹{Number(marketPrice.previousPrice).toFixed(2)}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

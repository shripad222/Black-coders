import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MarketPrice } from "@shared/schema";

interface MarketPriceCardProps {
  marketPrice: MarketPrice;
}

export function MarketPriceCard({ marketPrice }: MarketPriceCardProps) {
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
    <Card className="hover-elevate" data-testid={`market-price-${marketPrice.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base font-semibold truncate" data-testid="text-commodity">
            {marketPrice.commodity}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1 truncate" data-testid="text-location">
            {marketPrice.mandiName}, {marketPrice.location}
          </p>
        </div>
        <Badge className={`${getTrendColor()} flex items-center gap-1`} data-testid="badge-trend">
          {getTrendIcon()}
          {marketPrice.changePercent && `${Number(marketPrice.changePercent).toFixed(1)}%`}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums" data-testid="text-price">
            ₹{Number(marketPrice.currentPrice).toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">/{marketPrice.unit}</span>
        </div>
        {marketPrice.previousPrice && (
          <p className="text-xs text-muted-foreground mt-1">
            Previous: ₹{Number(marketPrice.previousPrice).toFixed(2)}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

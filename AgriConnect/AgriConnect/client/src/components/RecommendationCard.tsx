import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp } from "lucide-react";
import { Recommendation } from "@shared/schema";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const getConfidenceColor = () => {
    if (recommendation.confidence === "high") return "bg-chart-3/10 text-chart-3 border-chart-3/20";
    if (recommendation.confidence === "medium") return "bg-chart-2/10 text-chart-2 border-chart-2/20";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="bg-primary/5" data-testid={`recommendation-${recommendation.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base font-semibold" data-testid="text-crop-name">
              {recommendation.cropName}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{recommendation.recommendedAction}</p>
          </div>
        </div>
        <Badge variant="outline" className={getConfidenceColor()}>
          {recommendation.confidence} confidence
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium mb-1">Reason:</p>
          <p className="text-sm text-muted-foreground" data-testid="text-reason">{recommendation.reason}</p>
        </div>
        {recommendation.marketName && (
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Best market:</span>
            <span className="font-medium" data-testid="text-market">{recommendation.marketName}</span>
          </div>
        )}
        {recommendation.estimatedProfit && (
          <div className="rounded-md bg-chart-3/10 p-3">
            <p className="text-xs text-muted-foreground mb-1">Estimated additional profit:</p>
            <p className="text-lg font-bold text-chart-3 tabular-nums" data-testid="text-profit">
              +₹{Number(recommendation.estimatedProfit).toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

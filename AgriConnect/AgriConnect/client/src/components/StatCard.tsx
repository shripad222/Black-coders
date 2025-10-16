import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  testId?: string;
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon, testId }: StatCardProps) {
  return (
    <Card data-testid={testId}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tabular-nums" data-testid={`${testId}-value`}>{value}</div>
        {change && (
          <p className={cn(
            "text-sm mt-1 font-medium",
            changeType === "positive" && "text-chart-3",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )} data-testid={`${testId}-change`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

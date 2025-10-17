import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone } from "lucide-react";
import { BuyerRequirement } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";

interface BuyerRequirementCardProps {
  requirement: BuyerRequirement;
  onMakeOffer: (requirementId: string) => void;
}

export function BuyerRequirementCard({ requirement, onMakeOffer }: BuyerRequirementCardProps) {
  const { t } = useLanguage();
  return (
    <Card className="hover-elevate" data-testid={`buyer-requirement-${requirement.id}`}>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold" data-testid="text-buyer-name">
            {requirement.buyerName}
          </CardTitle>
          {requirement.active && (
            <Badge variant="outline" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
              {t("Active")}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate" data-testid="text-location">{requirement.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{t("Looking for:")}</p>
          <p className="font-semibold text-base" data-testid="text-crop-needed">{requirement.cropNeeded}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">{t("Quantity needed:")}</p>
          <p className="font-medium" data-testid="text-quantity">
            {requirement.quantity} {requirement.unit}
          </p>
        </div>
        {(requirement.expectedPriceMin || requirement.expectedPriceMax) && (
          <div>
            <p className="text-sm text-muted-foreground mb-1">{t("Expected price:")}</p>
            <p className="font-medium tabular-nums" data-testid="text-price-range">
              ₹{requirement.expectedPriceMin ? Number(requirement.expectedPriceMin).toFixed(2) : '—'} - 
              ₹{requirement.expectedPriceMax ? Number(requirement.expectedPriceMax).toFixed(2) : '—'} /{requirement.unit}
            </p>
          </div>
        )}
        {requirement.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{requirement.description}</p>
        )}
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-mono" data-testid="text-contact">{requirement.contactNumber}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => onMakeOffer(requirement.id)}
          data-testid="button-make-offer"
        >
          {t("Make an Offer")}
        </Button>
      </CardFooter>
    </Card>
  );
}

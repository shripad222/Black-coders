import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package } from "lucide-react";
import { ProduceListing } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProduceListingCardProps {
  listing: ProduceListing;
  onContact: (listingId: string) => void;
}

export function ProduceListingCard({ listing, onContact }: ProduceListingCardProps) {
  const { t } = useLanguage();
  return (
    <Card className="overflow-visible" data-testid={`produce-listing-${listing.id}`}>
      <div className="aspect-square w-full overflow-hidden bg-muted rounded-t-md">
        {listing.imageUrl ? (
          <img
            src={listing.imageUrl}
            alt={listing.cropName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold" data-testid="text-crop-name">
            {listing.cropName}
          </CardTitle>
          {listing.available && (
            <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/20">
              {t("Available")}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate" data-testid="text-location">{listing.location}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums" data-testid="text-price">
            ₹{Number(listing.pricePerUnit).toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">/{listing.unit}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">{t("Quantity:")} </span>
          <span className="font-medium" data-testid="text-quantity">
            {listing.quantity} {listing.unit}
          </span>
        </div>
        {listing.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onContact(listing.id)}
          data-testid="button-contact-seller"
        >
          {t("Contact Seller")}
        </Button>
      </CardFooter>
    </Card>
  );
}

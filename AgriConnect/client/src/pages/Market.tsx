import { useState } from "react";
import { MarketPriceCard } from "@/components/MarketPriceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { MarketPrice } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Market() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");

  const { data: marketPrices, isLoading } = useQuery<MarketPrice[]>({
    queryKey: ["/api/market-prices"],
  });

  const filteredPrices = marketPrices?.filter((price) => {
    const matchesSearch = price.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      price.mandiName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "all" || price.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  const locations = Array.from(new Set(marketPrices?.map(p => p.location) || []));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl font-bold" data-testid="heading-market">
          {t("marketPrices")}
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time commodity prices from mandis across India
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search commodity or mandi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-testid="input-search"
          />
        </div>
        <Select value={filterLocation} onValueChange={setFilterLocation}>
          <SelectTrigger className="w-full sm:w-48" data-testid="select-location">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" data-testid="button-refresh-prices">
          <TrendingUp className="mr-2 h-4 w-4" />
          Refresh Prices
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrices?.map((price) => (
            <MarketPriceCard key={price.id} marketPrice={price} />
          ))}
        </div>
      )}

      {!isLoading && filteredPrices?.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No market prices found</h3>
            <p className="text-center text-muted-foreground max-w-md">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

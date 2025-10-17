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
      <div className="flex items-center gap-4">
        <TrendingUp className="h-10 w-10 text-primary" />
        <div>
          <h1 className="font-heading text-4xl font-bold" data-testid="heading-market">
            {t("Market Prices")}
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with real-time commodity prices from mandis across India.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search commodity or mandi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 w-full rounded-md border border-input bg-background shadow-sm hover:border-primary focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            data-testid="input-search"
          />
        </div>
        <Select value={filterLocation} onValueChange={setFilterLocation}>
          <SelectTrigger className="w-full sm:w-48 h-10" data-testid="select-location">
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
        <Button variant="outline" className="h-10 px-4 py-2 w-full sm:w-auto" data-testid="button-refresh-prices">
          <TrendingUp className="mr-2 h-4 w-4" />
          Refresh Prices
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrices?.map((price) => (
            <MarketPriceCard key={price.id} marketPrice={price} />
          ))}
        </div>
      )}

      {!isLoading && filteredPrices?.length === 0 && (
        <Card className="col-span-full">
          <CardContent className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-primary/10 rounded-full p-4 mb-6">
              <Search className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No market prices found</h3>
            <p className="text-center text-muted-foreground max-w-md text-lg">
              We couldn't find any market prices matching your criteria. Try adjusting your search or filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

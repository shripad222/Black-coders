import { useState } from "react";
import { ProduceListingCard } from "@/components/ProduceListingCard";
import { BuyerRequirementCard } from "@/components/BuyerRequirementCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { ProduceListing, BuyerRequirement } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Marketplace() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const { data: produceListings, isLoading: listingsLoading } = useQuery<ProduceListing[]>({
    queryKey: ["/api/produce-listings"],
  });

  const { data: buyerRequirements, isLoading: requirementsLoading } = useQuery<BuyerRequirement[]>({
    queryKey: ["/api/buyer-requirements"],
  });

  const handleContactSeller = (listingId: string) => {
    navigate(`/dashboard/messages?listing=${listingId}`);
  };

  const handleMakeOffer = (requirementId: string) => {
    navigate(`/dashboard/messages?requirement=${requirementId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl font-bold" data-testid="heading-marketplace">
            {t("Marketplace")}          </h1>
          <p className="text-muted-foreground mt-2">
            {t("Connect directly with buyers and sellers")}
          </p>
        </div>
        <Button data-testid="button-add-new-listing">
          <Plus className="mr-2 h-4 w-4" />
          {t("addListing")}
        </Button>
      </div>

      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="listings" data-testid="tab-produce-listings">
            <Package className="mr-2 h-4 w-4" />
            {t("myListings")}
          </TabsTrigger>
          <TabsTrigger value="requirements" data-testid="tab-buyer-requirements">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t("buyerRequirements")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="mt-6">
          {listingsLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {produceListings?.map((listing) => (
                <ProduceListingCard
                  key={listing.id}
                  listing={listing}
                  onContact={() => handleContactSeller(listing.id)}
                />
              ))}
            </div>
          )}

          {!listingsLoading && (!produceListings || produceListings.length === 0) && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("No produce listings yet")}</h3>
                <p className="text-center text-muted-foreground max-w-md mb-4">
                  {t("Start selling your produce by creating your first listing")}
                </p>
                <Button data-testid="button-create-first-listing">
                  <Plus className="mr-2 h-4 w-4" />
                  {t("Create Your First Listing")}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="requirements" className="mt-6">
          {requirementsLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {buyerRequirements?.map((requirement) => (
                <BuyerRequirementCard
                  key={requirement.id}
                  requirement={requirement}
                  onMakeOffer={handleMakeOffer}
                />
              ))}
            </div>
          )}

          {!requirementsLoading && (!buyerRequirements || buyerRequirements.length === 0) && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t("No buyer requirements available")}</h3>
                <p className="text-center text-muted-foreground max-w-md">
                  {t("Check back later for new opportunities from buyers")}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

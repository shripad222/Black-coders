import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ShoppingCart, MessageCircle } from "lucide-react";
import ChatDialog from "@/components/ChatDialog";

const listings = [
  {
    id: 1,
    farmer: "Rajendra Patil",
    crop: "Tomato",
    quantity: "500 kg",
    quality: "A Grade",
    location: "Mapusa, Goa",
    price: "$2.50/kg",
    verified: true,
  },
  {
    id: 2,
    farmer: "Sunita Deshmukh",
    crop: "Chilli",
    quantity: "200 kg",
    quality: "Premium",
    location: "Belgaum",
    price: "$4.25/kg",
    verified: true,
  },
  {
    id: 3,
    farmer: "Vikas Kulkarni",
    crop: "Onion",
    quantity: "1000 kg",
    quality: "B Grade",
    location: "Nashik",
    price: "$1.25/kg",
    verified: true,
  },
];

const MarketplacePreview = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<{ farmer: string; crop: string } | null>(null);

  const handleChatOpen = (farmer: string, crop: string) => {
    setSelectedListing({ farmer, crop });
    setChatOpen(true);
  };

  return (
    <section id="marketplace" className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Today's Marketplace
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Buy directly from farmers. Sell your produce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {listings.map((listing, idx) => (
            <Card 
              key={listing.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{listing.crop}</CardTitle>
                      {listing.verified && (
                        <Badge className="bg-blue-500/10 text-blue-700">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{listing.farmer}</p>
                  </div>
                  <Badge variant="outline" className="text-lg font-bold">
                    {listing.price}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Quantity:</span>
                    <p className="font-medium">{listing.quantity}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quality:</span>
                    <p className="font-medium">{listing.quality}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => handleChatOpen(listing.farmer, listing.crop)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  <Button className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="gap-2">
            View All Listings
            <span className="text-muted-foreground">→</span>
          </Button>
        </div>

        {/* Chat Dialog */}
        {selectedListing && (
          <ChatDialog
            open={chatOpen}
            onOpenChange={setChatOpen}
            farmerName={selectedListing.farmer}
            cropName={selectedListing.crop}
          />
        )}
      </div>
    </section>
  );
};

export default MarketplacePreview;
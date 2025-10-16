import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Phone, Mail, Edit, Save, Package, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "राजेंद्र पाटील",
    phone: "+91 9876543210",
    email: "rajendra@example.com",
    location: "Mapusa, Goa",
    farmSize: "5 acres",
    verified: true,
  });

  const myListings = [
    { crop: "टोमॅटो", quantity: "500 kg", price: "₹32/kg", status: "Active" },
    { crop: "मिरची", quantity: "100 kg", price: "₹85/kg", status: "Sold" },
  ];

  const salesHistory = [
    { date: "2025-10-10", crop: "टोमॅटो", quantity: "200 kg", amount: "₹6,400", buyer: "विकास शर्मा" },
    { date: "2025-10-05", crop: "कांदा", quantity: "500 kg", amount: "₹12,500", buyer: "सुनीता देशमुख" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl">
                  {profile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      {profile.verified && (
                        <Badge className="bg-blue-500/10 text-blue-700">✓ Verified Farmer</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>{profile.farmSize} farm</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      ) : (
                        <span>{profile.phone}</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      ) : (
                        <span>{profile.email}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="history">Sales History</TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myListings.map((listing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-lg">{listing.crop}</div>
                        <div className="text-sm text-muted-foreground">
                          {listing.quantity} • {listing.price}
                        </div>
                      </div>
                      <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
                        {listing.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesHistory.map((sale, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-lg">{sale.crop}</div>
                        <div className="text-sm text-muted-foreground">
                          {sale.date} • {sale.quantity} • Buyer: {sale.buyer}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{sale.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

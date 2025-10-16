import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Edit2, Save } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Farmer } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const { data: farmer, isLoading } = useQuery<Farmer>({
    queryKey: ["/api/farmer/current"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-12 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-64 mt-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const defaultFarmer = farmer || {
    id: "1",
    name: "Rajesh Kumar",
    region: "Punjab",
    phoneNumber: "+91 98765 43210",
    cropsGrown: ["Wheat", "Rice", "Sugarcane"],
    language: "en",
    avatarUrl: undefined,
    createdAt: new Date(),
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-4xl font-bold" data-testid="heading-profile">
          {t("profile")}
        </h1>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          data-testid={isEditing ? "button-save-profile" : "button-edit-profile"}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={defaultFarmer.avatarUrl} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {defaultFarmer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              {isEditing ? (
                <Input
                  defaultValue={defaultFarmer.name}
                  className="text-2xl font-bold"
                  data-testid="input-name"
                />
              ) : (
                <h2 className="font-heading text-2xl font-bold" data-testid="text-name">
                  {defaultFarmer.name}
                </h2>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {isEditing ? (
                  <Input
                    defaultValue={defaultFarmer.region}
                    className="max-w-xs"
                    data-testid="input-region"
                  />
                ) : (
                  <span data-testid="text-region">{defaultFarmer.region}</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {isEditing ? (
                  <Input
                    defaultValue={defaultFarmer.phoneNumber}
                    className="max-w-xs"
                    data-testid="input-phone"
                  />
                ) : (
                  <span className="font-mono" data-testid="text-phone">
                    {defaultFarmer.phoneNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-3 block">Crops Grown</Label>
            <div className="flex flex-wrap gap-2">
              {defaultFarmer.cropsGrown.map((crop, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
                  data-testid={`badge-crop-${index}`}
                >
                  {crop}
                </Badge>
              ))}
              {isEditing && (
                <Button variant="outline" size="sm" className="h-7" data-testid="button-add-crop">
                  + Add Crop
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm text-muted-foreground">Member Since</Label>
              <p className="text-base font-medium mt-1" data-testid="text-member-since">
                {new Date(defaultFarmer.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Preferred Language</Label>
              <p className="text-base font-medium mt-1" data-testid="text-language">
                {defaultFarmer.language === 'en' ? 'English' : defaultFarmer.language}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Listings</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-total-listings">28</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completed Sales</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-completed-sales">142</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-total-revenue">₹8,24,350</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

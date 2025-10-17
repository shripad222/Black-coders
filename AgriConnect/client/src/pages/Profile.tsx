import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Edit2, Save, Globe, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";

// Define the profile type to match the updated profiles table
interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  crop_planted: string | null;
  preferred_language: string | null;
  created_at: string | null;
}

export default function Profile() {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user profile from Supabase profiles table
  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, name, state, latitude, longitude, crop_planted, preferred_language, created_at')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        throw new Error("Failed to fetch profile");
      }
      
      return data;
    },
    enabled: !!user?.id
  });

  // Mutation to update the profile
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) {
        console.error("Error updating profile:", error);
        throw new Error("Failed to update profile");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    }
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
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profileData = profile || {
    id: "",
    email: user?.email || null,
    name: user?.user_metadata?.name || null,
    state: null,
    latitude: null,
    longitude: null,
    crop_planted: null,
    preferred_language: null,
    created_at: null
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-4xl font-bold" data-testid="heading-profile">
          {t("profile")}
        </h1>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => {
            if (isEditing) {
              // Save changes
              const updatedData: Partial<UserProfile> = {};
              
              const nameInput = document.getElementById("input-name") as HTMLInputElement;
              const stateInput = document.getElementById("input-state") as HTMLInputElement;
              const cropInput = document.getElementById("input-crop-planted") as HTMLInputElement;
              
              if (nameInput && nameInput.value !== profileData.name) {
                updatedData.name = nameInput.value;
              }
              
              if (stateInput && stateInput.value !== profileData.state) {
                updatedData.state = stateInput.value;
              }
              
              if (cropInput && cropInput.value !== profileData.crop_planted) {
                updatedData.crop_planted = cropInput.value;
              }
              
              // Only update if there are changes
              if (Object.keys(updatedData).length > 0) {
                updateProfileMutation.mutate(updatedData);
              }
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
          data-testid={isEditing ? "button-save-profile" : "button-edit-profile"}
          disabled={updateProfileMutation.isPending}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              {updateProfileMutation.isPending ? t("Saving...") : t("Save Changes")}
            </>
          ) : (
            <>
              <Edit2 className="mr-2 h-4 w-4" />
              {t("Edit Profile")}
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {profileData.name?.split(' ').map(n => n[0]).join('') || user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              {isEditing ? (
                <Input
                  defaultValue={profileData.name || ""}
                  className="text-2xl font-bold"
                  data-testid="input-name"
                  id="input-name"
                />
              ) : (
                <h2 className="font-heading text-2xl font-bold" data-testid="text-name">
                  {profileData.name || user?.email?.split('@')[0]}
                </h2>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {isEditing ? (
                  <Input
                    defaultValue={profileData.state || ""}
                    className="max-w-xs"
                    data-testid="input-state"
                    id="input-state"
                  />
                ) : (
                  <span data-testid="text-state">
                    {profileData.state || t("State not set")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="font-mono" data-testid="text-email">
                  {profileData.email || user?.email}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Crop Planted Section */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              {t("Crop(s) Currently Planted")}
            </Label>
            <div className="flex flex-wrap gap-2">
              {profileData.crop_planted ? (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 px-3 py-1"
                  data-testid="badge-current-crop"
                >
                  {profileData.crop_planted}
                </Badge>
              ) : (
                <span className="text-muted-foreground">{t("No crop specified")}</span>
              )}
              {isEditing && (
                <Input
                  defaultValue={profileData.crop_planted || ""}
                  className="max-w-xs"
                  placeholder={t("Add crop...")}
                  data-testid="input-crop-planted"
                  id="input-crop-planted"
                />
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {t("Latitude")}
              </Label>
              <p className="text-base font-medium mt-1" data-testid="text-latitude">
                {profileData.latitude ? profileData.latitude.toFixed(6) : t("Not available")}
              </p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {t("Longitude")}
              </Label>
              <p className="text-base font-medium mt-1" data-testid="text-longitude">
                {profileData.longitude ? profileData.longitude.toFixed(6) : t("Not available")}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm text-muted-foreground">{t("Member Since")}</Label>
              <p className="text-base font-medium mt-1" data-testid="text-member-since">
                {profileData.created_at 
                  ? new Date(profileData.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : t("Unknown")}
              </p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">{t("Preferred Language")}</Label>
              <p className="text-base font-medium mt-1" data-testid="text-language">
                {profileData.preferred_language 
                  ? languageOptions.find(lang => lang.code === profileData.preferred_language)?.name || profileData.preferred_language
                  : t("English")}
              </p>
            </div>
          </div>
          
          {/* Technical Details */}
          <div className="pt-4 border-t">
            <Label className="text-base font-semibold mb-3 block flex items-center gap-1">
              <Wrench className="h-4 w-4" />
              {t("Technical Details")}
            </Label>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("User ID")}:</span>
                <span className="font-mono">{profileData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("Account Type")}:</span>
                <span>{t("Farmer")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("Account Statistics")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t("Total Listings")}</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-total-listings">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t("Completed Sales")}</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-completed-sales">48</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t("Total Revenue")}</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-total-revenue">₹3,42,850</p>
            </div>
          </div>
          
          {/* Additional Stats */}
          <div className="grid gap-6 md:grid-cols-3 mt-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t("Active Requests")}</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-active-requests">3</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t("Avg. Rating")}</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-avg-rating">4.7</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{t("Avg. Response Time")}</p>
              <p className="text-3xl font-bold tabular-nums" data-testid="text-response-time">2h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to find language name
const languageOptions = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "mr", name: "मराठी" },
  { code: "bn", name: "বাংলা" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "ml", name: "മലയാളം" },
  { code: "kok", name: "कोंकणी" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "or", name: "ଓଡ଼ିଆ" },
  { code: "as", name: "অসমীয়া" },
  { code: "brx", name: "बड़ो" },
  { code: "doi", name: "डोगरी" },
  { code: "ks", name: "کٲشُر" },
  { code: "mai", name: "मैथिली" },
  { code: "mni", name: "ꯃꯤꯇꯩ ꯂꯣꯟ" },
  { code: "ne", name: "नेपाली" },
  { code: "sa", name: "संस्कृतम्" },
  { code: "sat", name: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "sd", name: "سنڌي" },
  { code: "ur", name: "اردو" },
];

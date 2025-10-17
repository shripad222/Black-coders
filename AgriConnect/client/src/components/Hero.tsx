import { Button } from "@/components/ui/button";
import { Mic, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      {/* Removed Gradient Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10" /> */}
      
      {/* Full-width container with background */}
      <div className="w-full bg-background">
        <div className="container relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              {t("🌾 Digital Bridge for Your Farm")}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
                {t("Connecting Farmers.")}
              </span>
              <br />
              <span className="text-foreground">{t("Empowering Agriculture.")}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              {t("Real-time market prices, direct buyers and voice assistant. Conduct business in your regional language.")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-lg"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                {t("View Market Prices")}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 hover:bg-accent/10 hover:border-accent transition-all duration-300 text-lg"
              >
                <Mic className="mr-2 h-5 w-5" />
                {t("Talk to AgriSetu")}
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">{t("Farmers")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">200+</div>
                <div className="text-sm text-muted-foreground">{t("Mandis")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">{t("Support")}</div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative animate-scale-in animate-float">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <div 
              className="relative rounded-3xl shadow-[var(--shadow-soft)] w-full h-auto bg-gradient-to-br from-primary/20 to-secondary/20 aspect-video flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url('https://media.istockphoto.com/id/806276128/photo/farmer-ploughing-rice-field-at-sunrise.jpg?s=612x612&w=0&k=20&c=t5IUOH9GWrI1lAz4gXPJnwjR9WUxQxdmSnIJxk_XDiQ=')` }}
            >
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-lg p-4 animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-sm font-medium">{t("Live Buyers")}</div>
                  <div className="text-2xl font-bold text-primary">1,234</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Hero;
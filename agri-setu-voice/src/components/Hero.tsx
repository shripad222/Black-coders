import { Button } from "@/components/ui/button";
import { Mic, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10" />
      
      <div className="container relative py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              🌾 Farm's Digital Bridge
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Connecting Farmers.
              </span>
              <br />
              <span className="text-foreground">Empowering Agriculture.</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
                Real-time market prices, direct buyers, and a voice-activated assistant. Transact in your regional language.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 hover:shadow-[var(--shadow-glow)] transition-all duration-300 text-lg"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                  Check Market Prices
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 hover:bg-accent/10 hover:border-accent transition-all duration-300 text-lg"
              >
                <Mic className="mr-2 h-5 w-5" />
                  Talk to AgriMandi
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Farmers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">200+</div>
                <div className="text-sm text-muted-foreground">Markets</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <img 
              src={heroImage}
              alt="Farmer with fresh produce"
              className="relative rounded-3xl shadow-[var(--shadow-soft)] w-full h-auto object-cover"
            />
            
            {/* Floating Elements */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-lg p-4 animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-sm font-medium">Live Buyers</div>
                  <div className="text-2xl font-bold text-primary">1,234</div>
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

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarketDashboard from "@/components/MarketDashboard";
import VoiceAssistant from "@/components/VoiceAssistant";
import MarketplacePreview from "@/components/MarketplacePreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <MarketDashboard />
        <VoiceAssistant />
        <MarketplacePreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

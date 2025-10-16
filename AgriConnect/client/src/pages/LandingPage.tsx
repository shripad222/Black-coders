import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarketDashboard from "@/components/MarketDashboard";
import VoiceAssistant from "@/components/VoiceAssistant";
import MarketplacePreview from "@/components/MarketplacePreview";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 sm:px-6 lg:px-8">
        <Hero />
        <MarketDashboard />
        <VoiceAssistant />
        <MarketplacePreview />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { t } = useLanguage();

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript(t("I'm listening... How can I help?"));
    } else {
      setTranscript("");
    }
  };

  return (
    <section className="py-16">
      <div className="w-full bg-background">
        <div className="container py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("Speak in Your Voice")}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("AgriSetu understands Konkani, Hindi and Marathi. Ask questions, search prices, or register crops.")}
            </p>
          </div>

          {/* Voice Interface */}
          <Card className="max-w-2xl mx-auto overflow-hidden">
            <CardContent className="p-8 space-y-6">
              {/* Microphone Button */}
              <div className="flex justify-center">
                <button
                  onClick={toggleListening}
                  className={`
                    relative w-32 h-32 rounded-full flex items-center justify-center
                    transition-all duration-300 transform hover:scale-105
                    ${isListening 
                      ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-[var(--shadow-glow)] animate-pulse' 
                      : 'bg-gradient-to-br from-primary to-accent hover:shadow-[var(--shadow-glow)]'
                    }
                  `}
                >
                  {isListening ? (
                    <MicOff className="h-12 w-12 text-white" />
                  ) : (
                    <Mic className="h-12 w-12 text-white" />
                  )}
                  
                  {/* Ripple Effect */}
                  {isListening && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-red-500 opacity-75 animate-ping" />
                      <span className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-pulse" />
                    </>
                  )}
                </button>
              </div>

              {/* Status Text */}
              <div className="text-center">
                {isListening ? (
                  <p className="text-lg font-medium text-primary animate-pulse">
                    {t("🎤 I'm listening...")}
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    {t("Press mic to start speaking")}
                  </p>
                )}
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className="bg-muted/50 rounded-lg p-4 min-h-[100px] animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-left">{transcript}</p>
                  </div>
                </div>
              )}

              {/* Example Queries */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{t("Example Questions:")}</p>
                <div className="grid gap-2">
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3 hover:bg-accent/10"
                    onClick={() => setTranscript(t("What is the price of tomatoes today?"))}
                  >
                    {t("What is the price of tomatoes today?")}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3 hover:bg-accent/10"
                    onClick={() => setTranscript(t("Register my new crop"))}
                  >
                    {t("Register my new crop")}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3 hover:bg-accent/10"
                    onClick={() => setTranscript(t("Who are the buyers in Goa?"))}
                  >
                    {t("Who are the buyers in Goa?")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supported Languages */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm">
              <span className="text-2xl">🗣️</span>
              <span>{t("Konkani")}</span>
            </div>
            <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm">
              <span className="text-2xl">🗣️</span>
              <span>{t("Hindi")}</span>
            </div>
            <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm">
              <span className="text-2xl">🗣️</span>
              <span>{t("Marathi")}</span>
            </div>
            <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-sm">
              <span className="text-2xl">🗣️</span>
              <span>{t("English")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default VoiceAssistant;
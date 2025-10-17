import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Extend Window interface for webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // A generic placeholder voice ID

const VoiceAssistant = () => {
  const { t, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [manualInput, setManualInput] = useState(""); // State for manual text input
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!("SpeechRecognition" in window) && !("webkitSpeechRecognition" in window)) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false; // Listen for a single utterance
    recognitionRef.current.interimResults = false; // Only return final results
    recognitionRef.current.lang = language; // Set language for recognition

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript(t("🎤 I'm listening..."));
      setGeminiResponse("");
    };

    recognitionRef.current.onresult = (event: any) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      processCommand(currentTranscript);
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setTranscript(t("Error listening. Please try again."));
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      if (!geminiResponse) {
        setTranscript(t("Press mic to start speaking"));
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]); // Re-initialize if language changes

  const processCommand = async (command: string) => {
    setTranscript(t("Processing..."));
    try {
      const response = await fetch("/api/gemini-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: command, language: language }),
      });
      const data = await response.json();
      if (response.ok) {
        setGeminiResponse(data.response);
        speakResponse(data.response);
      } else {
        console.error("Gemini API error:", data.error);
        setGeminiResponse(t("Error processing your request."));
        speakResponse(t("Error processing your request."));
      }
    } catch (error) {
      console.error("Network error during Gemini processing:", error);
      setGeminiResponse(t("Network error. Please try again."));
      speakResponse(t("Network error. Please try again."));
    }
  };

  const speakResponse = async (text: string) => {
    try {
      const response = await fetch("/api/elevenlabs-tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text, voice_id: ELEVENLABS_VOICE_ID, language: language }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = audioUrl;
          audioRef.current.play();
        } else {
          audioRef.current = new Audio(audioUrl);
          audioRef.current.play();
        }
        audioRef.current.onended = () => {
          setIsListening(false);
          setTranscript(t("Press mic to start speaking"));
          URL.revokeObjectURL(audioUrl); // Clean up the Object URL
        };
      } else {
        const errorData = await response.json();
        console.error("Eleven Labs TTS API error:", errorData.error);
        // Fallback to native speech if Eleven Labs fails
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        window.speechSynthesis.speak(utterance);
        utterance.onend = () => {
          setIsListening(false);
          setTranscript(t("Press mic to start speaking"));
        };
      }
    } catch (error) {
      console.error("Network error during Eleven Labs TTS:", error);
      // Fallback to native speech if network fails
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setIsListening(false);
        setTranscript(t("Press mic to start speaking"));
      };
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
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

              {/* Manual Text Input for Debugging */}
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder={t("Type your query here...")}
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && processCommand(manualInput)}
                />
                <Button onClick={() => processCommand(manualInput)}>{t("Send")}</Button>
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

              {/* Gemini Response Display */}
              {geminiResponse && (
                <div className="bg-primary/10 rounded-lg p-4 min-h-[100px] animate-fade-in mt-4">
                  <div className="flex items-start gap-3">
                    <Volume2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <p className="text-left font-medium">{geminiResponse}</p>
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
                    onClick={() => processCommand(t("What is the price of tomatoes today?"))}
                  >
                    {t("What is the price of tomatoes today?")}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3 hover:bg-accent/10"
                    onClick={() => processCommand(t("Register my new crop"))}
                  >
                    {t("Register my new crop")}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start text-left h-auto py-3 hover:bg-accent/10"
                    onClick={() => processCommand(t("Who are the buyers in Goa?"))}
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
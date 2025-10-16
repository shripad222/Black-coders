import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

export function TranslationLoadingOverlay() {
  const { isLoadingTranslations, t } = useLanguage();

  if (!isLoadingTranslations) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center flex-col space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-xl font-semibold text-foreground">{t("Translating page...")}</p>
    </div>
  );
}

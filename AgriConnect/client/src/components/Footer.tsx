import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t mt-16">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                अ
              </div>
              <span className="text-xl font-bold">{t("AgriSetu")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Digital bridge between farmers and market. In your language, for you.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("Quick Links")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#market" className="hover:text-primary transition-colors">{t("Market Prices")}</a></li>
              <li><a href="#marketplace" className="hover:text-primary transition-colors">{t("Marketplace")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("About Us")}</a></li>
              <li><a href="#help" className="hover:text-primary transition-colors">{t("Help Center")}</a></li>
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h3 className="font-semibold mb-4">{t("For Farmers")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">{t("Register")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("List Crop")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("Find Buyers")}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t("Education")}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t("Contact")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t("📞 1800-AGRI-SETU")}</li>
              <li>{t("📧 help@agrisetu.com")}</li>
              <li>{t("⏰ 24/7 Available")}</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>{t("© 2025 AgriSetu. All rights reserved. | Privacy Policy | Terms & Conditions")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
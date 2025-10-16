import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
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
              <span className="text-xl font-bold">AgriSetu</span>
            </div>
            <p className="text-sm text-muted-foreground">
              शेतकरी आणि मार्केट यांचा डिजिटल पूल.
              आपल्या भाषेत, आपल्यासाठी.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">द्रुत लिंक</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#market" className="hover:text-primary transition-colors">मार्केट किंमत</a></li>
              <li><a href="#marketplace" className="hover:text-primary transition-colors">मार्केटप्लेस</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">आमच्याबद्दल</a></li>
              <li><a href="#help" className="hover:text-primary transition-colors">मदत केंद्र</a></li>
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h3 className="font-semibold mb-4">शेतकऱ्यांसाठी</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">नोंदणी करा</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">पीक सूचीबद्ध करा</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">खरेदीदार शोधा</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">शिक्षण</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">संपर्क</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📞 1800-AGRI-SETU</li>
              <li>📧 help@agrisetu.com</li>
              <li>⏰ 24/7 उपलब्ध</li>
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
          <p>© 2025 AgriSetu. सर्व हक्क राखीव आहेत. | गोपनीयता धोरण | अटी व शर्ती</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
                                A
                            </div>
                            <span className="text-xl font-bold">AgriSetu</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            A digital bridge for farmers and the market.
                            In your language, for you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#market" className="hover:text-primary transition-colors">Market Price</a></li>
                            <li><a href="#marketplace" className="hover:text-primary transition-colors">Marketplace</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#help" className="hover:text-primary transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    {/* For Farmers */}
                    <div>
                        <h3 className="font-semibold mb-4">For Farmers</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors">Register</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">List Crop</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Find Buyers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Education</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>📞 1800-AGRI-SETU</li>
                            <li>📧 help@agrisetu.com</li>
                            <li>⏰ Available 24/7</li>
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
                    <p>© 2025 AgriSetu. All rights reserved. | Privacy Policy | Terms & Conditions</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
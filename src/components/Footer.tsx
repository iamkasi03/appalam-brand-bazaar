import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-heritage text-heritage-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-traditional rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Baskaran Appalam</h3>
                <p className="text-sm opacity-80">Ram Traders, Madurai</p>
              </div>
            </div>
            <p className="text-heritage-foreground/80 mb-6 leading-relaxed">
              Authentic South Indian appalams made with traditional recipes and finest ingredients. 
              Serving customers across India since 1985.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-heritage-foreground/10 rounded-full flex items-center justify-center hover:bg-heritage-foreground/20 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-heritage-foreground/10 rounded-full flex items-center justify-center hover:bg-heritage-foreground/20 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-heritage-foreground/10 rounded-full flex items-center justify-center hover:bg-heritage-foreground/20 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Home</a></li>
              <li><a href="#products" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Products</a></li>
              <li><a href="#about" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Wholesale</a></li>
              <li><a href="#" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Distributors</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Products</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Appalam 100g Pack</a></li>
              <li><a href="#" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Appalam 200g Pack</a></li>
              <li><a href="#" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Custom Packaging</a></li>
              <li><a href="#" className="text-heritage-foreground/80 hover:text-heritage-foreground transition-colors">Gift Hampers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-heritage-foreground/60" />
                <div>
                  <p className="text-heritage-foreground/80">Ram Traders</p>
                  <p className="text-heritage-foreground/80">1485,T.N.H.B Colony</p>
                  <p className="text-heritage-foreground/80">Villapuram,Madurai, Tamil Nadu 625012</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-heritage-foreground/60" />
                <div>
                  <p className="text-heritage-foreground/80">+91 98430 67247</p>
                  <p className="text-heritage-foreground/80">+91 98433 84940</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-heritage-foreground/60" />
                <p className="text-heritage-foreground/80">info@baskaranappalam.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-heritage-foreground/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-heritage-foreground/80 mb-4 md:mb-0">
              <p>&copy; 2024 Baskaran Appalam - Ram Traders. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-heritage-foreground/80">
              <a href="#" className="hover:text-heritage-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-heritage-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-heritage-foreground transition-colors">FSSAI License</a>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-heritage-foreground/60 text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 mx-1 fill-current" /> in Madurai, Tamil Nadu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

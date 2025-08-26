import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Phone, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-traditional rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">B</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Baskaran Appalam</h1>
              <p className="text-sm text-muted-foreground">Ram Traders, Madurai</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
            <Button variant="outline" size="sm" onClick={handleAuthAction}>
              {user ? <LogOut className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
              {user ? 'Logout' : 'Login'}
            </Button>
            <Button size="sm" className="bg-gradient-traditional hover:opacity-90">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={handleAuthAction}>
                  {user ? <LogOut className="w-4 h-4 mr-2" /> : <User className="w-4 h-4 mr-2" />}
                  {user ? 'Logout' : 'Login'}
                </Button>
                <Button size="sm" className="bg-gradient-traditional hover:opacity-90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Award, Truck, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-appalam.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Traditional Baskaran Appalam"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Award className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm font-medium text-foreground">FSSAI Certified • Premium Quality</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Authentic <span className="text-secondary">Baskaran</span>
              <br />
              Appalam
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              Experience the traditional taste of Madurai with our machine made appalams. 
              Made with pure urad flour and time-honored recipes passed down through generations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-gradient-traditional hover:opacity-90 text-lg px-8 py-6">
              Order Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
              View Products
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-white">Premium Quality</h3>
              </div>
              <p className="text-white/80">Made with finest urad flour and traditional spices</p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <Truck className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-white">Fast Delivery</h3>
              </div>
              <p className="text-white/80">Fresh appalams delivered across India</p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-white">FSSAI Certified</h3>
              </div>
              <p className="text-white/80">Guaranteed safety and quality standards</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
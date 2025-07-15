import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Heart, Users, Clock, MapPin, Shield } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: "1985", event: "Ram Traders Founded in Madurai" },
    { year: "1995", event: "Launched Baskaran Appalam Brand" },
    { year: "2010", event: "FSSAI Certification Achieved" },
    { year: "2020", event: "Online Presence Established" },
    { year: "2024", event: "National Distribution Network" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Traditional Recipes",
      description: "Time-honored recipes passed down through generations, preserving authentic taste."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "FSSAI certified facility with stringent quality control measures."
    },
    {
      icon: Users,
      title: "Family Business",
      description: "A family-run business committed to serving customers with love and care."
    },
    {
      icon: Award,
      title: "Premium Ingredients",
      description: "Only the finest urad flour and spices sourced from trusted suppliers."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Heritage Story
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over three decades, Ram Traders has been crafting the finest appalams in Madurai, 
            carrying forward the rich culinary traditions of South India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">From Madurai to Your Table</h3>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                Established in 1985 in the heart of Madurai, Ram Traders began as a small family business 
                with a simple mission: to share the authentic taste of traditional South Indian appalams 
                with food lovers everywhere.
              </p>
              
              <p>
                Our founder, inspired by his grandmother's recipes, started Baskaran Appalam to preserve 
                the age-old art of appalam making. Using only the finest urad flour, rice flour, and 
                carefully selected spices, we've maintained the same quality and taste that made us 
                a household name.
              </p>
              
              <p>
                Today, we're proud to be FSSAI certified and serve customers across India, bringing 
                the authentic flavors of Madurai to dining tables nationwide. Every appalam is made 
                with the same love and attention to detail that has defined our brand for generations.
              </p>
            </div>

            <div className="mt-8 flex items-center space-x-4">
              <Badge className="bg-heritage text-heritage-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                Madurai, Tamil Nadu
              </Badge>
              <Badge className="bg-primary text-primary-foreground">
                <Clock className="w-4 h-4 mr-2" />
                39+ Years Experience
              </Badge>
            </div>
          </div>

          {/* Timeline */}
          <Card className="p-6 shadow-soft">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Our Journey</h3>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-traditional rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm text-center">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 shadow-soft hover:shadow-warm transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-traditional rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <Card className="max-w-4xl mx-auto text-center p-8 shadow-soft">
          <h3 className="text-2xl font-bold text-foreground mb-6">Certifications & Quality</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">FSSAI Certified</h4>
              <p className="text-sm text-muted-foreground">Food safety and quality assured</p>
            </div>
            <div>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">ISO Standards</h4>
              <p className="text-sm text-muted-foreground">International quality management</p>
            </div>
            <div>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Traditional Methods</h4>
              <p className="text-sm text-muted-foreground">Authentic recipes and processes</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;
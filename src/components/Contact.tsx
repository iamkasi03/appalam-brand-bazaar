import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our products or want to place a bulk order? 
            We're here to help you experience the authentic taste of Baskaran Appalam.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardContent className="flex items-center p-6">
                  <div className="w-16 h-16 bg-gradient-traditional rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Our Address</h4>
                    <p className="text-muted-foreground">
                      Ram Traders<br />
                      1485 T.N.H.B Colony,Villapuram<br />
                      Madurai, Tamil Nadu 625012<br />
                      India
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="flex items-center p-6">
                  <div className="w-16 h-16 bg-gradient-traditional rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone Numbers</h4>
                    <p className="text-muted-foreground">
                      +91 98765 43210<br />
                      +91 87654 32109<br />
                      Toll Free: 1800 123 4567
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="flex items-center p-6">
                  <div className="w-16 h-16 bg-gradient-traditional rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      ramtraders87@gmail.com<br />
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="flex items-center p-6">
                  <div className="w-16 h-16 bg-gradient-traditional rounded-full flex items-center justify-center mr-4">
                    <Clock className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                    <p className="text-muted-foreground">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM<br />
                      Holidays: By Appointment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-warm">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-primary" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input placeholder="Enter your first name" className="border-border" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input placeholder="Enter your last name" className="border-border" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input type="email" placeholder="Enter your email" className="border-border" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="Enter your phone number" className="border-border" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input placeholder="What is this regarding?" className="border-border" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="border-border resize-none"
                  />
                </div>

                <Button className="w-full bg-gradient-traditional hover:opacity-90 text-lg py-6">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We'll get back to you within 24 hours during business days.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FSSAI Information */}
        <Card className="max-w-4xl mx-auto mt-16 text-center p-8 shadow-soft">
          <h3 className="text-2xl font-bold text-foreground mb-6">FSSAI Compliance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-2">FSSAI License Number</h4>
              <p className="text-muted-foreground">12418012002462</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">License Category</h4>
              <p className="text-muted-foreground">Food Manufacturer</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Ram Traders is fully compliant with Food Safety and Standards Authority of India regulations, 
            ensuring the highest quality and safety standards for all our products.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Contact;

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, MapPin, Phone, User, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface OrderData {
  items: CartItem[];
  total: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const orderData = location.state as OrderData;
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });

  // Redirect if no order data
  if (!orderData) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirmOrder = async () => {
    // Validate required fields
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address || !customerDetails.city) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare order details for email
      const orderSummary = {
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        message: `Cash on Delivery Order Confirmation:

Customer Details:
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Email: ${customerDetails.email}
Address: ${customerDetails.address}, ${customerDetails.city} - ${customerDetails.pincode}
${customerDetails.notes ? `Notes: ${customerDetails.notes}` : ''}

Order Details:
${orderData.items.map(item => 
  `${item.name} x ${item.quantity} = ₹${(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}`
).join('\n')}

Total Amount: ₹${orderData.total.toFixed(2)}
Payment Method: Cash on Delivery

Please prepare the order and contact the customer for delivery.`,
        subject: `COD Order - ${customerDetails.name} - ₹${orderData.total.toFixed(2)}`
      };

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: orderSummary
      });

      if (error) throw error;

      setIsConfirmed(true);
      
      toast({
        title: "Order confirmed!",
        description: "We'll contact you within 24 hours for delivery",
      });

    } catch (error) {
      console.error('Error confirming order:', error);
      toast({
        title: "Order failed",
        description: "Please try again or contact us directly",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-warm py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="w-24 h-24 mx-auto mb-8 text-green-500" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your order. We'll contact you within 24 hours to arrange delivery.
            </p>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-bold">
                  <div className="flex justify-between">
                    <span>Total (COD):</span>
                    <span>₹{orderData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-traditional hover:opacity-90"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" onClick={() => navigate('/cart')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Cash on Delivery</h1>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Customer Details Form */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerDetails.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      value={customerDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your complete address"
                      className="pl-10 min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={customerDetails.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="Pincode"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions</Label>
                  <Textarea
                    id="notes"
                    value={customerDetails.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special delivery instructions..."
                    className="min-h-[60px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="shadow-soft h-fit">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="secondary" className="ml-2">
                          x{item.quantity}
                        </Badge>
                      </div>
                      <span className="font-medium">
                        ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">₹{orderData.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold mb-2">Payment Method</h4>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Cash on Delivery
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    Pay when your order is delivered to your doorstep.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-gradient-traditional hover:opacity-90 text-lg py-6 mt-6"
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Confirming Order...' : 'Confirm Order'}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  * Required fields must be filled to confirm your order
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
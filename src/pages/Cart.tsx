import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOrderNow = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to place an order",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Process the order through contact message system
      const orderDetails = {
        name: user.email?.split('@')[0] || 'Customer',
        email: user.email || '',
        phone: '',
        message: `Order Details:\n\n${items.map(item => 
          `${item.name} x ${item.quantity} = ₹${(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}`
        ).join('\n')}\n\nTotal: ₹${getTotalPrice().toFixed(2)}\n\nPlease process this order and contact me for payment and delivery details.`,
        subject: `New Order - Total: ₹${getTotalPrice().toFixed(2)}`
      };

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: orderDetails
      });

      if (error) throw error;

      toast({
        title: "Order placed successfully!",
        description: "We'll contact you soon with payment and delivery details",
      });

      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order failed",
        description: "Please try again or contact us directly",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-warm py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-8 text-muted-foreground" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Add some delicious appalam to your cart to get started!
            </p>
            <Link to="/">
              <Button className="bg-gradient-traditional hover:opacity-90">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
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
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Your Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                        <p className="text-2xl font-bold text-primary">{item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <Badge variant="secondary" className="px-3 py-1 text-lg">
                          {item.quantity}
                        </Badge>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft sticky top-4">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">₹{getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <Button 
                      className="w-full bg-gradient-traditional hover:opacity-90 text-lg py-6"
                      onClick={handleOrderNow}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Order Now'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    We'll contact you for payment and delivery details after you place the order.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
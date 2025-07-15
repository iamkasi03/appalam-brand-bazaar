import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Package, Info } from 'lucide-react';
import productImage from '@/assets/product-packages.jpg';

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Baskaran Appalam - 100g",
      price: "₹45",
      originalPrice: "₹55",
      description: "Perfect for small families. Contains 15-20 pieces of premium appalam.",
      features: ["100g Pack", "15-20 Pieces", "Family Size", "Fresh & Crispy"],
      rating: 4.8,
      inStock: true,
      bestSeller: true
    },
    {
      id: 2,
      name: "Baskaran Appalam - 200g",
      price: "₹85",
      originalPrice: "₹100",
      description: "Great value pack for large families and bulk buyers. Contains 30-40 pieces.",
      features: ["200g Pack", "30-40 Pieces", "Value Pack", "Bulk Savings"],
      rating: 4.9,
      inStock: true,
      bestSeller: false
    }
  ];

  const ingredients = [
    "Urad Flour (Black Gram)",
    "Rice Flour",
    "Edible Oil",
    "Salt",
    "Baking Soda",
    "Asafoetida (Hing)"
  ];

  return (
    <section id="products" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Premium Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our carefully crafted appalam varieties, made with the finest ingredients 
            and traditional recipes from Madurai.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-warm hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {product.bestSeller && (
                      <Badge className="bg-accent text-accent-foreground mb-2">
                        Best Seller
                      </Badge>
                    )}
                    <CardTitle className="text-2xl text-foreground">{product.name}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{product.price}</div>
                    <div className="text-sm text-muted-foreground line-through">{product.originalPrice}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                
                <p className="text-muted-foreground mb-6">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Package className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex gap-3">
                <Button className="flex-1 bg-gradient-traditional hover:opacity-90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Ingredients Section */}
        <Card className="max-w-4xl mx-auto shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground flex items-center justify-center">
              <Package className="w-6 h-6 mr-3 text-primary" />
              Pure Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-8">
              We use only the finest, traditional ingredients to ensure authentic taste and quality.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{ingredient}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Products;
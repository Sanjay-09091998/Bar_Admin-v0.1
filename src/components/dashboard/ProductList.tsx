import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  age?: number;
  inStock: boolean;
  description?: string;
}

interface ProductListProps {
  products?: Product[];
  onAddProduct?: () => void;
  onProductClick?: (product: Product) => void;
}

const ProductList = ({
  products = [
    {
      id: "1",
      name: "Premium Vodka",
      type: "Vodka",
      price: 29.99,
      inStock: true,
      description: "Smooth premium vodka",
    },
    {
      id: "2",
      name: "Single Malt Whiskey",
      type: "Whiskey",
      price: 89.99,
      age: 12,
      inStock: true,
      description: "Aged 12 years",
    },
    {
      id: "3",
      name: "Craft Gin",
      type: "Gin",
      price: 34.99,
      inStock: false,
      description: "Artisanal gin with botanicals",
    },
  ],
  onAddProduct = () => {},
  onProductClick = () => {},
}: ProductListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search products..." className="pl-9" />
        </div>
        <Button onClick={onAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onProductClick(product)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="space-x-2">
                  <Badge variant="outline">{product.type}</Badge>
                  {product.age && (
                    <Badge variant="outline">{product.age} years</Badge>
                  )}
                </div>
                {product.description && (
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

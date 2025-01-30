import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Star, MapPin, Phone, Mail, Clock } from "lucide-react";

interface Bar {
  id: string;
  name: string;
  type: string;
  locality: string;
  rating: number;
  status: "active" | "inactive";
  address?: string;
  phone?: string;
  email?: string;
  openingHours?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  age?: number;
  type: string;
  inStock: boolean;
}

interface BarDetailsDialogProps {
  bar: Bar;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mappedProducts?: Product[];
  availableProducts?: Product[];
  onMapProduct?: (productId: string) => void;
}

const BarDetailsDialog = ({
  bar,
  open,
  onOpenChange,
  mappedProducts = [],
  availableProducts = [],
  onMapProduct = () => {},
}: BarDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{bar.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">
                {bar.rating.toFixed(1)} Rating
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{bar.address || "123 Main St, City"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{bar.phone || "+1 234 567 890"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{bar.email || "contact@bar.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{bar.openingHours || "9:00 AM - 2:00 AM"}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Details</h3>
              <div className="space-x-2">
                <Badge>{bar.type}</Badge>
                <Badge variant="outline">{bar.locality}</Badge>
                <Badge
                  variant={bar.status === "active" ? "default" : "secondary"}
                >
                  {bar.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Mapped Products</h3>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>

            <ScrollArea className="h-[300px] border rounded-md p-4">
              <div className="space-y-2">
                {mappedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${product.price} | {product.type}
                        {product.age && ` | ${product.age} years`}
                      </div>
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BarDetailsDialog;

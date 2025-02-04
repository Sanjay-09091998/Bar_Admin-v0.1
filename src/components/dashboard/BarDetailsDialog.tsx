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

import { type Bar } from "@/lib/api/bars";
import { type Product } from "@/lib/api/products";

interface BarDetailsDialogProps {
  bar: Bar & { products?: Product[] };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMapProduct?: (productId: string) => void;
}

const BarDetailsDialog = ({
  bar,
  open,
  onOpenChange,
  onMapProduct = () => {},
}: BarDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            {bar.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium text-black">
                {(bar.rating || 0).toFixed(1)} Rating
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-black">
                  {bar.address || "123 Main St, City"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-black">
                  {bar.phone || "+1 234 567 890"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-black">
                  {bar.email || "contact@bar.com"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-black">
                  {bar.opening_hours || "9:00 AM - 2:00 AM"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-2">Details</h3>
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
              <h3 className="font-semibold text-black">Mapped Products</h3>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => onMapProduct(bar.id)}
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>

            <ScrollArea className="h-[300px] border rounded-md p-4 bg-white">
              <div className="space-y-2">
                {bar.products?.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 border rounded-md bg-white"
                  >
                    <div>
                      <div className="font-medium text-black">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${product.bottle_price} | {product.type}
                        {product.age && ` | ${product.age} years`}
                      </div>
                    </div>
                    <Badge variant={product.in_stock ? "default" : "secondary"}>
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                ))}
                {(!bar.products || bar.products.length === 0) && (
                  <div className="text-center text-gray-500 py-4">
                    No products mapped to this bar yet
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BarDetailsDialog;

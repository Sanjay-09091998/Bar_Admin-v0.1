import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  type: string;
  servingSizes: {
    small: { size: number; price: number };
    medium: { size: number; price: number };
    large: { size: number; price: number };
  };
}

interface Bar {
  id: string;
  name: string;
}

interface OrderItem {
  productId: string;
  size: "small" | "medium" | "large";
  quantity: number;
  price: number;
}

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  products?: Product[];
  bars?: Bar[];
}

const AddOrderDialog = ({
  open,
  onOpenChange,
  onSubmit = () => {},
  products = [],
  bars = [],
}: AddOrderDialogProps) => {
  const [selectedBar, setSelectedBar] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const addItem = (product: Product, size: "small" | "medium" | "large") => {
    const existingItem = orderItems.find(
      (item) => item.productId === product.id && item.size === size,
    );

    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          productId: product.id,
          size,
          quantity: 1,
          price: product.servingSizes[size].price,
        },
      ]);
    }
  };

  const removeItem = (
    productId: string,
    size: "small" | "medium" | "large",
  ) => {
    setOrderItems(
      orderItems
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const getItemQuantity = (
    productId: string,
    size: "small" | "medium" | "large",
  ) => {
    const item = orderItems.find(
      (item) => item.productId === productId && item.size === size,
    );
    return item?.quantity || 0;
  };

  const getTotalAmount = () => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const handleSubmit = () => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      barId: selectedBar,
      customerName,
      tableNumber,
      items: orderItems,
      totalAmount: getTotalAmount(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    onSubmit(order);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bar</Label>
              <Select value={selectedBar} onValueChange={setSelectedBar}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bar" />
                </SelectTrigger>
                <SelectContent>
                  {bars.map((bar) => (
                    <SelectItem key={bar.id} value={bar.id}>
                      {bar.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Customer Name</Label>
              <Input
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Table Number</Label>
              <Input
                placeholder="Enter table number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <div className="font-semibold text-lg">Order Summary</div>
              <div className="mt-2 space-y-2">
                {orderItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex items-center justify-between border rounded-md p-2"
                    >
                      <div>
                        <div className="font-medium">{product?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product?.servingSizes[item.size].size}ml x{" "}
                          {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
                {orderItems.length > 0 && (
                  <div className="flex items-center justify-between font-semibold pt-2">
                    <div>Total</div>
                    <div>${getTotalAmount().toFixed(2)}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label>Available Products</Label>
            <ScrollArea className="h-[500px] border rounded-md p-4 mt-2">
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border rounded-md p-3 space-y-2"
                  >
                    <div className="font-medium">{product.name}</div>
                    <Badge variant="outline">{product.type}</Badge>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {Object.entries(product.servingSizes).map(
                        ([size, details]) => (
                          <div
                            key={size}
                            className="border rounded-md p-2 space-y-1"
                          >
                            <div className="text-sm font-medium">
                              {details.size}ml - ${details.price}
                            </div>
                            <div className="flex items-center justify-between">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  removeItem(product.id, size as any)
                                }
                                disabled={
                                  !getItemQuantity(product.id, size as any)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-medium">
                                {getItemQuantity(product.id, size as any)}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => addItem(product, size as any)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedBar || orderItems.length === 0}
            >
              Create Order
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;

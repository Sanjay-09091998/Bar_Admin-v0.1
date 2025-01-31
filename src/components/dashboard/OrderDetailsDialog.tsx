import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, User, Hash } from "lucide-react";

interface OrderItem {
  productId: string;
  size: "small" | "medium" | "large";
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  barId: string;
  customerName: string;
  tableNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

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

interface OrderDetailsDialogProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products?: Product[];
}

const OrderDetailsDialog = ({
  order,
  open,
  onOpenChange,
  products = [],
}: OrderDetailsDialogProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Order #{order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  Customer Details
                </div>
                <div className="mt-2 space-y-1">
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-muted-foreground">
                    Table {order.tableNumber}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Order Status
                </div>
                <div className="mt-2 space-y-1">
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Created at {formatDate(order.createdAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <ScrollArea className="h-[300px] border rounded-md p-4">
              <div className="space-y-3">
                {order.items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex items-center justify-between border-b pb-3 last:border-0"
                    >
                      <div>
                        <div className="font-medium">{product?.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product?.servingSizes[item.size].size}ml x{" "}
                          {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="font-semibold">Total Amount</div>
            <div className="text-xl font-bold">
              ${order.totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;

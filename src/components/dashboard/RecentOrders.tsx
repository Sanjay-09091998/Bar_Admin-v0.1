import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowUpRight } from "lucide-react";

interface Order {
  id: string;
  barName: string;
  time: string;
  amount: string;
  status: "pending" | "completed" | "cancelled";
}

interface RecentOrdersProps {
  orders?: Order[];
}

const RecentOrders = ({
  orders = [
    {
      id: "1",
      barName: "Downtown Pub",
      time: "10 mins ago",
      amount: "$156.00",
      status: "pending",
    },
    {
      id: "2",
      barName: "Skyline Lounge",
      time: "25 mins ago",
      amount: "$89.50",
      status: "completed",
    },
    {
      id: "3",
      barName: "Harbor Bar",
      time: "45 mins ago",
      amount: "$234.00",
      status: "completed",
    },
    {
      id: "4",
      barName: "The Local",
      time: "1 hour ago",
      amount: "$45.00",
      status: "cancelled",
    },
  ],
}: RecentOrdersProps) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Orders
          </div>
        </CardTitle>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bar</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.barName}</TableCell>
                <TableCell className="text-muted-foreground">
                  {order.time}
                </TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(order.status)}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;

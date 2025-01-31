import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import OrderList from "@/components/dashboard/OrderList";
import OrderDetailsDialog from "@/components/dashboard/OrderDetailsDialog";
import CustomerList from "@/components/dashboard/CustomerList";
import CustomerDetailsDialog from "@/components/dashboard/CustomerDetailsDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const { toast } = useToast();

  // Mock data for testing
  const mockProducts = [
    {
      id: "1",
      name: "Premium Scotch Whiskey",
      type: "Whiskey",
      servingSizes: {
        small: { size: 45, price: 12.99 },
        medium: { size: 60, price: 15.99 },
        large: { size: 90, price: 22.99 },
      },
    },
    {
      id: "2",
      name: "Craft Gin",
      type: "Gin",
      servingSizes: {
        small: { size: 45, price: 8.99 },
        medium: { size: 60, price: 11.99 },
        large: { size: 90, price: 16.99 },
      },
    },
  ];

  const mockCustomers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      totalOrders: 15,
      totalSpent: 450.75,
      lastOrderDate: "2024-03-15T14:30:00",
      status: "active",
      orderHistory: [
        {
          id: "ord_1",
          date: "2024-03-15T14:30:00",
          total: 45.99,
          status: "completed",
        },
        {
          id: "ord_2",
          date: "2024-03-10T18:20:00",
          total: 32.5,
          status: "completed",
        },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      totalOrders: 8,
      totalSpent: 275.25,
      lastOrderDate: "2024-03-14T19:45:00",
      status: "active",
      orderHistory: [
        {
          id: "ord_3",
          date: "2024-03-14T19:45:00",
          total: 38.75,
          status: "completed",
        },
      ],
    },
  ];

  const handleStatusChange = (order, newStatus) => {
    setOrders(
      orders.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o)),
    );
    toast({
      title: "Order Updated",
      description: `Order #${order.id} has been marked as ${newStatus}.`,
    });
  };

  // Simulate fetching orders from an API
  useEffect(() => {
    // In a real app, this would be an API call
    const mockOrders = [
      {
        id: "ord_1",
        barId: "1",
        customerName: "John Doe",
        tableNumber: "T1",
        items: [
          {
            productId: "1",
            size: "medium",
            quantity: 2,
            price: 15.99,
          },
        ],
        totalAmount: 31.98,
        status: "pending",
        createdAt: "2024-03-15T14:30:00",
      },
      {
        id: "ord_2",
        barId: "2",
        customerName: "Jane Smith",
        tableNumber: "T3",
        items: [
          {
            productId: "2",
            size: "small",
            quantity: 1,
            price: 8.99,
          },
        ],
        totalAmount: 8.99,
        status: "completed",
        createdAt: "2024-03-14T19:45:00",
      },
    ];
    setOrders(mockOrders);
  }, []);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <h1 className="text-3xl font-bold">Orders & Customers</h1>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <OrderList
              orders={orders}
              onViewDetails={setSelectedOrder}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <CustomerList
              customers={mockCustomers}
              onViewDetails={setSelectedCustomer}
            />
          </TabsContent>
        </Tabs>

        {selectedOrder && (
          <OrderDetailsDialog
            order={selectedOrder}
            open={!!selectedOrder}
            onOpenChange={() => setSelectedOrder(null)}
            products={mockProducts}
          />
        )}

        {selectedCustomer && (
          <CustomerDetailsDialog
            customer={selectedCustomer}
            open={!!selectedCustomer}
            onOpenChange={() => setSelectedCustomer(null)}
          />
        )}
      </main>
    </div>
  );
};

export default OrdersPage;

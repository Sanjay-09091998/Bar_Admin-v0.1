import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X, Edit2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Offer {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: string;
  endDate: string;
  status: "active" | "scheduled" | "expired";
  products: string[];
}

const MarketingPage = () => {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: "1",
      title: "Happy Hour Special",
      description: "20% off on all drinks between 4 PM and 7 PM",
      discountType: "percentage",
      discountValue: 20,
      startDate: "2024-03-15T16:00",
      endDate: "2024-03-15T19:00",
      status: "active",
      products: ["1", "2"],
    },
  ]);

  const [newOffer, setNewOffer] = useState<Partial<Offer>>({
    title: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    startDate: "",
    endDate: "",
    products: [],
  });

  const { toast } = useToast();

  const handleCreateOffer = () => {
    const offer: Offer = {
      id: Math.random().toString(36).substr(2, 9),
      ...(newOffer as Offer),
      status: "scheduled",
    };
    setOffers([...offers, offer]);
    setNewOffer({
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      startDate: "",
      endDate: "",
      products: [],
    });
    toast({
      title: "Offer Created",
      description: `${offer.title} has been created successfully.`,
    });
  };

  const mockProducts = [
    { id: "1", name: "Premium Scotch Whiskey" },
    { id: "2", name: "Craft Gin" },
    { id: "3", name: "Premium Vodka" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <h1 className="text-3xl font-bold">Marketing</h1>

        <Tabs defaultValue="offers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="offers">Offers & Promotions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="offers" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Offers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {offers.map((offer) => (
                          <Card key={offer.id}>
                            <CardContent className="pt-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {offer.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {offer.description}
                                  </p>
                                </div>
                                <Badge
                                  variant={
                                    offer.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {offer.status}
                                </Badge>
                              </div>
                              <div className="mt-4 flex items-center gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">
                                    Discount:
                                  </span>{" "}
                                  {offer.discountValue}
                                  {offer.discountType === "percentage"
                                    ? "%"
                                    : "$"}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">
                                    Period:
                                  </span>{" "}
                                  {new Date(offer.startDate).toLocaleString()} -{" "}
                                  {new Date(offer.endDate).toLocaleString()}
                                </div>
                              </div>
                              <div className="mt-2">
                                <span className="text-sm text-muted-foreground">
                                  Applied to:{" "}
                                </span>
                                <div className="flex gap-2 mt-1">
                                  {offer.products.map((productId) => (
                                    <Badge key={productId} variant="outline">
                                      {
                                        mockProducts.find(
                                          (p) => p.id === productId,
                                        )?.name
                                      }
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Offer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Offer Title</Label>
                        <Input
                          placeholder="Enter offer title"
                          value={newOffer.title}
                          onChange={(e) =>
                            setNewOffer({ ...newOffer, title: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Enter offer description"
                          value={newOffer.description}
                          onChange={(e) =>
                            setNewOffer({
                              ...newOffer,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Discount Type</Label>
                          <select
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            value={newOffer.discountType}
                            onChange={(e) =>
                              setNewOffer({
                                ...newOffer,
                                discountType: e.target.value as
                                  | "percentage"
                                  | "fixed",
                              })
                            }
                          >
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed Amount</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label>Discount Value</Label>
                          <Input
                            type="number"
                            placeholder="Enter value"
                            value={newOffer.discountValue}
                            onChange={(e) =>
                              setNewOffer({
                                ...newOffer,
                                discountValue: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="datetime-local"
                            value={newOffer.startDate}
                            onChange={(e) =>
                              setNewOffer({
                                ...newOffer,
                                startDate: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="datetime-local"
                            value={newOffer.endDate}
                            onChange={(e) =>
                              setNewOffer({
                                ...newOffer,
                                endDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Select Products</Label>
                        <ScrollArea className="h-[100px] border rounded-md p-2">
                          <div className="space-y-2">
                            {mockProducts.map((product) => (
                              <div
                                key={product.id}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="checkbox"
                                  checked={newOffer.products?.includes(
                                    product.id,
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewOffer({
                                        ...newOffer,
                                        products: [
                                          ...(newOffer.products || []),
                                          product.id,
                                        ],
                                      });
                                    } else {
                                      setNewOffer({
                                        ...newOffer,
                                        products: newOffer.products?.filter(
                                          (id) => id !== product.id,
                                        ),
                                      });
                                    }
                                  }}
                                />
                                <span>{product.name}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>

                      <Button
                        className="w-full"
                        onClick={handleCreateOffer}
                        disabled={
                          !newOffer.title ||
                          !newOffer.description ||
                          !newOffer.startDate ||
                          !newOffer.endDate ||
                          !newOffer.products?.length
                        }
                      >
                        Create Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="flex justify-center items-center p-8 border rounded-lg bg-background">
              <div className="text-center">
                <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                <p className="text-muted-foreground mt-2">
                  View detailed analytics in the Analytics section
                </p>
                <Button
                  variant="default"
                  className="mt-4"
                  onClick={() => (window.location.href = "/analytics")}
                >
                  Go to Analytics
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MarketingPage;

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
import { Textarea } from "@/components/ui/textarea";
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

interface AddBarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  availableProducts?: Product[];
}

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
}

const AddBarDialog = ({
  open,
  onOpenChange,
  onSubmit = () => {},
  availableProducts = [],
}: AddBarDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    address: "",
    mapLink: "",
    phone: "",
    email: "",
    openingHours: "",
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newBar = {
      name: formData.name,
      type: formData.type as "pub" | "lounge" | "nightclub" | "sports_bar",
      description: formData.description,
      address: formData.address,
      map_link: formData.mapLink,
      phone: formData.phone,
      email: formData.email,
      opening_hours: formData.openingHours,
      image_url:
        imageUrl ||
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
      locality: formData.address.split(",")[1]?.trim() || "downtown",
      products: selectedProducts || [],
      status: "active",
      rating: 0,
      updated_at: new Date().toISOString(),
    };

    onSubmit(newBar);
    onOpenChange(false);
  };

  const fillMockData = () => {
    const mockBars = [
      {
        name: "The Vintage Pub",
        description: "A classic British-style pub with a modern twist",
        type: "pub",
        address: "123 Main St, Downtown",
        mapLink: "https://maps.google.com/?q=123+Main+St",
        phone: "+1 (555) 123-4567",
        email: "contact@vintagepub.com",
        openingHours: "Mon-Sun: 11:00 AM - 2:00 AM",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
      },
      {
        name: "Skyline Lounge",
        description: "Upscale rooftop lounge with panoramic city views",
        type: "lounge",
        address: "456 High Rise Ave, Uptown",
        mapLink: "https://maps.google.com/?q=456+High+Rise+Ave",
        phone: "+1 (555) 987-6543",
        email: "info@skylinelounge.com",
        openingHours: "Tue-Sun: 4:00 PM - 2:00 AM",
        image:
          "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1000",
      },
      {
        name: "Neon Nightclub",
        description: "Modern nightclub featuring top DJs and events",
        type: "nightclub",
        address: "789 Party St, Downtown",
        mapLink: "https://maps.google.com/?q=789+Party+St",
        phone: "+1 (555) 555-0123",
        email: "events@neonnights.com",
        openingHours: "Thu-Sun: 9:00 PM - 4:00 AM",
        image:
          "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000",
      },
    ];

    const randomBar = mockBars[Math.floor(Math.random() * mockBars.length)];
    setFormData(randomBar);
    setImageUrl(randomBar.image);

    // Randomly select 2-3 products
    const numProducts = Math.floor(Math.random() * 2) + 2;
    const randomProducts = [...availableProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, numProducts)
      .map((p) => p.id);
    setSelectedProducts(randomProducts);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Bar</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bar Image</Label>
              <div
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50"
                onClick={() =>
                  setImageUrl(
                    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
                  )
                }
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Bar preview"
                    className="h-40 w-full object-cover rounded-md"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center">
                    <span className="text-gray-500">Click to upload image</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bar Name</Label>
              <Input
                placeholder="Enter bar name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter bar description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Bar Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pub">Pub</SelectItem>
                  <SelectItem value="lounge">Lounge</SelectItem>
                  <SelectItem value="nightclub">Nightclub</SelectItem>
                  <SelectItem value="sports_bar">Sports Bar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Google Maps Link</Label>
              <Input
                placeholder="Enter Google Maps URL"
                value={formData.mapLink}
                onChange={(e) => handleChange("mapLink", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Contact Information</Label>
              <Input
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <Input
                placeholder="Email address"
                className="mt-2"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Opening Hours</Label>
              <Input
                placeholder="e.g., Mon-Sun: 10:00 AM - 2:00 AM"
                value={formData.openingHours}
                onChange={(e) => handleChange("openingHours", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Map Products</Label>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                <div className="space-y-2">
                  {availableProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-2 border rounded-md cursor-pointer hover:bg-slate-50"
                      onClick={() => {
                        setSelectedProducts((prev) =>
                          prev.includes(product.id)
                            ? prev.filter((id) => id !== product.id)
                            : [...prev, product.id],
                        );
                      }}
                    >
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ${product.price} | {product.type}
                        </div>
                      </div>
                      <Badge
                        variant={
                          selectedProducts.includes(product.id)
                            ? "default"
                            : "outline"
                        }
                      >
                        {selectedProducts.includes(product.id)
                          ? "Selected"
                          : "Select"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 right-0 left-0 bg-white py-4 border-t mt-6">
          <div className="flex justify-between items-center w-full">
            <Button variant="outline" onClick={fillMockData} type="button">
              Fill Mock Data
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Bar</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBarDialog;

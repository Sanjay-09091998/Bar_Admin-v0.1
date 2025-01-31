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

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

const AddProductDialog = ({
  open,
  onOpenChange,
  onSubmit = () => {},
}: AddProductDialogProps) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    type: "",
    bottlePrice: "",
    bottleSize: "750", // Default 750ml
    servingSizes: {
      small: { size: 45, price: "" },
      medium: { size: 60, price: "" },
      large: { size: 90, price: "" },
    },
    description: "",
    age: "",
    offers: [],
  });

  const handleChange = (field: string, value: string) => {
    if (field.startsWith("serving_")) {
      const [_, size] = field.split("_");
      setFormData((prev) => ({
        ...prev,
        servingSizes: {
          ...prev.servingSizes,
          [size]: { ...prev.servingSizes[size], price: value },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      bottlePrice: parseFloat(formData.bottlePrice),
      bottleSize: parseInt(formData.bottleSize),
      servingSizes: {
        small: {
          ...formData.servingSizes.small,
          price: parseFloat(formData.servingSizes.small.price) || 0,
        },
        medium: {
          ...formData.servingSizes.medium,
          price: parseFloat(formData.servingSizes.medium.price) || 0,
        },
        large: {
          ...formData.servingSizes.large,
          price: parseFloat(formData.servingSizes.large.price) || 0,
        },
      },
      age: formData.age ? parseInt(formData.age) : undefined,
      inStock: true,
    };

    onSubmit(newProduct);
    onOpenChange(false);
  };

  const fillMockData = () => {
    const mockProducts = [
      {
        name: "Premium Scotch Whiskey",
        type: "Whiskey",
        bottlePrice: "89.99",
        bottleSize: "750",
        servingSizes: {
          small: { size: 45, price: "12.99" },
          medium: { size: 60, price: "15.99" },
          large: { size: 90, price: "22.99" },
        },
        description: "Aged single malt scotch whiskey",
        age: "12",
      },
      {
        name: "Craft Gin",
        type: "Gin",
        bottlePrice: "45.99",
        bottleSize: "750",
        servingSizes: {
          small: { size: 45, price: "8.99" },
          medium: { size: 60, price: "11.99" },
          large: { size: 90, price: "16.99" },
        },
        description: "Artisanal gin with botanical infusions",
        age: "",
      },
      {
        name: "Premium Vodka",
        type: "Vodka",
        bottlePrice: "39.99",
        bottleSize: "750",
        servingSizes: {
          small: { size: 45, price: "7.99" },
          medium: { size: 60, price: "10.99" },
          large: { size: 90, price: "14.99" },
        },
        description: "Ultra-smooth premium vodka",
        age: "",
      },
    ];

    const randomProduct =
      mockProducts[Math.floor(Math.random() * mockProducts.length)];
    setFormData(randomProduct);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Product Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Whiskey">Whiskey</SelectItem>
                <SelectItem value="Vodka">Vodka</SelectItem>
                <SelectItem value="Gin">Gin</SelectItem>
                <SelectItem value="Rum">Rum</SelectItem>
                <SelectItem value="Tequila">Tequila</SelectItem>
                <SelectItem value="Beer">Beer</SelectItem>
                <SelectItem value="Wine">Wine</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Bottle Details</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm">Bottle Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter bottle price"
                  value={formData.bottlePrice}
                  onChange={(e) => handleChange("bottlePrice", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm">Bottle Size (ml)</Label>
                <Select
                  value={formData.bottleSize}
                  onValueChange={(value) => handleChange("bottleSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="750">750ml</SelectItem>
                    <SelectItem value="700">700ml</SelectItem>
                    <SelectItem value="1000">1000ml</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Serving Sizes Pricing</Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm">45ml Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Price for 45ml"
                  value={formData.servingSizes.small.price}
                  onChange={(e) =>
                    handleChange("serving_small", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-sm">60ml Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Price for 60ml"
                  value={formData.servingSizes.medium.price}
                  onChange={(e) =>
                    handleChange("serving_medium", e.target.value)
                  }
                />
              </div>
              <div>
                <Label className="text-sm">90ml Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Price for 90ml"
                  value={formData.servingSizes.large.price}
                  onChange={(e) =>
                    handleChange("serving_large", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {["Whiskey"].includes(formData.type) && (
            <div className="space-y-2">
              <Label>Age (Years)</Label>
              <Input
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={fillMockData} type="button">
            Fill Mock Data
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Create Product</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

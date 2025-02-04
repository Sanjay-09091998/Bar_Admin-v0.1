import React, { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  initialData?: any;
}

const AddProductDialog = ({
  open,
  onOpenChange,
  onSubmit = () => {},
  initialData = null,
}: AddProductDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    bottle_price: "",
    bottle_size: "",
    age: "",
    in_stock: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        description: initialData.description || "",
        bottle_price: initialData.bottle_price.toString(),
        bottle_size: initialData.bottle_size.toString(),
        age: initialData.age?.toString() || "",
        in_stock: initialData.in_stock,
      });
    } else {
      setFormData({
        name: "",
        type: "",
        description: "",
        bottle_price: "",
        bottle_size: "",
        age: "",
        in_stock: true,
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      bottle_price: parseFloat(formData.bottle_price),
      bottle_size: parseInt(formData.bottle_size),
      age: formData.age ? parseInt(formData.age) : null,
    });
    onOpenChange(false);
  };

  const fillMockData = () => {
    const mockProducts = [
      {
        name: "Premium Scotch Whiskey",
        type: "Whiskey",
        description: "Aged single malt scotch whiskey",
        bottle_price: "89.99",
        bottle_size: "750",
        age: "12",
        in_stock: true,
      },
      {
        name: "Craft Gin",
        type: "Gin",
        description: "Artisanal gin with botanical infusions",
        bottle_price: "45.99",
        bottle_size: "700",
        age: "",
        in_stock: true,
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
          <DialogTitle>
            {initialData ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
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
            <Label>Description</Label>
            <Textarea
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bottle Price ($)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter price"
                value={formData.bottle_price}
                onChange={(e) => handleChange("bottle_price", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Bottle Size (ml)</Label>
              <Input
                type="number"
                placeholder="Enter size"
                value={formData.bottle_size}
                onChange={(e) => handleChange("bottle_size", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Age (Years)</Label>
            <Input
              type="number"
              placeholder="Enter age (optional)"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.in_stock}
              onCheckedChange={(checked) => handleChange("in_stock", checked)}
            />
            <Label>In Stock</Label>
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            {!initialData && (
              <Button variant="outline" onClick={fillMockData} type="button">
                Fill Mock Data
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !formData.name ||
                  !formData.type ||
                  !formData.bottle_price ||
                  !formData.bottle_size
                }
              >
                {initialData ? "Save Changes" : "Create Product"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

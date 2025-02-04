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

interface AddBarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
  initialData?: any;
}

const AddBarDialog = ({
  open,
  onOpenChange,
  onSubmit = () => {},
  initialData = null,
}: AddBarDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    mapLink: "",
    phone: "",
    email: "",
    openingHours: "",
    locality: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        description: initialData.description || "",
        address: initialData.address || "",
        mapLink: initialData.map_link || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        openingHours: initialData.opening_hours || "",
        locality: initialData.locality || "",
        imageUrl: initialData.image_url || "",
      });
    } else {
      setFormData({
        name: "",
        type: "",
        description: "",
        address: "",
        mapLink: "",
        phone: "",
        email: "",
        openingHours: "",
        locality: "",
        imageUrl: "",
      });
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      name: formData.name,
      type: formData.type,
      description: formData.description,
      address: formData.address,
      map_link: formData.mapLink,
      phone: formData.phone,
      email: formData.email,
      opening_hours: formData.openingHours,
      locality: formData.locality,
      image_url:
        formData.imageUrl ||
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
      status: "active",
    });
  };

  const fillMockData = () => {
    const mockBars = [
      {
        name: "The Vintage Pub",
        type: "pub",
        description: "A classic British-style pub with a modern twist",
        address: "123 Main St, Downtown",
        mapLink: "https://maps.google.com/?q=123+Main+St",
        phone: "+1 (555) 123-4567",
        email: "contact@vintagepub.com",
        openingHours: "Mon-Sun: 11:00 AM - 2:00 AM",
        locality: "downtown",
        imageUrl:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
      },
      {
        name: "Skyline Lounge",
        type: "lounge",
        description: "Upscale rooftop lounge with panoramic city views",
        address: "456 High Rise Ave, Uptown",
        mapLink: "https://maps.google.com/?q=456+High+Rise+Ave",
        phone: "+1 (555) 987-6543",
        email: "info@skylinelounge.com",
        openingHours: "Tue-Sun: 4:00 PM - 2:00 AM",
        locality: "uptown",
        imageUrl:
          "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=1000",
      },
    ];

    const randomBar = mockBars[Math.floor(Math.random() * mockBars.length)];
    setFormData(randomBar);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Bar" : "Add New Bar"}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Bar Name</Label>
              <Input
                placeholder="Enter bar name"
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
                  <SelectItem value="pub">Pub</SelectItem>
                  <SelectItem value="lounge">Lounge</SelectItem>
                  <SelectItem value="nightclub">Nightclub</SelectItem>
                  <SelectItem value="sports_bar">Sports Bar</SelectItem>
                </SelectContent>
              </Select>
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
              <Label>Locality</Label>
              <Select
                value={formData.locality}
                onValueChange={(value) => handleChange("locality", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select locality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="uptown">Uptown</SelectItem>
                  <SelectItem value="suburbs">Suburbs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                placeholder="Enter image URL"
                value={formData.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Bar preview"
                  className="mt-2 rounded-md h-32 w-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Address</Label>
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

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email address"
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
          </div>
        </div>

        <DialogFooter className="mt-6 sticky bottom-0 bg-background py-4 border-t">
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
                disabled={!formData.name || !formData.type}
              >
                {initialData ? "Save Changes" : "Create Bar"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBarDialog;

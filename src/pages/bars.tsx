import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import BarList from "@/components/dashboard/BarList";
import BarDetailsDialog from "@/components/dashboard/BarDetailsDialog";
import AddBarDialog from "@/components/dashboard/AddBarDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BarsPage = () => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [showAddBar, setShowAddBar] = useState(false);
  const { toast } = useToast();

  const handleAddBar = (newBar) => {
    toast({
      title: "Bar Created",
      description: `${newBar.name} has been successfully created.`,
    });
    // In a real app, you would add this to your bars list
    console.log("New bar created:", newBar);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Bars</h1>
          <Button onClick={() => setShowAddBar(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Bar
          </Button>
        </div>

        <BarList
          onViewDetails={(bar) => setSelectedBar(bar)}
          selectedBar={selectedBar}
        />

        {selectedBar && (
          <BarDetailsDialog
            bar={selectedBar}
            open={!!selectedBar}
            onOpenChange={() => setSelectedBar(null)}
          />
        )}

        <AddBarDialog
          open={showAddBar}
          onOpenChange={setShowAddBar}
          onSubmit={handleAddBar}
          availableProducts={[
            {
              id: "1",
              name: "Premium Vodka",
              type: "Vodka",
              price: 29.99,
            },
            {
              id: "2",
              name: "Single Malt Whiskey",
              type: "Whiskey",
              price: 89.99,
            },
            {
              id: "3",
              name: "Craft Gin",
              type: "Gin",
              price: 34.99,
            },
            {
              id: "4",
              name: "Aged Rum",
              type: "Rum",
              price: 45.99,
            },
          ]}
        />
      </main>
    </div>
  );
};

export default BarsPage;

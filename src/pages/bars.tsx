import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import BarList from "@/components/dashboard/BarList";
import BarDetailsDialog from "@/components/dashboard/BarDetailsDialog";
import AddBarDialog from "@/components/dashboard/AddBarDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useBars } from "@/hooks/useBars";

const BarsPage = () => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [showAddBar, setShowAddBar] = useState(false);
  const { bars, isLoading, error, createBar, updateBar, deleteBar } = useBars();

  if (error) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-destructive">
              Error loading bars
            </h2>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  const handleAddBar = async (data) => {
    try {
      await createBar.mutateAsync({
        name: data.name,
        type: data.type,
        description: data.description,
        address: data.address,
        map_link: data.mapLink,
        phone: data.phone,
        email: data.email,
        opening_hours: data.openingHours,
        image_url: data.image,
        locality: data.locality,
      });
      setShowAddBar(false);
    } catch (error) {
      console.error("Failed to create bar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
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
          bars={bars}
          onViewDetails={(bar) => setSelectedBar(bar)}
          onEdit={(bar) => {
            setSelectedBar(bar);
            setShowAddBar(true);
          }}
          onDelete={async (bar) => {
            try {
              await deleteBar.mutateAsync(bar.id);
            } catch (error) {
              console.error("Failed to delete bar:", error);
            }
          }}
          onStatusChange={async (bar, status) => {
            try {
              await updateBar.mutateAsync({
                id: bar.id,
                updates: { status },
              });
            } catch (error) {
              console.error("Failed to update bar status:", error);
            }
          }}
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
        />
      </main>
    </div>
  );
};

export default BarsPage;

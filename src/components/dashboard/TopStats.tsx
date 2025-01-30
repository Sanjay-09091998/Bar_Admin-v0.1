import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  ShoppingCart,
  AlertTriangle,
  DollarSign,
} from "lucide-react";

interface TopStatsProps {
  totalBars?: number;
  activeOrders?: number;
  inventoryAlerts?: number;
  dailyRevenue?: number;
}

const TopStats = ({
  totalBars = 24,
  activeOrders = 156,
  inventoryAlerts = 8,
  dailyRevenue = 12459,
}: TopStatsProps) => {
  return (
    <div className="w-full bg-background p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Building2 className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Bars
            </p>
            <h3 className="text-2xl font-bold">{totalBars}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <ShoppingCart className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Active Orders
            </p>
            <h3 className="text-2xl font-bold">{activeOrders}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <AlertTriangle className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Inventory Alerts
            </p>
            <h3 className="text-2xl font-bold">{inventoryAlerts}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <DollarSign className="h-6 w-6 text-purple-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Daily Revenue
            </p>
            <h3 className="text-2xl font-bold">
              ${dailyRevenue.toLocaleString()}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopStats;

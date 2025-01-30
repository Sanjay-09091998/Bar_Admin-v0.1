import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package } from "lucide-react";

interface InventoryAlert {
  id: string;
  barName: string;
  productName: string;
  currentStock: number;
  minThreshold: number;
  severity: "low" | "critical";
}

interface InventoryAlertsProps {
  alerts?: InventoryAlert[];
}

const InventoryAlerts = ({ alerts = defaultAlerts }: InventoryAlertsProps) => {
  return (
    <Card className="w-full h-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Inventory Alerts</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-full ${alert.severity === "critical" ? "bg-red-100" : "bg-yellow-100"}`}
              >
                <AlertTriangle
                  className={`h-4 w-4 ${alert.severity === "critical" ? "text-red-600" : "text-yellow-600"}`}
                />
              </div>
              <div>
                <h4 className="font-medium">{alert.productName}</h4>
                <p className="text-sm text-muted-foreground">{alert.barName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {alert.currentStock} units left
                  </span>
                  <Badge
                    variant={
                      alert.severity === "critical" ? "destructive" : "warning"
                    }
                  >
                    {alert.severity === "critical" ? "Critical" : "Low Stock"}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Order Stock
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const defaultAlerts: InventoryAlert[] = [
  {
    id: "1",
    barName: "Downtown Pub",
    productName: "Premium Vodka",
    currentStock: 2,
    minThreshold: 10,
    severity: "critical",
  },
  {
    id: "2",
    barName: "Skyline Lounge",
    productName: "Craft Beer",
    currentStock: 15,
    minThreshold: 20,
    severity: "low",
  },
  {
    id: "3",
    barName: "Beach Bar",
    productName: "Tequila",
    currentStock: 3,
    minThreshold: 8,
    severity: "critical",
  },
  {
    id: "4",
    barName: "Night Club",
    productName: "Whiskey",
    currentStock: 8,
    minThreshold: 12,
    severity: "low",
  },
];

export default InventoryAlerts;

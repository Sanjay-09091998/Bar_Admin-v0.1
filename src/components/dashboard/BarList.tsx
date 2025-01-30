import React, { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Info } from "lucide-react";
import BarDetailsDialog from "./BarDetailsDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarFilters from "./BarFilters";

interface Bar {
  id: string;
  name: string;
  type: string;
  locality: string;
  rating: number;
  status: "active" | "inactive";
  sales: number;
  address?: string;
  phone?: string;
  email?: string;
  openingHours?: string;
}

interface BarListProps {
  bars?: Bar[];
  onEdit?: (bar: Bar) => void;
  onDelete?: (bar: Bar) => void;
  onStatusChange?: (bar: Bar, status: "active" | "inactive") => void;
}

const BarList = ({
  onViewDetails = () => {},
  selectedBar = null,
  bars = [
    {
      id: "1",
      name: "Downtown Pub",
      type: "pub",
      locality: "downtown",
      rating: 4.5,
      status: "active",
      sales: 25000,
    },
    {
      id: "2",
      name: "Uptown Lounge",
      type: "lounge",
      locality: "uptown",
      rating: 4.2,
      status: "active",
      sales: 32000,
    },
    {
      id: "3",
      name: "Night Owl Club",
      type: "nightclub",
      locality: "downtown",
      rating: 4.0,
      status: "inactive",
      sales: 18000,
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onStatusChange = () => {},
}: BarListProps) => {
  return (
    <div className="w-full bg-background rounded-md border">
      <BarFilters />
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Locality</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bars.map((bar) => (
              <TableRow key={bar.id}>
                <TableCell className="font-medium">{bar.name}</TableCell>
                <TableCell className="capitalize">{bar.type}</TableCell>
                <TableCell className="capitalize">{bar.locality}</TableCell>
                <TableCell>{bar.rating.toFixed(1)}</TableCell>
                <TableCell>
                  <Badge
                    variant={bar.status === "active" ? "default" : "secondary"}
                  >
                    {bar.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  ${bar.sales.toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewDetails(bar)}>
                        <Info className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(bar)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onStatusChange(
                            bar,
                            bar.status === "active" ? "inactive" : "active",
                          )
                        }
                      >
                        <Badge
                          variant={
                            bar.status === "active" ? "secondary" : "default"
                          }
                          className="mr-2"
                        >
                          {bar.status === "active" ? "Deactivate" : "Activate"}
                        </Badge>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(bar)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BarList;

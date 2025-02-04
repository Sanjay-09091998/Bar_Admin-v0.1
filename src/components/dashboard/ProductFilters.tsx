import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  onSearch?: (value: string) => void;
  onTypeFilter?: (value: string) => void;
  onStockFilter?: (value: string) => void;
  onSort?: (value: string) => void;
}

const ProductFilters = ({
  onSearch = () => {},
  onTypeFilter = () => {},
  onStockFilter = () => {},
  onSort = () => {},
}: ProductFiltersProps) => {
  return (
    <div className="w-full bg-white p-4 border-b flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Select onValueChange={onTypeFilter} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Product Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Whiskey">Whiskey</SelectItem>
            <SelectItem value="Vodka">Vodka</SelectItem>
            <SelectItem value="Gin">Gin</SelectItem>
            <SelectItem value="Rum">Rum</SelectItem>
            <SelectItem value="Tequila">Tequila</SelectItem>
            <SelectItem value="Beer">Beer</SelectItem>
            <SelectItem value="Wine">Wine</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onStockFilter} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Select onValueChange={onSort} defaultValue="name-asc">
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          <SelectItem value="bottle_price-asc">Price (Low to High)</SelectItem>
          <SelectItem value="bottle_price-desc">Price (High to Low)</SelectItem>
          <SelectItem value="created_at-desc">Newest First</SelectItem>
          <SelectItem value="created_at-asc">Oldest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductFilters;

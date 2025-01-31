import React from "react";
import { Search, Filter, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BarFiltersProps {
  onSearch?: (value: string) => void;
  onTypeFilter?: (value: string) => void;
  onLocalityFilter?: (value: string) => void;
  onSort?: (value: string) => void;
}

const BarFilters = ({
  onSearch = () => {},
  onTypeFilter = () => {},
  onLocalityFilter = () => {},
  onSort = () => {},
}: BarFiltersProps) => {
  return (
    <div className="w-full bg-white p-4 border-b flex items-center gap-4 justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search bars..."
            className="pl-9"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Select onValueChange={onTypeFilter} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Bar Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pub">Pub</SelectItem>
            <SelectItem value="lounge">Lounge</SelectItem>
            <SelectItem value="nightclub">Nightclub</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={onLocalityFilter} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Locality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="downtown">Downtown</SelectItem>
            <SelectItem value="uptown">Uptown</SelectItem>
            <SelectItem value="suburbs">Suburbs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px]">
            <div className="space-y-2">
              <div className="font-medium">Advanced Filters</div>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  Active Only
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Has Promotions
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Low Inventory
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Select onValueChange={onSort} defaultValue="name-asc">
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
            <SelectItem value="rating-desc">Highest Rated</SelectItem>
            <SelectItem value="sales-desc">Highest Sales</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BarFilters;

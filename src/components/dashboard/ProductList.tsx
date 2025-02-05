import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  type: string;
  bottle_price: number;
  bottle_size: number;
  age?: number;
  in_stock: boolean;
}

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products = [] }: ProductListProps) => {
  return (
    <div className="w-full bg-background rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>${product.bottle_price}</TableCell>
              <TableCell>{product.bottle_size}ml</TableCell>
              <TableCell>{product.age || "-"}</TableCell>
              <TableCell>
                <Badge variant={product.in_stock ? "default" : "secondary"}>
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;

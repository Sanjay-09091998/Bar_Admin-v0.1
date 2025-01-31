export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          type: string;
          description: string | null;
          bottle_price: number;
          bottle_size: number;
          age: number | null;
          in_stock: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          type: string;
          description?: string | null;
          bottle_price: number;
          bottle_size: number;
          age?: number | null;
          in_stock?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string;
          description?: string | null;
          bottle_price?: number;
          bottle_size?: number;
          age?: number | null;
          in_stock?: boolean;
          created_at?: string;
        };
      };
      product_serving_sizes: {
        Row: {
          id: string;
          product_id: string;
          size: number;
          price: number;
          size_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          size: number;
          price: number;
          size_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          size?: number;
          price?: number;
          size_type?: string;
          created_at?: string;
        };
      };
    };
    Enums: {
      product_type:
        | "Whiskey"
        | "Vodka"
        | "Gin"
        | "Rum"
        | "Tequila"
        | "Beer"
        | "Wine";
    };
  };
}

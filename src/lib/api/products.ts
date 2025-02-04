import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Product = Database["public"]["Tables"]["products"]["Row"];

export interface ProductFilters {
  search?: string;
  type?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export const productsApi = {
  async getAll({
    page = 1,
    perPage = 10,
    filters,
    sortBy = "name",
    sortOrder = "asc",
  }: {
    page?: number;
    perPage?: number;
    filters?: ProductFilters;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  } = {}): Promise<PaginatedResponse<Product>> {
    let query = supabase.from("products").select("*", { count: "exact" });

    // Apply filters
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }
    if (filters?.type) {
      query = query.eq("type", filters.type);
    }
    if (filters?.inStock !== undefined) {
      query = query.eq("in_stock", filters.inStock);
    }
    if (filters?.minPrice !== undefined) {
      query = query.gte("bottle_price", filters.minPrice);
    }
    if (filters?.maxPrice !== undefined) {
      query = query.lte("bottle_price", filters.maxPrice);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Apply pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;
    return { data: data || [], total: count || 0 };
  },

  async create(product: {
    name: string;
    type: string;
    description?: string;
    bottle_price: number;
    bottle_size: number;
    age?: number;
    in_stock?: boolean;
  }) {
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Failed to create product");
    return data;
  },

  async update(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error("Product not found");
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};

import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Bar = Database["public"]["Tables"]["bars"]["Row"];
export type BarWithProducts = Bar & {
  products: Database["public"]["Tables"]["products"]["Row"][];
};

export interface BarFilters {
  search?: string;
  type?: Database["public"]["Enums"]["bar_type"];
  locality?: string;
  status?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

export const barsApi = {
  async getAll({
    page = 1,
    perPage = 10,
    filters,
    sortBy = "name",
    sortOrder = "asc",
  }: {
    page?: number;
    perPage?: number;
    filters?: BarFilters;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  } = {}): Promise<PaginatedResponse<BarWithProducts>> {
    // First, get the count with a separate query
    let countQuery = supabase
      .from("bars")
      .select("*", { count: "exact", head: true });

    // Apply filters to count query
    if (filters?.search) {
      countQuery = countQuery.ilike("name", `%${filters.search}%`);
    }
    if (filters?.type) {
      countQuery = countQuery.eq("type", filters.type);
    }
    if (filters?.locality) {
      countQuery = countQuery.eq("locality", filters.locality);
    }
    if (filters?.status) {
      countQuery = countQuery.eq("status", filters.status);
    }

    const { count } = await countQuery;

    // Then get the actual data
    let query = supabase.from("bars").select(
      `
      *,
      bar_products (product:products(*))
      `,
    );

    // Apply filters
    if (filters?.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }
    if (filters?.type) {
      query = query.eq("type", filters.type);
    }
    if (filters?.locality) {
      query = query.eq("locality", filters.locality);
    }
    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Apply pagination
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;
    query = query.range(from, to);

    const { data: bars, error } = await query;

    if (error) throw error;

    // Transform the nested products data structure
    const transformedBars = (bars || []).map((bar) => ({
      ...bar,
      products:
        bar.bar_products?.map((p: any) => p.product).filter(Boolean) || [],
    }));

    return { data: transformedBars, total: count || 0 };
  },

  async create(bar: {
    name: string;
    type: Database["public"]["Enums"]["bar_type"];
    description?: string;
    address?: string;
    map_link?: string;
    phone?: string;
    email?: string;
    opening_hours?: string;
    image_url?: string;
    locality?: string;
    status?: string;
  }) {
    // Insert bar with default values
    const { data: newBar, error: barError } = await supabase
      .from("bars")
      .insert([
        {
          ...bar,
          rating: 0,
          status: bar.status || "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (barError) throw barError;
    if (!newBar) throw new Error("Failed to create bar");

    return {
      ...newBar,
      products: [],
    };
  },

  async getById(id: string): Promise<BarWithProducts | null> {
    const { data: bar, error } = await supabase
      .from("bars")
      .select(
        `
        *,
        bar_products (product:products(*))
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    if (!bar) return null;

    // Transform the nested products data structure
    return {
      ...bar,
      products:
        bar.bar_products?.map((p: any) => p.product).filter(Boolean) || [],
    };
  },

  async update(id: string, updates: Partial<Bar>) {
    const { data: bar, error } = await supabase
      .from("bars")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return bar;
  },

  async updateProducts(barId: string, productIds: string[]) {
    // Delete existing mappings
    const { error: deleteError } = await supabase
      .from("bar_products")
      .delete()
      .eq("bar_id", barId);

    if (deleteError) throw deleteError;

    // Insert new mappings
    if (productIds.length) {
      const { error: insertError } = await supabase.from("bar_products").insert(
        productIds.map((productId) => ({
          bar_id: barId,
          product_id: productId,
        })),
      );

      if (insertError) throw insertError;
    }

    return this.getById(barId);
  },

  async delete(id: string) {
    const { error } = await supabase.from("bars").delete().eq("id", id);
    if (error) throw error;
  },
};

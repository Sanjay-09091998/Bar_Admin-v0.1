import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Bar = Database["public"]["Tables"]["bars"]["Row"];
export type BarWithProducts = Bar & {
  products: Database["public"]["Tables"]["products"]["Row"][];
};

export const barsApi = {
  async getAll(): Promise<BarWithProducts[]> {
    const { data: bars, error } = await supabase.from("bars").select(`
      *,
      products:bar_products(product:products(*))
    `);

    if (error) throw error;
    return bars || [];
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
    products?: string[];
  }) {
    const { products, ...barData } = bar;

    // Insert bar
    const { data: newBar, error: barError } = await supabase
      .from("bars")
      .insert([barData])
      .select()
      .single();

    if (barError) throw barError;
    if (!newBar) throw new Error("Failed to create bar");

    // Insert product mappings if any
    if (products?.length) {
      const { error: productsError } = await supabase
        .from("bar_products")
        .insert(
          products.map((productId) => ({
            bar_id: newBar.id,
            product_id: productId,
          })),
        );

      if (productsError) throw productsError;
    }

    return this.getById(newBar.id);
  },

  async getById(id: string): Promise<BarWithProducts | null> {
    const { data: bar, error } = await supabase
      .from("bars")
      .select(
        `
        *,
        products:bar_products(product:products(*))
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return bar;
  },

  async update(id: string, updates: Partial<Bar>) {
    const { data: bar, error } = await supabase
      .from("bars")
      .update(updates)
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

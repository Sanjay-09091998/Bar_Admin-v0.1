import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductWithServingSizes = Product & {
  serving_sizes: Database["public"]["Tables"]["product_serving_sizes"]["Row"][];
};

export const productsApi = {
  async getAll(): Promise<ProductWithServingSizes[]> {
    const { data: products, error } = await supabase.from("products").select(`
        *,
        serving_sizes:product_serving_sizes(*)
      `);

    if (error) throw error;
    return products || [];
  },

  async getById(id: string): Promise<ProductWithServingSizes | null> {
    const { data: product, error } = await supabase
      .from("products")
      .select(
        `
        *,
        serving_sizes:product_serving_sizes(*)
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return product;
  },

  async create(product: {
    name: string;
    type: Database["public"]["Enums"]["product_type"];
    description?: string;
    bottle_price: number;
    bottle_size: number;
    age?: number;
    serving_sizes: {
      size: number;
      price: number;
      size_type: string;
    }[];
  }) {
    const { serving_sizes, ...productData } = product;

    // Insert product
    const { data: newProduct, error: productError } = await supabase
      .from("products")
      .insert([productData])
      .select()
      .single();

    if (productError) throw productError;
    if (!newProduct) throw new Error("Failed to create product");

    // Insert serving sizes
    const { error: sizesError } = await supabase
      .from("product_serving_sizes")
      .insert(
        serving_sizes.map((size) => ({
          product_id: newProduct.id,
          ...size,
        })),
      );

    if (sizesError) throw sizesError;

    return this.getById(newProduct.id);
  },

  async update(id: string, updates: Partial<Product>) {
    const { data: product, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return product;
  },

  async updateServingSizes(
    productId: string,
    sizes: {
      size: number;
      price: number;
      size_type: string;
    }[],
  ) {
    // Delete existing sizes
    const { error: deleteError } = await supabase
      .from("product_serving_sizes")
      .delete()
      .eq("product_id", productId);

    if (deleteError) throw deleteError;

    // Insert new sizes
    const { error: insertError } = await supabase
      .from("product_serving_sizes")
      .insert(
        sizes.map((size) => ({
          product_id: productId,
          ...size,
        })),
      );

    if (insertError) throw insertError;

    return this.getById(productId);
  },

  async delete(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },

  async toggleStock(id: string, inStock: boolean) {
    const { data: product, error } = await supabase
      .from("products")
      .update({ in_stock: inStock })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return product;
  },
};

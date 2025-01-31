-- Enable RLS
alter table if exists public.products enable row level security;
alter table if exists public.product_serving_sizes enable row level security;

-- Create products table if it doesn't exist
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type product_type not null,
  description text,
  bottle_price decimal(10,2) not null,
  bottle_size integer not null,
  age integer,
  in_stock boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create product_serving_sizes table if it doesn't exist
create table if not exists public.product_serving_sizes (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade,
  size integer not null,
  price decimal(10,2) not null,
  size_type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index if not exists products_type_idx on public.products(type);
create index if not exists products_in_stock_idx on public.products(in_stock);
create index if not exists product_serving_sizes_product_id_idx on public.product_serving_sizes(product_id);

-- Enable realtime
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table product_serving_sizes;

-- Set up RLS policies (allow all for development)
create policy "Allow all" on public.products for all using (true);
create policy "Allow all" on public.product_serving_sizes for all using (true);
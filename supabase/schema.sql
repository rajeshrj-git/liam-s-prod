create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  category text check (category in ('laptop','desktop','accessory')),
  is_sold BOOLEAN DEFAULT false,
  price numeric not null,
  original_price numeric,
  condition text check (condition in ('good','fair','normal')),
  color text,
  processor text,
  ram text,
  storage text,
  display text,
  graphics text,
  battery text,
  os text,
  description text,
  images text[] default '{}',
  is_featured boolean default false,
  is_available boolean default true,
  stock_count integer default 1,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- RLS
alter table products enable row level security;
create policy "Public read" on products for select using (true);
create policy "Admin write" on products for all using (auth.role() = 'authenticated');

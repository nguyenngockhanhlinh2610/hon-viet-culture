-- Chạy toàn bộ file này trong Supabase Dashboard -> SQL Editor -> New query -> Run

-- 1. Bảng hồ sơ người dùng (liên kết Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email_or_phone text,
  created_at timestamptz default now()
);

-- 2. Bảng danh sách yêu thích
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  category text not null check (category in ('heritage', 'festival', 'specialty', 'workshop')),
  added_at timestamptz default now(),
  unique (user_id, item_id, category)
);

-- 3. Bảng lịch đặt trải nghiệm workshop
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  workshop_id text not null,
  workshop_name text not null,
  province_id text not null,
  booking_date date not null,
  time_slot text not null,
  guests integer not null check (guests >= 1),
  customer_name text not null,
  customer_phone text not null,
  approval_token text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'rejected', 'cancelled')),
  created_at timestamptz default now()
);

-- 4. Bảng Hộ chiếu Săn Dấu Hồn Việt (10 dấu ấn)
create table if not exists public.passport_stamps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stamp_id text not null,
  verification_method text not null default 'quiz' check (verification_method in ('quiz', 'qr')),
  unlocked_at timestamptz default now(),
  unique (user_id, stamp_id)
);

-- Bật Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.bookings enable row level security;
alter table public.passport_stamps enable row level security;

-- Policies: mỗi người dùng chỉ xem và sửa dữ liệu của chính mình
create policy "Users manage own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage own favorites" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own bookings" on public.bookings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own passport stamps" on public.passport_stamps
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

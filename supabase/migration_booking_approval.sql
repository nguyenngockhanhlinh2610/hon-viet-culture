-- Chạy file này trong Supabase SQL Editor để nâng cấp bảng bookings hỗ trợ duyệt qua email

alter table public.bookings
  alter column user_id drop not null;

alter table public.bookings
  add column if not exists approval_token text;

alter table public.bookings
  drop constraint if exists bookings_status_check;

alter table public.bookings
  add constraint bookings_status_check
  check (status in ('pending', 'confirmed', 'rejected', 'cancelled'));

alter table public.bookings
  alter column status set default 'pending';

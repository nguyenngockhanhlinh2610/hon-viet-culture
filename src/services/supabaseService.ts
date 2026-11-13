import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Booking, FavoriteCategory, FavoriteItem, UserProfile } from '../types';

export const supabaseService = {
  isEnabled(): boolean {
    return isSupabaseConfigured && supabase !== null;
  },

  async getSessionUser(): Promise<UserProfile | null> {
    if (!supabase) return null;
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;
    const fullName =
      (data.user.user_metadata?.full_name as string | undefined) ||
      data.user.email?.split('@')[0] ||
      'Du khách Hồn Việt';
    return {
      id: data.user.id,
      fullName,
      emailOrPhone: data.user.email || '',
    };
  },

  async signUp(
    fullName: string,
    email: string,
    password: string
  ): Promise<{ user: UserProfile | null; error?: string; needsEmailConfirm?: boolean }> {
    if (!supabase) return { user: null, error: 'Supabase chưa được cấu hình.' };
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: fullName.trim() } },
    });
    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: 'Không thể tạo tài khoản.' };

    if (data.session) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName.trim(),
        email_or_phone: email.trim(),
      });
      return {
        user: {
          id: data.user.id,
          fullName: fullName.trim(),
          emailOrPhone: email.trim(),
        },
      };
    }

    return { user: null, needsEmailConfirm: true };
  },

  async signIn(
    email: string,
    password: string
  ): Promise<{ user: UserProfile | null; error?: string }> {
    if (!supabase) return { user: null, error: 'Supabase chưa được cấu hình.' };
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: 'Đăng nhập thất bại.' };

    const fullName =
      (data.user.user_metadata?.full_name as string | undefined) ||
      data.user.email?.split('@')[0] ||
      'Du khách Hồn Việt';

    return {
      user: {
        id: data.user.id,
        fullName,
        emailOrPhone: data.user.email || '',
      },
    };
  },

  async signOut(): Promise<void> {
    if (!supabase) return;
    await supabase.auth.signOut();
  },

  // Favorites
  async fetchFavorites(userId: string): Promise<FavoriteItem[]> {
    if (!supabase) return [];
    const { data } = await supabase
      .from('favorites')
      .select('item_id, category, added_at')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    return (data || []).map((row) => ({
      id: row.item_id as string,
      category: row.category as FavoriteCategory,
      addedAt: row.added_at as string,
    }));
  },

  async toggleFavorite(
    userId: string,
    itemId: string,
    category: FavoriteCategory,
    currentlyFavorite: boolean
  ): Promise<void> {
    if (!supabase) return;
    if (currentlyFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('item_id', itemId)
        .eq('category', category);
    } else {
      await supabase.from('favorites').insert({
        user_id: userId,
        item_id: itemId,
        category,
      });
    }
  },

  // Passport Stamps
  async fetchUnlockedStamps(userId: string): Promise<string[]> {
    if (!supabase) return [];
    const { data } = await supabase
      .from('passport_stamps')
      .select('stamp_id')
      .eq('user_id', userId);
    return (data || []).map((r) => r.stamp_id as string);
  },

  async unlockStamp(userId: string, stampId: string): Promise<void> {
    if (!supabase) return;
    await supabase.from('passport_stamps').upsert(
      {
        user_id: userId,
        stamp_id: stampId,
        verification_method: 'quiz',
      },
      { onConflict: 'user_id,stamp_id' }
    );
  },

  // Bookings
  async fetchBookings(userId: string): Promise<Booking[]> {
    if (!supabase) return [];
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return (data || []).map((row) => ({
      id: row.id as string,
      workshopId: row.workshop_id as string,
      workshopName: row.workshop_name as string,
      provinceId: row.province_id,
      date: row.booking_date as string,
      timeSlot: row.time_slot as string,
      guests: row.guests as number,
      customerName: row.customer_name as string,
      customerPhone: row.customer_phone as string,
      status: row.status as 'confirmed' | 'cancelled',
      createdAt: row.created_at as string,
    }));
  },

  async createBooking(
    userId: string,
    input: Omit<Booking, 'id' | 'status' | 'createdAt'>
  ): Promise<void> {
    if (!supabase) return;
    await supabase.from('bookings').insert({
      user_id: userId,
      workshop_id: input.workshopId,
      workshop_name: input.workshopName,
      province_id: input.provinceId,
      booking_date: input.date,
      time_slot: input.timeSlot,
      guests: input.guests,
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      status: 'confirmed',
    });
  },

  async cancelBooking(userId: string, bookingId: string): Promise<void> {
    if (!supabase) return;
    await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .eq('user_id', userId);
  },
};

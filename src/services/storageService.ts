import { Booking, FavoriteCategory, FavoriteItem, UserProfile } from '../types';

const KEYS = {
  FAVORITES: 'honviet_favorites_v1',
  STAMPS: 'honviet_stamps_v1',
  BOOKINGS: 'honviet_bookings_v1',
  USER: 'honviet_user_v1',
};

const MIN_CANCEL_HOURS = 120; // Cố định 5 ngày (120 giờ) theo khuyến nghị kế hoạch

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storageService = {
  // Favorites
  getFavorites(): FavoriteItem[] {
    return readJson<FavoriteItem[]>(KEYS.FAVORITES, []);
  },

  toggleFavorite(id: string, category: FavoriteCategory): FavoriteItem[] {
    const current = this.getFavorites();
    const exists = current.some((item) => item.id === id && item.category === category);
    const updated = exists
      ? current.filter((item) => !(item.id === id && item.category === category))
      : [{ id, category, addedAt: new Date().toISOString() }, ...current];
    writeJson(KEYS.FAVORITES, updated);
    return updated;
  },

  // Passport Stamps
  getUnlockedStampIds(): string[] {
    return readJson<string[]>(KEYS.STAMPS, []);
  },

  unlockStamp(stampId: string): string[] {
    const current = this.getUnlockedStampIds();
    if (current.includes(stampId)) return current;
    const updated = [...current, stampId];
    writeJson(KEYS.STAMPS, updated);
    return updated;
  },

  // Bookings
  getBookings(): Booking[] {
    return readJson<Booking[]>(KEYS.BOOKINGS, []);
  },

  createBooking(input: Omit<Booking, 'id' | 'status' | 'createdAt'>): Booking[] {
    const current = this.getBookings();
    const next: Booking = {
      ...input,
      id: `bk-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [next, ...current];
    writeJson(KEYS.BOOKINGS, updated);
    return updated;
  },

  canCancelBooking(bookingDate: string): { allowed: boolean; hoursRemaining: number } {
    const target = new Date(`${bookingDate}T08:00:00`).getTime();
    const now = Date.now();
    const hoursRemaining = Math.floor((target - now) / (1000 * 60 * 60));
    return {
      allowed: hoursRemaining >= MIN_CANCEL_HOURS,
      hoursRemaining,
    };
  },

  cancelBooking(bookingId: string): { bookings: Booking[]; error?: string } {
    const current = this.getBookings();
    const target = current.find((b) => b.id === bookingId);
    if (!target) return { bookings: current, error: 'Không tìm thấy lịch hẹn.' };

    const check = this.canCancelBooking(target.date);
    if (!check.allowed) {
      return {
        bookings: current,
        error: 'Lịch hẹn cận ngày (dưới 5 ngày / 120 giờ) không thể hủy trực tuyến.',
      };
    }

    const updated = current.map((b) =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    writeJson(KEYS.BOOKINGS, updated);
    return { bookings: updated };
  },

  // User Profile (Demo local auth, ready to swap with Supabase Auth)
  getUser(): UserProfile | null {
    return readJson<UserProfile | null>(KEYS.USER, null);
  },

  loginUser(fullName: string, emailOrPhone: string): UserProfile {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim() || 'Du khách Hồn Việt',
      emailOrPhone: emailOrPhone.trim(),
    };
    writeJson(KEYS.USER, user);
    return user;
  },

  logoutUser(): void {
    localStorage.removeItem(KEYS.USER);
  },
};

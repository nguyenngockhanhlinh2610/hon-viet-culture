export type ProvinceId =
  | 'can-tho'
  | 'vinh-long'
  | 'dong-thap'
  | 'an-giang'
  | 'ca-mau';

export type NavSection =
  | 'home'
  | 'explore'
  | 'festivals'
  | 'specialties'
  | 'workshops'
  | 'blog'
  | 'passport'
  | 'favorites'
  | 'account';

export type FavoriteCategory =
  | 'heritage'
  | 'festival'
  | 'specialty'
  | 'workshop';

export type SeasonTag =
  | 'Quanh năm'
  | 'Mùa nước nổi (T9-T11)'
  | 'Mùa khô (T12-T4)'
  | 'Mùa trái cây (T5-T8)'
  | 'Theo lịch Âm';

export interface Province {
  id: ProvinceId;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestSeason: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

export interface HeritageSite {
  id: string;
  slug: string;
  provinceId: ProvinceId;
  name: string;
  category: string;
  summary: string;
  description: string;
  bestSeason: SeasonTag;
  address: string;
  image: string;
  tags: string[];
  relatedWorkshopIds?: string[];
}

export interface Festival {
  id: string;
  slug: string;
  provinceId: ProvinceId;
  name: string;
  timeLabel: string;
  lunarMonth?: number;
  recognition?: string;
  summary: string;
  rituals: string[];
  image: string;
  tags: string[];
}

export interface Specialty {
  id: string;
  slug: string;
  provinceId: ProvinceId;
  name: string;
  type: 'Món ăn' | 'Đặc sản làm quà' | 'Trái cây';
  summary: string;
  flavorNotes: string;
  bestSeason: SeasonTag;
  image: string;
  tags: string[];
}

export interface Workshop {
  id: string;
  slug: string;
  provinceId: ProvinceId;
  name: string;
  craftVillage: string;
  durationMinutes: number;
  maxGuests: number;
  priceVnd: number;
  summary: string;
  activities: string[];
  image: string;
  tags: string[];
}

export interface PassportStamp {
  id: string;
  provinceId: ProvinceId;
  title: string;
  heritageName: string;
  hint: string;
  quizQuestion: string;
  quizOptions: string[];
  correctOptionIndex: number;
  qrCodeHint: string;
}

export interface Booking {
  id: string;
  workshopId: string;
  workshopName: string;
  provinceId: ProvinceId;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  guests: number;
  customerName: string;
  customerPhone: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface FavoriteItem {
  id: string;
  category: FavoriteCategory;
  addedAt: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  emailOrPhone: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  provinceId: ProvinceId;
  title: string;
  category: 'Câu chuyện Di sản' | 'Cẩm nang Du lịch' | 'Chân dung Nghệ nhân';
  author: string;
  publishedAt: string;
  readMinutes: number;
  summary: string;
  content: string[];
  image: string;
  tags: string[];
}

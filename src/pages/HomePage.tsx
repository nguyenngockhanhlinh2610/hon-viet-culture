import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  MapPin,
  Palette,
  Sparkles,
  Stamp,
  Star,
  Users,
} from 'lucide-react';
import { PROVINCES } from '../data/provinces';
import { HERITAGE_SITES } from '../data/heritageSites';
import { WORKSHOPS } from '../data/workshops';
import { FESTIVALS } from '../data/festivals';
import { NavSection, Province } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ProvinceModal } from '../components/modals/ProvinceModal';

interface HomePageProps {
  onNavigate: (section: NavSection) => void;
  unlockedCount: number;
}

const COMMUNITY_REVIEWS = [
  {
    name: 'Minh Anh',
    origin: 'TP. Hồ Chí Minh',
    quote:
      'Lần đầu tự tay chuốt bình gốm đỏ ở Mang Thít và quét dấu ấn Hộ Chiếu Hồn Việt, trải nghiệm cực kỳ đáng nhớ!',
  },
  {
    name: 'Quốc Bảo',
    origin: 'Cần Thơ',
    quote:
      'Thông tin 5 tỉnh miền Tây rất chi tiết, có cả lịch lễ hội Âm lịch nên gia đình mình canh đúng dịp Vía Bà Núi Sam.',
  },
  {
    name: 'Thảo Vy',
    origin: 'Hà Nội',
    quote:
      'Trợ lý AI gợi ý đúng món bánh xèo củ hủ dừa và cách đặt lịch làng bánh tráng Thuận Hưng rất nhanh.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  unlockedCount,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);

  const featuredSites = HERITAGE_SITES.slice(0, 3);
  const featuredWorkshops = WORKSHOPS.slice(0, 3);
  const featuredFestivals = FESTIVALS.slice(0, 3);

  return (
    <div className="space-y-14">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9E1116] via-[#83231D] to-[#3B5B4A] text-heritage-cream p-7 sm:p-12 shadow-xl border border-heritage-gold/45">
        {/* Dong Son Drum & Lac Bird Artistic Motif */}
        <svg
          aria-hidden="true"
          viewBox="0 0 500 360"
          className="pointer-events-none absolute right-0 top-0 h-full w-auto text-heritage-amber/20"
        >
          <circle cx="360" cy="180" r="150" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="360" cy="180" r="115" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="360" cy="180" r="78" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path
            d="M170 280 Q240 200 320 230 T480 210 L480 360 L170 360 Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M235 135 L295 155 L265 170 L325 185 L250 190 L215 215 L235 172 L190 165 Z"
            fill="currentColor"
            opacity="0.35"
          />
        </svg>

        <div className="max-w-3xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 border border-heritage-gold/60 text-[#FDE68A] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Di sản Vùng Đất Phù Sa 5 Tỉnh ĐBSCL
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white mb-2">
            Hồn Việt Culture
          </h1>
          <p className="font-serif text-lg sm:text-2xl font-semibold text-[#FDE68A] leading-snug mb-4">
            Số hóa di sản, kết nối cộng đồng - Nâng tầm văn hóa Việt
          </p>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-7 max-w-2xl">
            Nền tảng số hóa di sản bảo tồn và phát huy giá trị văn hóa 5 tỉnh
            thành trọng điểm Đồng bằng sông Cửu Long (Cần Thơ, Vĩnh Long, Đồng
            Tháp, An Giang, Cà Mau).
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-heritage-gold to-heritage-amber text-heritage-burgundyDark font-bold text-sm hover:brightness-105 transition-all inline-flex items-center gap-2 shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Khám phá Di sản ngay</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('passport')}
              className="px-5 py-3 rounded-xl bg-black/20 border border-heritage-gold/60 text-white font-semibold text-sm hover:bg-black/30 transition-colors inline-flex items-center gap-2"
            >
              <Stamp className="w-4 h-4 text-[#FDE68A]" />
              <span>Hộ Chiếu Săn Dấu ({unlockedCount}/10)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cultural Stats Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { num: '05', label: 'Tỉnh / Thành ĐBSCL', section: 'home' as NavSection },
          { num: '20', label: 'Di tích & Danh thắng', section: 'explore' as NavSection },
          { num: '11', label: 'Lễ hội Truyền thống', section: 'festivals' as NavSection },
          { num: '26', label: 'Đặc sản Vùng miền', section: 'specialties' as NavSection },
          { num: '10', label: 'Workshop Làng nghề', section: 'workshops' as NavSection },
        ].map((stat) => (
          <button
            key={stat.label}
            type="button"
            onClick={() => onNavigate(stat.section)}
            className="p-4 rounded-2xl bg-heritage-paper border-2 border-heritage-gold/60 text-left hover:border-heritage-burgundy hover:shadow-md transition-all"
          >
            <div className="font-serif text-2xl sm:text-3xl font-bold text-heritage-burgundy">
              {stat.num}
            </div>
            <div className="text-xs text-heritage-muted font-medium mt-0.5">
              {stat.label}
            </div>
          </button>
        ))}
      </section>

      {/* Sứ mệnh */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-heritage-paper border border-heritage-gold/35 flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-heritage-burgundy text-heritage-gold flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-heritage-burgundy mb-1.5">
              Kết nối thế hệ trẻ với Di sản
            </h2>
            <p className="text-sm text-heritage-muted leading-relaxed">
              Số hóa di sản vật thể và phi vật thể qua trải nghiệm tương tác,
              gamification Hộ Chiếu Săn Dấu và Trợ lý AI văn hóa.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-heritage-paper border border-heritage-gold/35 flex gap-4">
          <div className="w-12 h-12 rounded-xl bg-heritage-burgundy text-heritage-gold flex items-center justify-center shrink-0">
            <Palette className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-heritage-burgundy mb-1.5">
              Đồng hành cùng Nghệ nhân Làng nghề
            </h2>
            <p className="text-sm text-heritage-muted leading-relaxed">
              Mở kênh đặt lịch trải nghiệm trực tiếp cho 10 làng nghề thủ công
              mỹ nghệ truyền thống, góp phần giữ lửa nghề trăm năm.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Tỉnh trọng điểm tương tác */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-heritage-burgundy">
              Bản đồ Văn hóa Tây Nam Bộ
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-heritage-ink mt-1">
              5 Tỉnh / Thành phố Trọng điểm
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-heritage-muted">
            Chọn “Khám phá tỉnh” để mở hồ sơ toàn cảnh 4 mảng văn hóa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROVINCES.map((prov) => (
            <div
              key={prov.id}
              className="group rounded-2xl bg-white border border-heritage-gold/35 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <ImageWithFallback
                  src={prov.image}
                  alt={prov.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 right-3 text-white font-serif font-bold text-base">
                  {prov.name.replace('Thành phố ', 'TP. ').replace('Tỉnh ', '')}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-heritage-burgundy mb-1">
                    {prov.shortTitle}
                  </div>
                  <p className="text-xs text-heritage-muted line-clamp-3 leading-relaxed">
                    {prov.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProvince(prov)}
                  className="w-full py-2 px-3 rounded-lg bg-heritage-burgundy text-white text-xs font-semibold hover:bg-heritage-burgundyDark transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-heritage-gold" />
                  <span>Khám phá tỉnh</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="heritage-divider" />

      {/* Featured Highlights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Di tích tiêu biểu */}
        <div className="rounded-2xl bg-white border border-heritage-gold/30 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-heritage-burgundy">
              Di tích tiêu biểu
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="text-xs font-semibold text-heritage-burgundy hover:underline inline-flex items-center gap-1"
            >
              Xem 20 điểm <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {featuredSites.map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-xl bg-heritage-cream border border-heritage-gold/25"
              >
                <div className="font-semibold text-sm text-heritage-ink">
                  {s.name}
                </div>
                <div className="text-xs text-heritage-muted mt-0.5 line-clamp-2">
                  {s.summary}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trải nghiệm làng nghề */}
        <div className="rounded-2xl bg-white border border-heritage-gold/30 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-heritage-burgundy">
              Workshop Làng nghề
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('workshops')}
              className="text-xs font-semibold text-heritage-burgundy hover:underline inline-flex items-center gap-1"
            >
              Xem 10 lớp <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {featuredWorkshops.map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-xl bg-heritage-cream border border-heritage-gold/25"
              >
                <div className="font-semibold text-sm text-heritage-ink">
                  {w.name}
                </div>
                <div className="text-xs text-heritage-muted mt-0.5">
                  {w.craftVillage} · {w.priceVnd.toLocaleString('vi-VN')}đ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lễ hội mùa này */}
        <div className="rounded-2xl bg-white border border-heritage-gold/30 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-bold text-heritage-burgundy">
              Lễ hội Truyền thống
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('festivals')}
              className="text-xs font-semibold text-heritage-burgundy hover:underline inline-flex items-center gap-1"
            >
              Xem 11 lễ hội <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {featuredFestivals.map((f) => (
              <div
                key={f.id}
                className="p-3 rounded-xl bg-heritage-cream border border-heritage-gold/25"
              >
                <div className="font-semibold text-sm text-heritage-ink">
                  {f.name}
                </div>
                <div className="text-xs text-heritage-burgundy font-medium mt-0.5">
                  {f.timeLabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Đánh giá cộng đồng */}
      <section>
        <h2 className="font-serif text-2xl font-bold text-heritage-ink mb-5">
          Góc chia sẻ Cộng đồng Du khách
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COMMUNITY_REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="p-5 rounded-2xl bg-heritage-paper border border-heritage-gold/35"
            >
              <div className="flex items-center gap-1 text-heritage-amber mb-2.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-heritage-ink italic leading-relaxed mb-3">
                “{rev.quote}”
              </p>
              <div className="text-xs font-semibold text-heritage-burgundy">
                {rev.name} · <span className="text-heritage-muted font-normal">{rev.origin}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pop-up 5 Tỉnh 4 Tab */}
      <ProvinceModal
        province={selectedProvince}
        onClose={() => setSelectedProvince(null)}
        onNavigateSection={onNavigate}
      />
    </div>
  );
};

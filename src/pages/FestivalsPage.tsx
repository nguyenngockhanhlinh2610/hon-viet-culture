import React, { useMemo, useState } from 'react';
import { Award, CalendarDays, Heart } from 'lucide-react';
import { FESTIVALS } from '../data/festivals';
import { PROVINCES } from '../data/provinces';
import { FavoriteCategory, ProvinceId } from '../types';
import { ProvinceFilterBar } from '../components/common/ProvinceFilterBar';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface FestivalsPageProps {
  isFavorite: (id: string, category: FavoriteCategory) => boolean;
  onToggleFavorite: (id: string, category: FavoriteCategory) => void;
}

export const FestivalsPage: React.FC<FestivalsPageProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | 'all'>('all');

  const filtered = useMemo(
    () =>
      FESTIVALS.filter(
        (f) => selectedProvince === 'all' || f.provinceId === selectedProvince
      ),
    [selectedProvince]
  );

  const getProvinceName = (id: ProvinceId) =>
    PROVINCES.find((p) => p.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-burgundy">
          Lễ hội Truyền thống
        </h1>
        <p className="text-sm text-heritage-muted mt-1">
          11 đại lễ văn hóa – tín ngưỡng đặc sắc vùng Đồng bằng sông Cửu Long.
        </p>
      </div>

      <ProvinceFilterBar
        selected={selectedProvince}
        onSelect={setSelectedProvince}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((fest) => {
          const fav = isFavorite(fest.id, 'festival');
          return (
            <article
              key={fest.id}
              className="rounded-2xl bg-white border border-heritage-gold/35 overflow-hidden shadow-sm flex flex-col sm:flex-row"
            >
              <div className="sm:w-48 aspect-[4/3] sm:aspect-auto relative shrink-0">
                <ImageWithFallback
                  src={fest.image}
                  alt={fest.name}
                  className="w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => onToggleFavorite(fest.id, 'festival')}
                  aria-label="Lưu yêu thích"
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow transition-colors ${
                    fav
                      ? 'bg-heritage-burgundy text-white'
                      : 'bg-white/90 text-heritage-burgundy hover:bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-heritage-burgundy mb-1">
                    <span>{getProvinceName(fest.provinceId)}</span>
                    {fest.recognition && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-heritage-gold/25 text-heritage-ink">
                        <Award className="w-3 h-3" />
                        {fest.recognition}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-lg font-bold text-heritage-ink">
                    {fest.name}
                  </h2>
                  <p className="text-xs font-medium text-heritage-burgundy flex items-center gap-1.5 mt-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {fest.timeLabel}
                  </p>
                  <p className="text-xs text-heritage-muted mt-1.5 leading-relaxed">
                    {fest.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-heritage-gold/20">
                  <div className="text-[11px] font-semibold text-heritage-ink mb-1">
                    Nghi thức chính:
                  </div>
                  <ul className="text-[11px] text-heritage-muted list-disc list-inside space-y-0.5">
                    {fest.rituals.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import { SPECIALTIES } from '../data/specialties';
import { PROVINCES } from '../data/provinces';
import { FavoriteCategory, ProvinceId, Specialty } from '../types';
import { ProvinceFilterBar } from '../components/common/ProvinceFilterBar';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface SpecialtiesPageProps {
  isFavorite: (id: string, category: FavoriteCategory) => boolean;
  onToggleFavorite: (id: string, category: FavoriteCategory) => void;
}

const TYPES: ('all' | Specialty['type'])[] = [
  'all',
  'Món ăn',
  'Đặc sản làm quà',
  'Trái cây',
];

export const SpecialtiesPage: React.FC<SpecialtiesPageProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | 'all'>('all');
  const [selectedType, setSelectedType] = useState<'all' | Specialty['type']>('all');

  const filtered = useMemo(
    () =>
      SPECIALTIES.filter((sp) => {
        const matchProv =
          selectedProvince === 'all' || sp.provinceId === selectedProvince;
        const matchType = selectedType === 'all' || sp.type === selectedType;
        return matchProv && matchType;
      }),
    [selectedProvince, selectedType]
  );

  const getProvinceName = (id: ProvinceId) =>
    PROVINCES.find((p) => p.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-burgundy">
          Đặc sản Vùng miền
        </h1>
        <p className="text-sm text-heritage-muted mt-1">
          26 món ẩm thực và sản vật trứ danh từ 5 tỉnh miền Tây Nam Bộ.
        </p>
      </div>

      <div className="space-y-3">
        <ProvinceFilterBar
          selected={selectedProvince}
          onSelect={setSelectedProvince}
        />
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                selectedType === t
                  ? 'bg-heritage-gold text-heritage-ink border-heritage-gold font-semibold'
                  : 'bg-heritage-paper text-heritage-muted border-heritage-gold/30 hover:text-heritage-ink'
              }`}
            >
              {t === 'all' ? 'Tất cả phân loại' : t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((sp) => {
          const fav = isFavorite(sp.id, 'specialty');
          return (
            <article
              key={sp.id}
              className="rounded-2xl bg-white border border-heritage-gold/35 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="aspect-[4/3] relative">
                <ImageWithFallback
                  src={sp.image}
                  alt={sp.name}
                  className="w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => onToggleFavorite(sp.id, 'specialty')}
                  aria-label="Lưu yêu thích"
                  className={`absolute top-3 right-3 p-2 rounded-full shadow transition-colors ${
                    fav
                      ? 'bg-heritage-burgundy text-white'
                      : 'bg-white/90 text-heritage-burgundy hover:bg-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
                </button>
                <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/65 text-white text-[11px]">
                  {getProvinceName(sp.provinceId)}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold text-heritage-burgundy">
                    {sp.type}
                  </span>
                  <h2 className="font-serif text-lg font-bold text-heritage-ink mt-0.5">
                    {sp.name}
                  </h2>
                  <p className="text-xs text-heritage-muted mt-1 leading-relaxed">
                    {sp.summary}
                  </p>
                </div>
                <div className="pt-2 border-t border-heritage-gold/20 text-[11px] text-heritage-ink">
                  <strong>Hương vị:</strong> {sp.flavorNotes}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

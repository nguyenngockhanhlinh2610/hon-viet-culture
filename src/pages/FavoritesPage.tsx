import React, { useMemo, useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { HERITAGE_SITES } from '../data/heritageSites';
import { FESTIVALS } from '../data/festivals';
import { SPECIALTIES } from '../data/specialties';
import { WORKSHOPS } from '../data/workshops';
import { FavoriteCategory, FavoriteItem, NavSection } from '../types';

interface FavoritesPageProps {
  favorites: FavoriteItem[];
  onToggleFavorite: (id: string, category: FavoriteCategory) => void;
  onNavigate: (section: NavSection) => void;
}

const FILTERS: { id: 'all' | FavoriteCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'heritage', label: '🏛️ Khám phá' },
  { id: 'festival', label: '🏮 Lễ hội' },
  { id: 'specialty', label: '🍲 Đặc sản' },
  { id: 'workshop', label: '🎨 Trải nghiệm' },
];

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  favorites,
  onToggleFavorite,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | FavoriteCategory>('all');

  const resolvedItems = useMemo(() => {
    return favorites
      .filter((f) => filter === 'all' || f.category === filter)
      .map((fav) => {
        if (fav.category === 'heritage') {
          const item = HERITAGE_SITES.find((x) => x.id === fav.id);
          return item ? { ...fav, title: item.name, subtitle: item.summary } : null;
        }
        if (fav.category === 'festival') {
          const item = FESTIVALS.find((x) => x.id === fav.id);
          return item ? { ...fav, title: item.name, subtitle: item.timeLabel } : null;
        }
        if (fav.category === 'specialty') {
          const item = SPECIALTIES.find((x) => x.id === fav.id);
          return item ? { ...fav, title: item.name, subtitle: item.summary } : null;
        }
        const item = WORKSHOPS.find((x) => x.id === fav.id);
        return item ? { ...fav, title: item.name, subtitle: item.craftVillage } : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [favorites, filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-burgundy">
          Danh sách Yêu thích
        </h1>
        <p className="text-sm text-heritage-muted mt-1">
          Bộ sưu tập di sản, lễ hội, đặc sản và workshop bạn đã lưu.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
              filter === f.id
                ? 'bg-heritage-burgundy text-white border-heritage-burgundy'
                : 'bg-white text-heritage-ink border-heritage-gold/40 hover:bg-heritage-paper'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {resolvedItems.length === 0 ? (
        <div className="p-10 rounded-2xl bg-heritage-paper border border-heritage-gold/35 text-center space-y-3">
          <Heart className="w-10 h-10 text-heritage-burgundy/50 mx-auto" />
          <p className="text-sm text-heritage-muted">
            Chưa có mục nào trong danh sách yêu thích theo bộ lọc này.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('explore')}
            className="px-4 py-2 rounded-xl bg-heritage-burgundy text-white text-xs font-semibold"
          >
            Khám phá di sản ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resolvedItems.map((item) => (
            <div
              key={`${item.category}-${item.id}`}
              className="p-4 rounded-2xl bg-white border border-heritage-gold/35 flex items-start justify-between gap-3 shadow-sm"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase text-heritage-burgundy">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-heritage-ink">
                  {item.title}
                </h3>
                <p className="text-xs text-heritage-muted mt-1">{item.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => onToggleFavorite(item.id, item.category)}
                title="Bỏ lưu"
                className="p-2 rounded-lg text-heritage-muted hover:text-heritage-burgundy hover:bg-heritage-paper"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

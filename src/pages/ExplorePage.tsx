import React, { useMemo, useState } from 'react';
import { Calendar, Heart, MapPin, Search, X } from 'lucide-react';
import { HERITAGE_SITES } from '../data/heritageSites';
import { PROVINCES } from '../data/provinces';
import { FavoriteCategory, HeritageSite, ProvinceId } from '../types';
import { ProvinceFilterBar } from '../components/common/ProvinceFilterBar';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface ExplorePageProps {
  isFavorite: (id: string, category: FavoriteCategory) => boolean;
  onToggleFavorite: (id: string, category: FavoriteCategory) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [activeSite, setActiveSite] = useState<HeritageSite | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HERITAGE_SITES.filter((site) => {
      const matchProvince =
        selectedProvince === 'all' || site.provinceId === selectedProvince;
      const matchQuery =
        !q ||
        site.name.toLowerCase().includes(q) ||
        site.summary.toLowerCase().includes(q) ||
        site.tags.some((t) => t.toLowerCase().includes(q));
      return matchProvince && matchQuery;
    });
  }, [selectedProvince, query]);

  const getProvinceName = (id: ProvinceId) =>
    PROVINCES.find((p) => p.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-burgundy">
          Khám phá Di tích &amp; Danh thắng
        </h1>
        <p className="text-sm text-heritage-muted mt-1">
          20 địa danh tiêu biểu của 5 tỉnh Đồng bằng sông Cửu Long.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <ProvinceFilterBar
          selected={selectedProvince}
          onSelect={setSelectedProvince}
        />
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-heritage-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm địa điểm, từ khóa..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-heritage-gold/40 text-sm focus:outline-none focus:border-heritage-burgundy"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-heritage-paper border border-heritage-gold/30 text-sm text-heritage-muted">
          Không tìm thấy di tích phù hợp với bộ lọc hiện tại.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((site) => {
            const fav = isFavorite(site.id, 'heritage');
            return (
              <article
                key={site.id}
                className="rounded-2xl bg-white border border-heritage-gold/35 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="aspect-[4/3] relative">
                  <ImageWithFallback
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(site.id, 'heritage')}
                    aria-label="Lưu yêu thích"
                    className={`absolute top-3 right-3 p-2 rounded-full shadow transition-colors ${
                      fav
                        ? 'bg-heritage-burgundy text-white'
                        : 'bg-white/90 text-heritage-burgundy hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
                  </button>
                  <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/65 text-white text-[11px] font-medium">
                    {getProvinceName(site.provinceId)}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-semibold text-heritage-burgundy mb-1">
                      {site.category}
                    </div>
                    <h2 className="font-serif text-lg font-bold text-heritage-ink">
                      {site.name}
                    </h2>
                    <p className="text-xs text-heritage-muted mt-1 line-clamp-2 leading-relaxed">
                      {site.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-heritage-gold/20">
                    <span className="text-[11px] text-heritage-muted flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-heritage-burgundy" />
                      {site.bestSeason}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveSite(site)}
                      className="text-xs font-semibold text-heritage-burgundy hover:underline"
                    >
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {activeSite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
          <div className="bg-heritage-cream rounded-2xl border border-heritage-gold/50 max-w-xl w-full overflow-hidden shadow-2xl">
            <div className="relative h-52">
              <ImageWithFallback
                src={activeSite.image}
                alt={activeSite.name}
                className="w-full h-full"
              />
              <button
                type="button"
                onClick={() => setActiveSite(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-heritage-burgundy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <span className="text-xs font-semibold text-heritage-burgundy">
                {activeSite.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-heritage-ink">
                {activeSite.name}
              </h3>
              <p className="text-sm text-heritage-ink leading-relaxed">
                {activeSite.description}
              </p>
              <div className="text-xs text-heritage-muted flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-heritage-burgundy shrink-0" />
                  <span>{activeSite.address}</span>
                </span>
                {activeSite.coordinates && (
                  <a
                    href={`https://www.google.com/maps?q=${activeSite.coordinates.lat},${activeSite.coordinates.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-heritage-burgundy font-semibold hover:underline"
                  >
                    ({activeSite.coordinates.lat.toFixed(4)}° N,{' '}
                    {activeSite.coordinates.lng.toFixed(4)}° E · Xem bản đồ)
                  </a>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeSite.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-heritage-paper border border-heritage-gold/40 text-xs text-heritage-ink"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

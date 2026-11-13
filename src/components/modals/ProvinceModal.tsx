import React, { useState } from 'react';
import { CalendarDays, Compass, MapPin, Palette, Utensils, X } from 'lucide-react';
import { Province, NavSection } from '../../types';
import { HERITAGE_SITES } from '../../data/heritageSites';
import { FESTIVALS } from '../../data/festivals';
import { SPECIALTIES } from '../../data/specialties';
import { WORKSHOPS } from '../../data/workshops';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ProvinceModalProps {
  province: Province | null;
  onClose: () => void;
  onNavigateSection: (section: NavSection) => void;
}

type ModalTab = 'heritage' | 'festivals' | 'specialties' | 'workshops';

export const ProvinceModal: React.FC<ProvinceModalProps> = ({
  province,
  onClose,
  onNavigateSection,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('heritage');

  if (!province) return null;

  const sites = HERITAGE_SITES.filter((s) => s.provinceId === province.id);
  const festivals = FESTIVALS.filter((f) => f.provinceId === province.id);
  const specialties = SPECIALTIES.filter((s) => s.provinceId === province.id);
  const workshops = WORKSHOPS.filter((w) => w.provinceId === province.id);

  const tabs: { id: ModalTab; label: string; count: number; icon: React.ReactNode }[] = [
    { id: 'heritage', label: 'Di tích', count: sites.length, icon: <Compass className="w-4 h-4" /> },
    { id: 'festivals', label: 'Lễ hội', count: festivals.length, icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'specialties', label: 'Đặc sản', count: specialties.length, icon: <Utensils className="w-4 h-4" /> },
    { id: 'workshops', label: 'Làng nghề', count: workshops.length, icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
      <div className="bg-heritage-cream rounded-2xl border border-heritage-gold/50 max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Banner */}
        <div className="relative h-44 sm:h-52 shrink-0">
          <ImageWithFallback
            src={province.image}
            alt={province.name}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-heritage-burgundy transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-heritage-gold text-heritage-ink text-xs font-bold mb-1.5">
              {province.shortTitle}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              {province.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-heritage-gold" />
              <span>Thời điểm đẹp nhất: {province.bestSeason}</span>
            </p>
          </div>
        </div>

        {/* 4 Tabs */}
        <div className="px-5 pt-3 bg-heritage-paper border-b border-heritage-gold/30 flex gap-2 overflow-x-auto shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 text-sm font-medium flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-heritage-burgundy text-heritage-burgundy font-semibold'
                  : 'border-transparent text-heritage-muted hover:text-heritage-ink'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-heritage-gold/25 text-heritage-burgundy text-xs font-bold">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          <p className="text-sm text-heritage-muted leading-relaxed pb-2 border-b border-heritage-gold/20">
            {province.description}
          </p>

          {activeTab === 'heritage' &&
            sites.map((site) => (
              <div
                key={site.id}
                className="p-3.5 rounded-xl bg-white border border-heritage-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <h4 className="font-serif font-bold text-heritage-burgundy">
                    {site.name}
                  </h4>
                  <p className="text-xs text-heritage-muted mt-0.5">{site.summary}</p>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-heritage-paper text-heritage-ink font-medium shrink-0 self-start">
                  {site.bestSeason}
                </span>
              </div>
            ))}

          {activeTab === 'festivals' &&
            festivals.map((fest) => (
              <div
                key={fest.id}
                className="p-3.5 rounded-xl bg-white border border-heritage-gold/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-serif font-bold text-heritage-burgundy">
                    {fest.name}
                  </h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-heritage-burgundy/10 text-heritage-burgundy font-medium">
                    {fest.timeLabel}
                  </span>
                </div>
                <p className="text-xs text-heritage-muted mt-1">{fest.summary}</p>
              </div>
            ))}

          {activeTab === 'specialties' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialties.map((sp) => (
                <div
                  key={sp.id}
                  className="p-3.5 rounded-xl bg-white border border-heritage-gold/30"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif font-bold text-heritage-burgundy text-sm">
                      {sp.name}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-heritage-paper text-heritage-muted font-medium">
                      {sp.type}
                    </span>
                  </div>
                  <p className="text-xs text-heritage-muted mt-1">{sp.summary}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'workshops' &&
            workshops.map((ws) => (
              <div
                key={ws.id}
                className="p-3.5 rounded-xl bg-white border border-heritage-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-serif font-bold text-heritage-burgundy">
                    {ws.name}
                  </h4>
                  <p className="text-xs text-heritage-muted mt-0.5">
                    {ws.craftVillage} · {ws.durationMinutes} phút
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateSection('workshops');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-heritage-burgundy text-white text-xs font-semibold hover:bg-heritage-burgundyDark transition-colors shrink-0 self-start"
                >
                  Đặt lịch →
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

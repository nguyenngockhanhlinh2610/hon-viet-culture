import React, { useMemo, useState } from 'react';
import {
  Award,
  Bell,
  BellRing,
  CalendarDays,
  CalendarPlus,
  Download,
  Heart,
  MapPin,
  X,
} from 'lucide-react';
import { FESTIVALS } from '../data/festivals';
import { PROVINCES } from '../data/provinces';
import { FavoriteCategory, Festival, ProvinceId } from '../types';
import { ProvinceFilterBar } from '../components/common/ProvinceFilterBar';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { formatDateVN } from '../utils/date';

interface FestivalsPageProps {
  isFavorite: (id: string, category: FavoriteCategory) => boolean;
  onToggleFavorite: (id: string, category: FavoriteCategory) => void;
}

const REMINDER_KEY = 'honviet_festival_reminders_v1';

function loadReminders(): Record<string, string> {
  try {
    const raw = localStorage.getItem(REMINDER_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export const FestivalsPage: React.FC<FestivalsPageProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | 'all'>('all');
  const [reminders, setReminders] = useState<Record<string, string>>(() =>
    loadReminders()
  );
  const [reminderModal, setReminderModal] = useState<Festival | null>(null);
  const [reminderDate, setReminderDate] = useState(() =>
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  const filtered = useMemo(
    () =>
      FESTIVALS.filter(
        (f) => selectedProvince === 'all' || f.provinceId === selectedProvince
      ),
    [selectedProvince]
  );

  const getProvinceName = (id: ProvinceId) =>
    PROVINCES.find((p) => p.id === id)?.name || id;

  const saveReminder = (festId: string, date: string) => {
    const next = { ...reminders, [festId]: date };
    setReminders(next);
    localStorage.setItem(REMINDER_KEY, JSON.stringify(next));
  };

  const removeReminder = (festId: string) => {
    const next = { ...reminders };
    delete next[festId];
    setReminders(next);
    localStorage.setItem(REMINDER_KEY, JSON.stringify(next));
  };

  const buildGoogleCalendarUrl = (fest: Festival, dateStr: string) => {
    const compact = dateStr.replace(/-/g, '');
    const title = encodeURIComponent(`[Hồn Việt Culture] ${fest.name}`);
    const details = encodeURIComponent(
      `${fest.summary}\nThời gian lễ hội: ${fest.timeLabel}`
    );
    const location = encodeURIComponent(
      `${fest.location || ''}, ${getProvinceName(fest.provinceId)}`
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${compact}/${compact}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = (fest: Festival, dateStr: string) => {
    const compact = dateStr.replace(/-/g, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Hon Viet Culture//Festival Reminder//VI',
      'BEGIN:VEVENT',
      `UID:${fest.id}@honvietculture.vn`,
      `DTSTAMP:${compact}T080000Z`,
      `DTSTART;VALUE=DATE:${compact}`,
      `SUMMARY:${fest.name}`,
      `DESCRIPTION:${fest.summary} (${fest.timeLabel})`,
      `LOCATION:${fest.location || getProvinceName(fest.provinceId)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fest.slug}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
          const remindedDate = reminders[fest.id];
          return (
            <article
              key={fest.id}
              className="rounded-2xl bg-heritage-paper border border-heritage-gold/45 overflow-hidden shadow-sm flex flex-col sm:flex-row"
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

              <div className="p-4 flex-1 flex flex-col justify-between gap-2.5">
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
                    <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                    <span>{fest.timeLabel}</span>
                  </p>
                  {fest.location && (
                    <p className="text-[11px] text-heritage-muted flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-heritage-burgundy shrink-0" />
                      <span>{fest.location}</span>
                    </p>
                  )}
                  <p className="text-xs text-heritage-muted mt-1.5 leading-relaxed">
                    {fest.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-heritage-gold/25 flex flex-col gap-2">
                  <div>
                    <div className="text-[11px] font-semibold text-heritage-ink mb-0.5">
                      Nghi thức chính:
                    </div>
                    <ul className="text-[11px] text-heritage-muted list-disc list-inside space-y-0.5">
                      {fest.rituals.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    {remindedDate ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                          <BellRing className="w-3.5 h-3.5" />
                          Đã nhắc ({formatDateVN(remindedDate)})
                        </span>
                        <button
                          type="button"
                          onClick={() => removeReminder(fest.id)}
                          className="text-[11px] text-heritage-muted hover:text-heritage-burgundy underline"
                        >
                          Hủy nhắc
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setReminderModal(fest)}
                        className="px-3 py-1.5 rounded-lg bg-heritage-burgundy text-white text-xs font-semibold hover:bg-heritage-burgundyDark transition-colors inline-flex items-center gap-1.5"
                      >
                        <Bell className="w-3.5 h-3.5 text-heritage-gold" />
                        <span>Nhắc lịch</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Nhắc lịch lễ hội */}
      {reminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
          <div className="bg-heritage-paper rounded-2xl border-2 border-heritage-gold max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-heritage-burgundy">
                  Đặt nhắc lịch lễ hội
                </span>
                <h3 className="font-serif text-xl font-bold text-heritage-ink">
                  {reminderModal.name}
                </h3>
                <p className="text-xs text-heritage-muted mt-0.5">
                  Thời gian truyền thống: {reminderModal.timeLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setReminderModal(null)}
                className="p-1.5 rounded-lg hover:bg-heritage-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-heritage-ink mb-1">
                Chọn ngày bạn muốn được nhắc / dự kiến tham dự
              </label>
              <input
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-heritage-gold/50 text-sm"
              />
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  saveReminder(reminderModal.id, reminderDate);
                  setReminderModal(null);
                }}
                className="w-full py-2.5 rounded-xl bg-heritage-burgundy text-white text-sm font-semibold hover:bg-heritage-burgundyDark inline-flex items-center justify-center gap-2"
              >
                <BellRing className="w-4 h-4 text-heritage-gold" />
                <span>Lưu nhắc lịch trên Hồn Việt</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={buildGoogleCalendarUrl(reminderModal, reminderDate)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => saveReminder(reminderModal.id, reminderDate)}
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-heritage-gold to-heritage-amber text-heritage-burgundyDark text-xs font-bold inline-flex items-center justify-center gap-1.5 hover:brightness-105"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Google Calendar</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    saveReminder(reminderModal.id, reminderDate);
                    downloadIcsFile(reminderModal, reminderDate);
                    setReminderModal(null);
                  }}
                  className="py-2 px-3 rounded-xl border border-heritage-burgundy text-heritage-burgundy text-xs font-semibold hover:bg-heritage-cream inline-flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải lịch (.ics)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

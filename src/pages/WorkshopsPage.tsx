import React, { useMemo, useState } from 'react';
import { CalendarCheck, Clock, Heart, Users, X } from 'lucide-react';
import { WORKSHOPS } from '../data/workshops';
import { PROVINCES } from '../data/provinces';
import { Booking, FavoriteCategory, ProvinceId, Workshop } from '../types';
import { ProvinceFilterBar } from '../components/common/ProvinceFilterBar';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface WorkshopsPageProps {
  isFavorite: (id: string, category: FavoriteCategory) => boolean;
  onToggleFavorite: (id: string, category: FavoriteCategory) => void;
  onCreateBooking: (
    input: Omit<Booking, 'id' | 'status' | 'createdAt'>
  ) => void;
  defaultCustomerName?: string;
}

export const WorkshopsPage: React.FC<WorkshopsPageProps> = ({
  isFavorite,
  onToggleFavorite,
  onCreateBooking,
  defaultCustomerName = '',
}) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | 'all'>('all');
  const [detailWorkshop, setDetailWorkshop] = useState<Workshop | null>(null);
  const [bookingWorkshop, setBookingWorkshop] = useState<Workshop | null>(null);

  // Booking form state
  const minDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const [date, setDate] = useState(minDate);
  const [timeSlot, setTimeSlot] = useState('09:00');
  const [guests, setGuests] = useState(2);
  const [customerName, setCustomerName] = useState(defaultCustomerName);
  const [customerPhone, setCustomerPhone] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const filtered = useMemo(
    () =>
      WORKSHOPS.filter(
        (w) => selectedProvince === 'all' || w.provinceId === selectedProvince
      ),
    [selectedProvince]
  );

  const getProvinceName = (id: ProvinceId) =>
    PROVINCES.find((p) => p.id === id)?.name || id;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingWorkshop || !customerName.trim() || !customerPhone.trim()) return;

    onCreateBooking({
      workshopId: bookingWorkshop.id,
      workshopName: bookingWorkshop.name,
      provinceId: bookingWorkshop.provinceId,
      date,
      timeSlot,
      guests,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
    });

    setSuccessMsg(
      `Đã gửi yêu cầu đặt lịch "${bookingWorkshop.name}" ngày ${date} lúc ${timeSlot}! Lịch hẹn đang ở trạng thái Chờ xác nhận.`
    );
    setBookingWorkshop(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-burgundy">
          Trải nghiệm Làng nghề Thủ công Mỹ nghệ
        </h1>
        <p className="text-sm text-heritage-muted mt-1">
          10 workshop thực hành trực tiếp cùng nghệ nhân tại 5 tỉnh miền Tây.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between gap-3">
          <span>{successMsg}</span>
          <button
            type="button"
            onClick={() => setSuccessMsg('')}
            className="text-xs font-semibold underline"
          >
            Đóng
          </button>
        </div>
      )}

      <ProvinceFilterBar
        selected={selectedProvince}
        onSelect={setSelectedProvince}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((ws) => {
          const fav = isFavorite(ws.id, 'workshop');
          return (
            <article
              key={ws.id}
              className="rounded-2xl bg-white border border-heritage-gold/35 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="aspect-[16/9] relative">
                <ImageWithFallback
                  src={ws.image}
                  alt={ws.name}
                  className="w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => onToggleFavorite(ws.id, 'workshop')}
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
                  {getProvinceName(ws.provinceId)}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-heritage-burgundy">
                    {ws.craftVillage}
                  </div>
                  <h2 className="font-serif text-xl font-bold text-heritage-ink mt-0.5">
                    {ws.name}
                  </h2>
                  <p className="text-xs text-heritage-muted mt-1.5 leading-relaxed">
                    {ws.summary}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-heritage-ink">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-heritage-burgundy" />
                      {ws.durationMinutes} phút
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-heritage-burgundy" />
                      Tối đa {ws.maxGuests} khách
                    </span>
                    <span className="font-bold text-heritage-burgundy">
                      {ws.priceVnd.toLocaleString('vi-VN')}đ / khách
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-3 border-t border-heritage-gold/20">
                  <button
                    type="button"
                    onClick={() => setDetailWorkshop(ws)}
                    className="flex-1 py-2 px-3 rounded-xl border border-heritage-burgundy text-heritage-burgundy text-xs font-semibold hover:bg-heritage-paper transition-colors"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingWorkshop(ws)}
                    className="flex-1 py-2 px-3 rounded-xl bg-heritage-burgundy text-white text-xs font-semibold hover:bg-heritage-burgundyDark transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <CalendarCheck className="w-3.5 h-3.5 text-heritage-gold" />
                    <span>Đặt lịch</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Xem chi tiết */}
      {detailWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
          <div className="bg-heritage-cream rounded-2xl border border-heritage-gold/50 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-heritage-burgundy">
                  {detailWorkshop.craftVillage}
                </div>
                <h3 className="font-serif text-2xl font-bold text-heritage-ink">
                  {detailWorkshop.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailWorkshop(null)}
                className="p-1.5 rounded-lg hover:bg-heritage-paper"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-heritage-ink leading-relaxed">
              {detailWorkshop.summary}
            </p>
            <div>
              <h4 className="text-xs font-bold uppercase text-heritage-burgundy mb-2">
                Hoạt động trải nghiệm
              </h4>
              <ul className="list-disc list-inside text-sm text-heritage-ink space-y-1">
                {detailWorkshop.activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => {
                const target = detailWorkshop;
                setDetailWorkshop(null);
                setBookingWorkshop(target);
              }}
              className="w-full py-2.5 rounded-xl bg-heritage-burgundy text-white text-sm font-semibold hover:bg-heritage-burgundyDark"
            >
              Đặt lịch trải nghiệm ngay
            </button>
          </div>
        </div>
      )}

      {/* Modal Đặt lịch */}
      {bookingWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
          <form
            onSubmit={handleSubmitBooking}
            className="bg-heritage-cream rounded-2xl border border-heritage-gold/50 max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-heritage-burgundy">
                  Đặt lịch Workshop
                </span>
                <h3 className="font-serif text-xl font-bold text-heritage-ink">
                  {bookingWorkshop.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingWorkshop(null)}
                className="p-1.5 rounded-lg hover:bg-heritage-paper"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">
                  Ngày trải nghiệm
                </label>
                <input
                  type="date"
                  required
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-heritage-gold/40 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Khung giờ
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-heritage-gold/40 text-sm"
                >
                  <option value="09:00">09:00 Sáng</option>
                  <option value="14:00">14:00 Chiều</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Số khách (tối đa {bookingWorkshop.maxGuests})
              </label>
              <input
                type="number"
                min={1}
                max={bookingWorkshop.maxGuests}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-white border border-heritage-gold/40 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Họ tên liên hệ
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-3 py-2 rounded-lg bg-white border border-heritage-gold/40 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0909 123 456"
                className="w-full px-3 py-2 rounded-lg bg-white border border-heritage-gold/40 text-sm"
              />
            </div>

            <p className="text-[11px] text-heritage-muted bg-heritage-paper p-2.5 rounded-lg border border-heritage-gold/30">
              <strong>Chính sách hủy:</strong> Hỗ trợ hủy trực tuyến miễn phí
              trước ngày diễn ra trải nghiệm tối thiểu <strong>5 ngày (120 giờ)</strong>.
            </p>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-heritage-burgundy text-white text-sm font-semibold hover:bg-heritage-burgundyDark"
            >
              Xác nhận đặt lịch (
              {(bookingWorkshop.priceVnd * guests).toLocaleString('vi-VN')}đ)
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

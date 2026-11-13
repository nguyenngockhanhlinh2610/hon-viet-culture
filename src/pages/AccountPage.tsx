import React, { useState } from 'react';
import { CalendarX2, LogOut, UserCheck } from 'lucide-react';
import { Booking, UserProfile } from '../types';
import { storageService } from '../services/storageService';

interface AccountPageProps {
  user: UserProfile | null;
  bookings: Booking[];
  onLogin: (fullName: string, emailOrPhone: string) => void;
  onLogout: () => void;
  onCancelBooking: (bookingId: string) => string | undefined;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  user,
  bookings,
  onLogin,
  onLogout,
  onCancelBooking,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cancelError, setCancelError] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) return;
    onLogin(mode === 'register' ? fullName : emailOrPhone.split('@')[0], emailOrPhone);
  };

  const handleCancel = (bookingId: string) => {
    const err = onCancelBooking(bookingId);
    setCancelError(err || '');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-burgundy">
          Tài khoản Cá nhân &amp; Lịch Trải nghiệm
        </h1>
        <p className="text-sm text-heritage-muted mt-1">
          Quản lý hồ sơ săn dấu Hộ chiếu và lịch hẹn workshop làng nghề.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Auth / Profile Box */}
        <div className="rounded-2xl bg-white border border-heritage-gold/40 p-6 shadow-sm">
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-heritage-burgundy text-heritage-gold flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-heritage-ink">
                    {user.fullName}
                  </h2>
                  <p className="text-xs text-heritage-muted">{user.emailOrPhone}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="w-full py-2 px-3 rounded-xl border border-heritage-burgundy text-heritage-burgundy text-xs font-semibold hover:bg-heritage-paper inline-flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              <div className="flex gap-2 border-b border-heritage-gold/25 pb-2">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 text-sm font-semibold rounded-lg ${
                    mode === 'login'
                      ? 'bg-heritage-burgundy text-white'
                      : 'text-heritage-muted'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-1.5 text-sm font-semibold rounded-lg ${
                    mode === 'register'
                      ? 'bg-heritage-burgundy text-white'
                      : 'text-heritage-muted'
                  }`}
                >
                  Đăng ký
                </button>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium mb-1">
                    Họ tên đầy đủ
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2 rounded-lg border border-heritage-gold/40 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium mb-1">
                  Email hoặc Số điện thoại
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="dukhach@honviet.vn"
                  className="w-full px-3 py-2 rounded-lg border border-heritage-gold/40 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-lg border border-heritage-gold/40 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-heritage-burgundy text-white text-sm font-semibold hover:bg-heritage-burgundyDark"
              >
                {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
              </button>
            </form>
          )}
        </div>

        {/* Bookings List */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-heritage-gold/40 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif text-xl font-bold text-heritage-burgundy">
              Lịch hẹn Workshop đã đặt ({bookings.length})
            </h2>
            <span className="text-[11px] text-heritage-muted">
              Hủy trực tuyến hợp lệ trước 5 ngày (120 giờ)
            </span>
          </div>

          {cancelError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
              {cancelError}
            </div>
          )}

          {bookings.length === 0 ? (
            <p className="text-sm text-heritage-muted py-6 text-center bg-heritage-paper rounded-xl">
              Bạn chưa có lịch hẹn trải nghiệm làng nghề nào.
            </p>
          ) : (
            <div className="space-y-3">
              {bookings.map((bk) => {
                const check = storageService.canCancelBooking(bk.date);
                return (
                  <div
                    key={bk.id}
                    className="p-4 rounded-xl bg-heritage-cream border border-heritage-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-bold text-heritage-ink">
                          {bk.workshopName}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            bk.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {bk.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hủy'}
                        </span>
                      </div>
                      <p className="text-xs text-heritage-muted mt-1">
                        Ngày {bk.date} · {bk.timeSlot} · {bk.guests} khách ·{' '}
                        {bk.customerName} ({bk.customerPhone})
                      </p>
                    </div>

                    {bk.status === 'confirmed' && (
                      <button
                        type="button"
                        disabled={!check.allowed}
                        onClick={() => handleCancel(bk.id)}
                        title={
                          check.allowed
                            ? 'Hủy lịch hẹn'
                            : 'Không thể hủy cận ngày (dưới 5 ngày / 120 giờ)'
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 ${
                          check.allowed
                            ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                            : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        <CalendarX2 className="w-3.5 h-3.5" />
                        <span>{check.allowed ? 'Hủy lịch' : 'Khóa hủy (<5 ngày)'}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

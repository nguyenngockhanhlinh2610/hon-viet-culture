import React, { useState } from 'react';
import { Award, CheckCircle2, Lock, QrCode, Sparkles, Stamp, X } from 'lucide-react';
import { PASSPORT_STAMPS } from '../data/passportStamps';
import { PROVINCES } from '../data/provinces';
import { PassportStamp, ProvinceId } from '../types';

interface PassportPageProps {
  unlockedIds: string[];
  onUnlockStamp: (stampId: string) => void;
  isLoggedIn: boolean;
  onRequireLogin: () => void;
}

export const PassportPage: React.FC<PassportPageProps> = ({
  unlockedIds,
  onUnlockStamp,
  isLoggedIn,
  onRequireLogin,
}) => {
  const [activeStamp, setActiveStamp] = useState<PassportStamp | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [qrInput, setQrInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const progress = Math.round((unlockedIds.length / PASSPORT_STAMPS.length) * 100);
  const completedAll = unlockedIds.length === PASSPORT_STAMPS.length;

  const getProvinceName = (id: ProvinceId) =>
    PROVINCES.find((p) => p.id === id)?.name || id;

  const handleOpenStamp = (stamp: PassportStamp) => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    setActiveStamp(stamp);
    setSelectedOption(null);
    setQrInput('');
    setFeedback('');
  };

  const handleVerifyQuiz = () => {
    if (!activeStamp || selectedOption === null) return;
    if (selectedOption === activeStamp.correctOptionIndex) {
      onUnlockStamp(activeStamp.id);
      setFeedback('Chính xác! Đã đóng dấu ấn vào Hộ chiếu của bạn.');
      setTimeout(() => setActiveStamp(null), 900);
    } else {
      setFeedback('Chưa đúng rồi, hãy thử chọn đáp án khác nhé!');
    }
  };

  const handleVerifyQr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStamp) return;
    if (qrInput.trim().toUpperCase() === activeStamp.qrCodeHint) {
      onUnlockStamp(activeStamp.id);
      setFeedback('Xác thực mã QR thực địa thành công! Đã đóng dấu ấn.');
      setTimeout(() => setActiveStamp(null), 900);
    } else {
      setFeedback(`Mã chưa khớp. Gợi ý mã mẫu: ${activeStamp.qrCodeHint}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-heritage-burgundy to-heritage-burgundyDark text-white p-6 sm:p-8 border border-heritage-gold/50 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-heritage-gold uppercase tracking-wider">
              <Stamp className="w-4 h-4" />
              Gamification Di sản
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
              Hộ Chiếu Săn Dấu Hồn Việt
            </h1>
            <p className="text-xs sm:text-sm text-white/85 mt-1">
              Mở khóa đủ 10 dấu ấn thất truyền tại 5 tỉnh miền Tây để nhận{' '}
              <strong className="text-heritage-gold">Cúp Phượt Thủ Miền Tây</strong>.
            </p>
          </div>
          <div className="bg-black/25 rounded-2xl p-4 min-w-[200px] border border-heritage-gold/40">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span>Tiến độ săn dấu</span>
              <span className="font-bold text-heritage-gold">
                {unlockedIds.length}/{PASSPORT_STAMPS.length}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-heritage-gold transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="p-4 rounded-xl bg-heritage-paper border border-heritage-gold/50 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-heritage-ink">
            Đăng nhập tài khoản cá nhân để lưu giữ tiến độ Hộ chiếu và chứng nhận số.
          </span>
          <button
            type="button"
            onClick={onRequireLogin}
            className="px-4 py-2 rounded-lg bg-heritage-burgundy text-white text-xs font-semibold hover:bg-heritage-burgundyDark"
          >
            Đăng nhập ngay
          </button>
        </div>
      )}

      {completedAll && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-heritage-paper border-2 border-heritage-gold flex items-center gap-4 shadow-md">
          <div className="w-14 h-14 rounded-full bg-heritage-gold text-heritage-ink flex items-center justify-center shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-heritage-burgundy">
              Chúc mừng! Bạn đã đạt Cúp Phượt Thủ Miền Tây
            </h2>
            <p className="text-sm text-heritage-muted">
              Huy hiệu Danh dự số hóa 10/10 dấu ấn văn hóa Đồng bằng sông Cửu Long đã được ghi nhận.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {PASSPORT_STAMPS.map((stamp, idx) => {
          const unlocked = unlockedIds.includes(stamp.id);
          return (
            <div
              key={stamp.id}
              className={`rounded-2xl p-4 border flex flex-col justify-between gap-3 transition-all ${
                unlocked
                  ? 'bg-white border-heritage-gold shadow-md'
                  : 'bg-heritage-paper/60 border-heritage-gold/30 opacity-90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-heritage-burgundy">
                    #{idx + 1} · {getProvinceName(stamp.provinceId).replace('Thành phố ', '').replace('Tỉnh ', '')}
                  </span>
                  {unlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Lock className="w-4 h-4 text-heritage-muted" />
                  )}
                </div>
                <h3 className="font-serif font-bold text-base text-heritage-ink">
                  {stamp.title}
                </h3>
                <p className="text-xs text-heritage-burgundy font-medium mt-0.5">
                  {stamp.heritageName}
                </p>
                <p className="text-xs text-heritage-muted mt-1.5">
                  {stamp.hint}
                </p>
              </div>

              {unlocked ? (
                <div className="py-1.5 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center">
                  Đã đóng dấu
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenStamp(stamp)}
                  className="w-full py-2 px-3 rounded-lg bg-heritage-burgundy text-white text-xs font-semibold hover:bg-heritage-burgundyDark transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-heritage-gold" />
                  <span>Mở khóa dấu ấn</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Mở khóa dấu ấn */}
      {activeStamp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
          <div className="bg-heritage-cream rounded-2xl border border-heritage-gold/50 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-heritage-burgundy">
                  {activeStamp.heritageName}
                </span>
                <h3 className="font-serif text-xl font-bold text-heritage-ink">
                  {activeStamp.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveStamp(null)}
                className="p-1.5 rounded-lg hover:bg-heritage-paper"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white border border-heritage-gold/30 space-y-2.5">
              <div className="text-xs font-bold uppercase text-heritage-burgundy">
                Cách 1: Trả lời câu hỏi văn hóa
              </div>
              <p className="text-sm font-medium text-heritage-ink">
                {activeStamp.quizQuestion}
              </p>
              <div className="space-y-1.5">
                {activeStamp.quizOptions.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-colors ${
                      selectedOption === idx
                        ? 'bg-heritage-burgundy text-white border-heritage-burgundy'
                        : 'bg-heritage-cream text-heritage-ink border-heritage-gold/30 hover:bg-heritage-paper'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleVerifyQuiz}
                className="w-full py-2 rounded-lg bg-heritage-gold text-heritage-ink text-xs font-bold hover:bg-heritage-amber"
              >
                Xác nhận đáp án
              </button>
            </div>

            <form
              onSubmit={handleVerifyQr}
              className="p-4 rounded-xl bg-white border border-heritage-gold/30 space-y-2"
            >
              <div className="text-xs font-bold uppercase text-heritage-burgundy flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span>Cách 2: Nhập mã Check-in thực địa</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  placeholder={`Ví dụ: ${activeStamp.qrCodeHint}`}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-heritage-gold/40 text-xs"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-heritage-burgundy text-white text-xs font-semibold"
                >
                  Check-in
                </button>
              </div>
            </form>

            {feedback && (
              <p className="text-xs font-medium text-center text-heritage-burgundy">
                {feedback}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

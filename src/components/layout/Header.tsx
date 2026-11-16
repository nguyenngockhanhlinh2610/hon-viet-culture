import React, { useState } from 'react';
import {
  ArrowRight,
  Heart,
  Menu,
  MessageCircle,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { NavSection } from '../../types';

interface HeaderProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  favoritesCount: number;
  unlockedStampsCount: number;
  totalStampsCount: number;
  onOpenAiChat: () => void;
  userFullName?: string;
}

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'home', label: 'Trang chủ' },
  { id: 'explore', label: 'Di tích' },
  { id: 'festivals', label: 'Lễ hội' },
  { id: 'specialties', label: 'Đặc sản' },
  { id: 'workshops', label: 'Trải nghiệm' },
  { id: 'passport', label: 'Hộ chiếu' },
  { id: 'blog', label: 'Blog' },
];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  favoritesCount,
  unlockedStampsCount,
  totalStampsCount,
  onOpenAiChat,
  userFullName,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNav = (section: NavSection) => {
    onNavigate(section);
    setDrawerOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Top Heritage Burgundy Bar */}
      <div className="bg-heritage-burgundy border-b border-heritage-gold/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
          >
            <img
              src="/logo-hon-viet.jpg"
              alt="Hồn Việt Culture"
              className="w-10 h-10 rounded-full object-cover border-2 border-heritage-gold shadow-sm group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="whitespace-nowrap">
              <div className="font-serif font-bold text-lg sm:text-xl text-[#FDE68A] leading-tight">
                Hồn Việt Culture
              </div>
              <div className="text-[11px] text-[#FDE68A]/80 hidden xl:block leading-tight">
                Di sản 5 tỉnh Đồng bằng sông Cửu Long
              </div>
            </div>
          </button>

          {/* Desktop Navigation (strictly single-line, text-only) */}
          <nav className="hidden lg:flex items-center gap-1 bg-heritage-burgundyDark/60 p-1 rounded-full border border-heritage-gold/35">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-heritage-gold to-heritage-amber text-heritage-burgundyDark font-bold shadow-sm'
                      : 'text-[#FEF3C7] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Utility Bar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Favorites Counter */}
            <button
              type="button"
              onClick={() => handleNav('favorites')}
              aria-label="Danh sách yêu thích"
              className={`relative p-2 rounded-full border transition-colors shrink-0 ${
                activeSection === 'favorites'
                  ? 'bg-heritage-gold text-heritage-burgundyDark border-heritage-gold'
                  : 'bg-heritage-burgundyDark/50 border-heritage-gold/40 text-heritage-gold hover:bg-heritage-burgundyDark'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-heritage-amber text-heritage-burgundyDark text-[10px] font-bold flex items-center justify-center border border-heritage-burgundyDark">
                {favoritesCount}
              </span>
            </button>

            {/* AI Heritage Assistant Button */}
            <button
              type="button"
              onClick={onOpenAiChat}
              title="Trợ lý AI Hồn Việt Culture"
              className="p-2 rounded-full bg-heritage-burgundyDark/50 border border-heritage-gold/40 text-[#FDE68A] hover:bg-heritage-burgundyDark transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Account Button */}
            <button
              type="button"
              onClick={() => handleNav('account')}
              title={userFullName ? `Tài khoản: ${userFullName}` : 'Tài khoản cá nhân'}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                activeSection === 'account'
                  ? 'bg-heritage-gold text-heritage-burgundyDark border-heritage-gold'
                  : 'bg-heritage-burgundyDark/50 border-heritage-gold/40 text-[#FEF3C7] hover:bg-heritage-burgundyDark'
              }`}
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span className="max-w-[90px] truncate">
                {userFullName || 'Tài khoản'}
              </span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2 rounded-full bg-heritage-burgundyDark/50 border border-heritage-gold/40 text-[#FDE68A] hover:bg-heritage-burgundyDark shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Gamification Sub-Banner (matching reference site) */}
      <div className="bg-heritage-burgundyDark border-b-2 border-heritage-gold/60 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#FEF3C7]">
            <span className="w-6 h-6 rounded-full bg-heritage-gold text-heritage-burgundyDark flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5" />
            </span>
            <p className="italic text-center sm:text-left">
              Bạn đã sẵn sàng mở khóa{' '}
              <span className="underline decoration-heritage-gold font-semibold">
                10 dấu ấn thất truyền
              </span>{' '}
              và rinh{' '}
              <strong className="text-heritage-amber">
                Cúp Phượt Thủ Miền Tây
              </strong>
              ?
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleNav('passport')}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-heritage-gold to-heritage-amber text-heritage-burgundyDark text-xs font-bold shadow-sm hover:brightness-105 transition-all inline-flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Hộ Chiếu Săn Dấu Hồn Việt</span>
            <span className="px-2 py-0.5 rounded-full bg-heritage-burgundyDark text-white text-[11px]">
              {unlockedStampsCount}/{totalStampsCount}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-72 max-w-[85vw] bg-heritage-paper h-full shadow-2xl border-l-2 border-heritage-gold p-5 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-heritage-gold/40">
              <span className="font-serif font-bold text-lg text-heritage-burgundy">
                Hồn Việt Culture
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-heritage-muted hover:bg-heritage-cream"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 flex-1 space-y-1.5 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center transition-colors ${
                      isActive
                        ? 'bg-heritage-burgundy text-white'
                        : 'text-heritage-ink hover:bg-heritage-cream'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => handleNav('favorites')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  activeSection === 'favorites'
                    ? 'bg-heritage-burgundy text-white'
                    : 'text-heritage-ink hover:bg-heritage-cream'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  Danh sách yêu thích
                </span>
                <span className="px-2 py-0.5 rounded-full bg-heritage-gold text-heritage-burgundyDark text-xs font-bold">
                  {favoritesCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('account')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-colors ${
                  activeSection === 'account'
                    ? 'bg-heritage-burgundy text-white'
                    : 'text-heritage-ink hover:bg-heritage-cream'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{userFullName || 'Tài khoản cá nhân'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

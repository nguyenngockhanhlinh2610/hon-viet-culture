import React, { useState } from 'react';
import {
  Heart,
  Menu,
  MessageCircle,
  Stamp,
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
  { id: 'blog', label: 'Blog' },
  { id: 'passport', label: 'Hộ chiếu' },
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
    <header className="sticky top-0 z-40 bg-heritage-cream/95 backdrop-blur-md border-b border-heritage-gold/35 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
        >
          <img
            src="/logo-hon-viet.jpg"
            alt="Hồn Việt Culture"
            className="w-11 h-11 rounded-full object-cover border border-heritage-gold/70 shadow-sm group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="whitespace-nowrap">
            <div className="font-serif font-bold text-base sm:text-lg text-heritage-burgundy leading-tight">
              Hồn Việt Culture
            </div>
            <div className="text-[11px] text-heritage-muted hidden xl:block leading-tight">
              Di sản 5 tỉnh Đồng bằng sông Cửu Long
            </div>
          </div>
        </button>

        {/* Desktop Navigation (strictly single-line, text-only) */}
        <nav className="hidden lg:flex items-center gap-1 bg-heritage-paper/80 p-1 rounded-full border border-heritage-gold/30">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-heritage-burgundy text-white shadow-sm'
                    : 'text-heritage-ink hover:bg-white/80 hover:text-heritage-burgundy'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Utility Bar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Passport Progress Pill */}
          <button
            type="button"
            onClick={() => handleNav('passport')}
            title="Hộ Chiếu Săn Dấu Hồn Việt"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-heritage-paper border border-heritage-gold/60 text-xs font-semibold text-heritage-burgundy hover:bg-heritage-gold/20 transition-colors whitespace-nowrap"
          >
            <Stamp className="w-3.5 h-3.5 text-heritage-burgundy shrink-0" />
            <span>
              {unlockedStampsCount}/{totalStampsCount}
            </span>
          </button>

          {/* Favorites Counter */}
          <button
            type="button"
            onClick={() => handleNav('favorites')}
            aria-label="Danh sách yêu thích"
            className={`relative p-2 rounded-full border transition-colors shrink-0 ${
              activeSection === 'favorites'
                ? 'bg-heritage-burgundy text-white border-heritage-burgundy'
                : 'bg-white border-heritage-gold/40 text-heritage-burgundy hover:bg-heritage-paper'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-heritage-gold text-heritage-ink text-[10px] font-bold flex items-center justify-center">
              {favoritesCount}
            </span>
          </button>

          {/* AI Heritage Assistant Button */}
          <button
            type="button"
            onClick={onOpenAiChat}
            title="Trợ lý AI Hồn Việt Culture"
            className="p-2 rounded-full bg-heritage-paper border border-heritage-gold/40 text-heritage-burgundy hover:bg-heritage-gold/20 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          {/* Account Button */}
          <button
            type="button"
            onClick={() => handleNav('account')}
            title={userFullName ? `Tài khoản: ${userFullName}` : 'Tài khoản cá nhân'}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
              activeSection === 'account'
                ? 'bg-heritage-burgundy text-white border-heritage-burgundy'
                : 'bg-white border-heritage-gold/40 text-heritage-ink hover:bg-heritage-paper'
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
            className="lg:hidden p-2 rounded-full bg-white border border-heritage-gold/40 text-heritage-burgundy hover:bg-heritage-paper shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative ml-auto w-72 max-w-[85vw] bg-heritage-cream h-full shadow-2xl border-l border-heritage-gold/40 p-5 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-heritage-gold/30">
              <span className="font-serif font-bold text-lg text-heritage-burgundy">
                Hồn Việt Culture
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-heritage-muted hover:bg-heritage-paper"
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
                        : 'text-heritage-ink hover:bg-heritage-paper'
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
                    : 'text-heritage-ink hover:bg-heritage-paper'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  Danh sách yêu thích
                </span>
                <span className="px-2 py-0.5 rounded-full bg-heritage-gold text-heritage-ink text-xs font-bold">
                  {favoritesCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('account')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-colors ${
                  activeSection === 'account'
                    ? 'bg-heritage-burgundy text-white'
                    : 'text-heritage-ink hover:bg-heritage-paper'
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

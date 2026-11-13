import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { FestivalsPage } from './pages/FestivalsPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { BlogPage } from './pages/BlogPage';
import { PassportPage } from './pages/PassportPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AccountPage } from './pages/AccountPage';
import { AiHeritageAssistant } from './components/chat/AiHeritageAssistant';
import { storageService } from './services/storageService';
import { supabaseService } from './services/supabaseService';
import {
  Booking,
  FavoriteCategory,
  FavoriteItem,
  NavSection,
  UserProfile,
} from './types';

export function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const [favorites, setFavorites] = useState<FavoriteItem[]>(() =>
    storageService.getFavorites()
  );
  const [unlockedStamps, setUnlockedStamps] = useState<string[]>(() =>
    storageService.getUnlockedStampIds()
  );
  const [bookings, setBookings] = useState<Booking[]>(() =>
    storageService.getBookings()
  );
  const [user, setUser] = useState<UserProfile | null>(() =>
    supabaseService.isEnabled() ? null : storageService.getUser()
  );

  // Sync session & cloud data from Supabase if configured
  useEffect(() => {
    if (!supabaseService.isEnabled()) return;

    supabaseService.getSessionUser().then(async (sessionUser) => {
      if (!sessionUser) return;
      setUser(sessionUser);
      const [cloudFavs, cloudStamps, cloudBookings] = await Promise.all([
        supabaseService.fetchFavorites(sessionUser.id),
        supabaseService.fetchUnlockedStamps(sessionUser.id),
        supabaseService.fetchBookings(sessionUser.id),
      ]);
      setFavorites(cloudFavs);
      setUnlockedStamps(cloudStamps);
      setBookings(cloudBookings);
    });
  }, []);

  const isFavorite = (id: string, category: FavoriteCategory) =>
    favorites.some((f) => f.id === id && f.category === category);

  const handleToggleFavorite = async (id: string, category: FavoriteCategory) => {
    const currentlyFav = isFavorite(id, category);
    setFavorites(storageService.toggleFavorite(id, category));
    if (user && supabaseService.isEnabled()) {
      await supabaseService.toggleFavorite(user.id, id, category, currentlyFav);
    }
  };

  const handleUnlockStamp = async (stampId: string) => {
    setUnlockedStamps(storageService.unlockStamp(stampId));
    if (user && supabaseService.isEnabled()) {
      await supabaseService.unlockStamp(user.id, stampId);
    }
  };

  const handleCreateBooking = async (
    input: Omit<Booking, 'id' | 'status' | 'createdAt'>
  ) => {
    setBookings(storageService.createBooking(input));
    if (user && supabaseService.isEnabled()) {
      await supabaseService.createBooking(user.id, input);
      const refreshed = await supabaseService.fetchBookings(user.id);
      setBookings(refreshed);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    const target = bookings.find((b) => b.id === bookingId);
    if (!target) return 'Không tìm thấy lịch hẹn.';
    const check = storageService.canCancelBooking(target.date);
    if (!check.allowed) {
      return 'Lịch hẹn cận ngày (dưới 5 ngày / 120 giờ) không thể hủy trực tuyến.';
    }

    if (user && supabaseService.isEnabled()) {
      await supabaseService.cancelBooking(user.id, bookingId);
      setBookings(await supabaseService.fetchBookings(user.id));
      return undefined;
    }

    const res = storageService.cancelBooking(bookingId);
    setBookings(res.bookings);
    return res.error;
  };

  const handleAuthSubmit = async (
    mode: 'login' | 'register',
    fullName: string,
    email: string,
    password: string
  ): Promise<{ error?: string; info?: string }> => {
    if (!supabaseService.isEnabled()) {
      const localUser = storageService.loginUser(
        mode === 'register' ? fullName : email.split('@')[0],
        email
      );
      setUser(localUser);
      return {};
    }

    if (mode === 'register') {
      const res = await supabaseService.signUp(fullName, email, password);
      if (res.error) return { error: res.error };
      if (res.needsEmailConfirm) {
        return {
          info: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản rồi đăng nhập.',
        };
      }
      if (res.user) setUser(res.user);
      return {};
    }

    const res = await supabaseService.signIn(email, password);
    if (res.error) return { error: res.error };
    if (res.user) {
      setUser(res.user);
      const [cloudFavs, cloudStamps, cloudBookings] = await Promise.all([
        supabaseService.fetchFavorites(res.user.id),
        supabaseService.fetchUnlockedStamps(res.user.id),
        supabaseService.fetchBookings(res.user.id),
      ]);
      setFavorites(cloudFavs);
      setUnlockedStamps(cloudStamps);
      setBookings(cloudBookings);
    }
    return {};
  };

  const handleLogout = async () => {
    if (supabaseService.isEnabled()) {
      await supabaseService.signOut();
    } else {
      storageService.logoutUser();
    }
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-heritage-cream text-heritage-ink">
      <Header
        activeSection={activeSection}
        onNavigate={setActiveSection}
        favoritesCount={favorites.length}
        unlockedStampsCount={unlockedStamps.length}
        totalStampsCount={10}
        onOpenAiChat={() => setAiChatOpen(true)}
        userFullName={user?.fullName}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'home' && (
          <HomePage
            onNavigate={setActiveSection}
            unlockedCount={unlockedStamps.length}
          />
        )}
        {activeSection === 'explore' && (
          <ExplorePage
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {activeSection === 'festivals' && (
          <FestivalsPage
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {activeSection === 'specialties' && (
          <SpecialtiesPage
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {activeSection === 'workshops' && (
          <WorkshopsPage
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onCreateBooking={handleCreateBooking}
            defaultCustomerName={user?.fullName}
          />
        )}
        {activeSection === 'passport' && (
          <PassportPage
            unlockedIds={unlockedStamps}
            onUnlockStamp={handleUnlockStamp}
            isLoggedIn={Boolean(user)}
            onRequireLogin={() => setActiveSection('account')}
          />
        )}
        {activeSection === 'blog' && <BlogPage />}
        {activeSection === 'favorites' && (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onNavigate={setActiveSection}
          />
        )}
        {activeSection === 'account' && (
          <AccountPage
            user={user}
            bookings={bookings}
            onAuthSubmit={handleAuthSubmit}
            onLogout={handleLogout}
            onCancelBooking={handleCancelBooking}
          />
        )}
      </main>

      <Footer />

      <AiHeritageAssistant
        open={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
        onNavigate={setActiveSection}
      />
    </div>
  );
}

export default App;

import { useState } from 'react';
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
    storageService.getUser()
  );

  const isFavorite = (id: string, category: FavoriteCategory) =>
    favorites.some((f) => f.id === id && f.category === category);

  const handleToggleFavorite = (id: string, category: FavoriteCategory) => {
    setFavorites(storageService.toggleFavorite(id, category));
  };

  const handleUnlockStamp = (stampId: string) => {
    setUnlockedStamps(storageService.unlockStamp(stampId));
  };

  const handleCreateBooking = (
    input: Omit<Booking, 'id' | 'status' | 'createdAt'>
  ) => {
    setBookings(storageService.createBooking(input));
  };

  const handleCancelBooking = (bookingId: string) => {
    const res = storageService.cancelBooking(bookingId);
    setBookings(res.bookings);
    return res.error;
  };

  const handleLogin = (fullName: string, emailOrPhone: string) => {
    setUser(storageService.loginUser(fullName, emailOrPhone));
  };

  const handleLogout = () => {
    storageService.logoutUser();
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
        {activeSection === 'blog' && <BlogPage />}
        {activeSection === 'passport' && (
          <PassportPage
            unlockedIds={unlockedStamps}
            onUnlockStamp={handleUnlockStamp}
            isLoggedIn={Boolean(user)}
            onRequireLogin={() => setActiveSection('account')}
          />
        )}
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
            onLogin={handleLogin}
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

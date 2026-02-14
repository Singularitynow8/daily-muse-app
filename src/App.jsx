import { useState, useEffect } from 'react';
import { Sparkles, Archive, Heart, Bell } from 'lucide-react';
import Today from './pages/Today';
import ArchivePage from './pages/Archive';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
import { useFavorites } from './hooks/useFavorites';
import { useNotifications } from './hooks/useNotifications';

const tabs = [
  { key: 'today', label: 'Today', icon: Sparkles },
  { key: 'archive', label: 'Archive', icon: Archive },
  { key: 'favorites', label: 'Favorites', icon: Heart },
  { key: 'notifications', label: 'Alerts', icon: Bell },
];

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [showToast, setShowToast] = useState(false);

  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  function handleCopied() {
    setShowToast(true);
  }

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo" onClick={() => setActiveTab('today')}>
            <div className="logo-icon">M</div>
            <div className="logo-text">
              Daily <span>Muse</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'today' && (
          <Today
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onCopied={handleCopied}
          />
        )}
        {activeTab === 'archive' && (
          <ArchivePage
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onCopied={handleCopied}
          />
        )}
        {activeTab === 'favorites' && (
          <Favorites
            favorites={favorites}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onCopied={handleCopied}
          />
        )}
        {activeTab === 'notifications' && (
          <Notifications
            notifications={notifications}
            markAsRead={markAsRead}
            markAllRead={markAllRead}
          />
        )}
      </main>

      {/* Bottom Navigation Island */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`bottom-nav-tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <div className="bottom-nav-icon-wrap">
                <Icon size={20} />
                {key === 'notifications' && unreadCount > 0 && (
                  <span className="bottom-nav-badge">{unreadCount}</span>
                )}
              </div>
              <span className="bottom-nav-label">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {showToast && (
        <div className="copied-toast">Copied to clipboard!</div>
      )}
    </div>
  );
}

export default App;

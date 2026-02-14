import { Heart } from 'lucide-react';
import ContentCard from '../components/ContentCard';

export default function Favorites({ favorites, isFavorite, toggleFavorite, onCopied }) {
  if (favorites.length === 0) {
    return (
      <>
        <h2 className="page-title">Favorites</h2>
        <p className="page-subtitle">Your saved collection of inspiration</p>
        <div className="favorites-empty">
          <Heart size={48} />
          <h3>No favorites yet</h3>
          <p>Tap the heart icon on any piece to save it here for later.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="page-title">Favorites</h2>
      <p className="page-subtitle">{favorites.length} saved {favorites.length === 1 ? 'piece' : 'pieces'}</p>

      <div className="content-grid">
        {favorites.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={toggleFavorite}
            onCopied={onCopied}
          />
        ))}
      </div>
    </>
  );
}

import { Heart, ExternalLink, Calendar, Music, Palette, Box, Camera, Quote, Telescope, BookOpen } from 'lucide-react';
import ShareButton from './ShareButton';

const iconMap = {
  music: Music,
  art: Palette,
  sculpture: Box,
  photography: Camera,
  quote: Quote,
  astronomy: Telescope,
  poem: BookOpen,
};

const labelMap = {
  music: 'Classical Music',
  art: 'Art of the Day',
  sculpture: 'Sculpture',
  photography: 'Photography',
  quote: 'The Examined Life',
  astronomy: 'Astronomy Pic',
  poem: 'Poem of the Day',
};

export default function ContentCard({ item, isFavorite, onToggleFavorite, onCopied }) {
  if (!item) return null;

  const Icon = iconMap[item.category] || Palette;
  const label = labelMap[item.category] || item.category;
  const isQuote = item.category === 'quote';
  const isPoem = item.category === 'poem';
  const isMusic = item.category === 'music';

  const creator = item.composer || item.artist || item.poet || item.source || null;
  const yearDisplay = item.year
    ? item.year < 0
      ? `${Math.abs(item.year)} BCE`
      : item.year
    : null;

  return (
    <div className={`content-card ${isQuote ? 'quote-card' : ''}`}>
      <div className="card-category">
        <Icon size={14} />
        {label}
      </div>

      {/* Image - shown for all non-quote cards */}
      {!isQuote ? (
        <div className="card-image-container">
          {item.imageUrl ? (
            <img
              className="card-image"
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="card-image-placeholder" />
          )}
          <div className="card-image-overlay" />
        </div>
      ) : (
        <div className="card-quote-area">
          <div className="quote-text">{item.text}</div>
          <div className="quote-author">&mdash; {item.author}</div>
        </div>
      )}

      <div className="card-body">
        {!isQuote && (
          <>
            <h3 className="card-title">{item.title}</h3>
            {creator && <div className="card-subtitle">{creator}</div>}
            <div className="card-meta">
              {yearDisplay && (
                <span><Calendar size={11} /> {yearDisplay}</span>
              )}
              {item.period && <span>{item.period}</span>}
              {item.medium && <span>{item.medium}</span>}
            </div>

            {/* Poem excerpt */}
            {isPoem && item.excerpt && (
              <div className="poem-excerpt">{item.excerpt}</div>
            )}

            {item.description && (
              <p className="card-description">{item.description}</p>
            )}
          </>
        )}

        {/* Actions */}
        <div className="card-actions">
          <div className="card-actions-left">
            <button
              className={`action-btn favorite ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(item)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>

            {/* Spotify link for music */}
            {isMusic && item.spotifyUrl && (
              <a
                className="action-btn spotify"
                href={item.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </a>
            )}

            {/* About link for non-quote items */}
            {!isQuote && item.aboutUrl && (
              <a
                className="action-btn about-link"
                href={item.aboutUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={14} />
                About
              </a>
            )}
          </div>

          <div className="card-actions-right">
            <ShareButton item={item} onCopied={onCopied} />
          </div>
        </div>
      </div>
    </div>
  );
}

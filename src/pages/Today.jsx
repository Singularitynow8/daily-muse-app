import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from '../components/ContentCard';
import { getDailyContent, formatDate, getDateString } from '../data';

export default function Today({ isFavorite, toggleFavorite, onCopied }) {
  const [currentDate, setCurrentDate] = useState(getDateString());

  const content = getDailyContent(currentDate);

  function navigateDate(delta) {
    const date = new Date(currentDate + 'T12:00:00');
    date.setDate(date.getDate() + delta);
    setCurrentDate(getDateString(date));
  }

  const isToday = currentDate === getDateString();

  return (
    <>
      <div className="date-header">
        <h1>{isToday ? "Today's Collection" : 'Daily Collection'}</h1>
        <p>A curated journey through art, music, and wonder</p>
        <div className="date-nav">
          <button onClick={() => navigateDate(-1)} title="Previous day">
            <ChevronLeft size={18} />
          </button>
          <span>{formatDate(currentDate)}</span>
          <button onClick={() => navigateDate(1)} title="Next day">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="content-grid">
        {/* Music - featured full width */}
        <ContentCard
          item={content.music}
          isFavorite={isFavorite(content.music?.id)}
          onToggleFavorite={toggleFavorite}
          onCopied={onCopied}
          featured
        />

        {/* Art and Sculpture side by side */}
        <ContentCard
          item={content.art}
          isFavorite={isFavorite(content.art?.id)}
          onToggleFavorite={toggleFavorite}
          onCopied={onCopied}
        />
        <ContentCard
          item={content.sculpture}
          isFavorite={isFavorite(content.sculpture?.id)}
          onToggleFavorite={toggleFavorite}
          onCopied={onCopied}
        />

        {/* Photography full width */}
        <ContentCard
          item={content.photography}
          isFavorite={isFavorite(content.photography?.id)}
          onToggleFavorite={toggleFavorite}
          onCopied={onCopied}
          featured
        />

        {/* Quote and Poem side by side */}
        <ContentCard
          item={content.quote}
          isFavorite={isFavorite(content.quote?.id)}
          onToggleFavorite={toggleFavorite}
          onCopied={onCopied}
        />
        <ContentCard
          item={content.poem}
          isFavorite={isFavorite(content.poem?.id)}
          onToggleFavorite={toggleFavorite}
          onCopied={onCopied}
        />

        {/* Astronomy full width */}
        <ContentCard
          item={content.astronomy}
          isFavorite={isFavorite(content.astronomy?.id)}
          onToggleFavorite={toggleFavorite}
          onCopied={onCopied}
          featured
        />
      </div>
    </>
  );
}

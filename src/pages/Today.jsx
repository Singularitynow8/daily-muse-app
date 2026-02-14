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

  const categories = ['music', 'art', 'sculpture', 'architecture', 'photography', 'poem', 'astronomy', 'quote'];

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
        {categories.map((cat) => (
          <ContentCard
            key={cat}
            item={content[cat]}
            isFavorite={isFavorite(content[cat]?.id)}
            onToggleFavorite={toggleFavorite}
            onCopied={onCopied}
          />
        ))}
      </div>
    </>
  );
}

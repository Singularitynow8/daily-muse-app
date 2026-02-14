import { useState } from 'react';
import ContentCard from '../components/ContentCard';
import { getDailyContent, formatDate, getDateString, categories } from '../data';

export default function Archive({ isFavorite, toggleFavorite, onCopied }) {
  const [selectedDate, setSelectedDate] = useState(getDateString());
  const [activeFilter, setActiveFilter] = useState('all');

  const content = getDailyContent(selectedDate);

  const filteredEntries = activeFilter === 'all'
    ? categories.map((c) => ({ ...c, item: content[c.key] }))
    : categories
        .filter((c) => c.key === activeFilter)
        .map((c) => ({ ...c, item: content[c.key] }));

  return (
    <>
      <h2 className="page-title">Archive</h2>
      <p className="page-subtitle">Explore past daily collections by date and category</p>

      <div className="archive-controls">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={getDateString()}
        />
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
        Showing collection for {formatDate(selectedDate)}
      </p>

      <div className="content-grid">
        {filteredEntries.map(({ key, item }) => (
          <ContentCard
            key={key}
            item={item}
            isFavorite={isFavorite(item?.id)}
            onToggleFavorite={toggleFavorite}
            onCopied={onCopied}
          />
        ))}
      </div>
    </>
  );
}

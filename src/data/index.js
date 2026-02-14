import music from './music';
import art from './art';
import sculpture from './sculpture';
import photography from './photography';
import quotes from './quotes';
import astronomy from './astronomy';
import poems from './poems';

export const allContent = {
  music,
  art,
  sculpture,
  photography,
  quote: quotes,
  astronomy,
  poem: poems,
};

export const categories = [
  { key: 'music', label: 'Classical Music', icon: 'Music' },
  { key: 'art', label: 'Art', icon: 'Palette' },
  { key: 'sculpture', label: 'Sculpture', icon: 'Box' },
  { key: 'photography', label: 'Photography', icon: 'Camera' },
  { key: 'quote', label: 'Quote of the Day', icon: 'Quote' },
  { key: 'astronomy', label: 'Astronomy', icon: 'Telescope' },
  { key: 'poem', label: 'Poem of the Day', icon: 'BookOpen' },
];

export function getDailyItem(category, dateStr) {
  const items = allContent[category];
  if (!items || items.length === 0) return null;

  const date = new Date(dateStr || new Date().toISOString().split('T')[0]);
  const dayOfYear = Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % items.length;
  return items[index];
}

export function getDailyContent(dateStr) {
  const result = {};
  for (const cat of categories) {
    result[cat.key] = getDailyItem(cat.key, dateStr);
  }
  return result;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDateString(date = new Date()) {
  return date.toISOString().split('T')[0];
}

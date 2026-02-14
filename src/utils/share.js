export function shareToTwitter(item) {
  const text = getShareText(item);
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
}

export function shareToFacebook(item) {
  const text = getShareText(item);
  const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
}

export function shareViaEmail(item) {
  const subject = item.category === 'quote'
    ? `Daily Muse: Quote by ${item.author}`
    : `Daily Muse: ${item.title}`;
  const body = getShareText(item);
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function copyToClipboard(item) {
  const text = getShareText(item);
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}

function getShareText(item) {
  if (item.category === 'quote') {
    return `"${item.text}" \u2014 ${item.author}\n\nDiscovered on Daily Muse`;
  }

  const parts = [`"${item.title}"`];

  if (item.composer) parts.push(`by ${item.composer}`);
  else if (item.artist) parts.push(`by ${item.artist}`);
  else if (item.architect) parts.push(`by ${item.architect}`);
  else if (item.poet) parts.push(`by ${item.poet}`);
  else if (item.author) parts.push(`\u2014 ${item.author}`);
  else if (item.source) parts.push(`by ${item.source}`);

  if (item.description) {
    const desc = item.description.length > 120
      ? item.description.substring(0, 117) + '...'
      : item.description;
    parts.push(`\n\n${desc}`);
  }

  parts.push('\n\nDiscovered on Daily Muse');

  return parts.join(' ');
}

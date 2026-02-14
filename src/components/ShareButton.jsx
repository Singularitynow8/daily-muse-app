import { useState, useRef, useEffect } from 'react';
import { Share2, Twitter, Facebook, Mail, Link2 } from 'lucide-react';
import { shareToTwitter, shareToFacebook, shareViaEmail, copyToClipboard } from '../utils/share';

export default function ShareButton({ item, onCopied }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  async function handleCopy() {
    await copyToClipboard(item);
    setOpen(false);
    onCopied?.();
  }

  return (
    <div className="share-container" ref={menuRef}>
      <button
        className="action-btn"
        onClick={() => setOpen(!open)}
        title="Share"
      >
        <Share2 size={14} />
        Share
      </button>
      {open && (
        <div className="share-menu">
          <button onClick={() => { shareToTwitter(item); setOpen(false); }}>
            <Twitter size={14} /> Twitter / X
          </button>
          <button onClick={() => { shareToFacebook(item); setOpen(false); }}>
            <Facebook size={14} /> Facebook
          </button>
          <button onClick={() => { shareViaEmail(item); setOpen(false); }}>
            <Mail size={14} /> Email
          </button>
          <div className="divider" />
          <button onClick={handleCopy}>
            <Link2 size={14} /> Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

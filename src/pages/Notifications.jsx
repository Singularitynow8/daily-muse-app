import { Bell, Info, Lightbulb } from 'lucide-react';

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const typeIcons = {
  info: Info,
  tip: Lightbulb,
};

export default function Notifications({ notifications, markAsRead, markAllRead }) {
  if (notifications.length === 0) {
    return (
      <>
        <h2 className="page-title">Notifications</h2>
        <p className="page-subtitle">Stay updated with new content and tips</p>
        <div className="notifications-empty">
          <Bell size={48} />
          <h3>All caught up</h3>
          <p>No notifications at the moment. Check back later for updates.</p>
        </div>
      </>
    );
  }

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <>
      <div className="notifications-header">
        <div>
          <h2 className="page-title">Notifications</h2>
          <p className="page-subtitle" style={{ marginBottom: 0 }}>
            {notifications.filter((n) => !n.read).length} unread
          </p>
        </div>
        {hasUnread && (
          <button onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      <div className="notification-list">
        {notifications.map((notif) => {
          const Icon = typeIcons[notif.type] || Bell;
          return (
            <div
              key={notif.id}
              className={`notification-item ${!notif.read ? 'unread' : ''}`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="notification-icon">
                <Icon size={18} />
              </div>
              <div className="notification-body">
                <div className="notification-title">{notif.title}</div>
                <div className="notification-message">{notif.message}</div>
                <div className="notification-time">{timeAgo(notif.timestamp)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

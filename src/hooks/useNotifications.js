import { useState, useCallback } from 'react';

const STORAGE_KEY = 'dailymuse_notifications';

function loadNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultNotifications();
  } catch {
    return getDefaultNotifications();
  }
}

function getDefaultNotifications() {
  return [
    {
      id: 'notif-welcome',
      title: 'Welcome to Daily Muse!',
      message: 'Explore today\'s curated collection of art, music, poetry, and more. Tap the heart icon to save your favorites.',
      timestamp: new Date().toISOString(),
      read: false,
      type: 'info',
    },
    {
      id: 'notif-tip-1',
      title: 'Tip: Browse the Archive',
      message: 'Use the Archive tab to explore past daily collections. Every day brings a new selection across all categories.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      type: 'tip',
    },
    {
      id: 'notif-tip-2',
      title: 'Tip: Share with Friends',
      message: 'Found something inspiring? Use the share button on any card to send it to friends via Twitter, Facebook, or email.',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
      type: 'tip',
    },
  ];
}

function saveNotifications(notifications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
}

export function useNotifications() {
  const [notifications, setNotifications] = useState(loadNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveNotifications(next);
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      saveNotifications(next);
      return next;
    });
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    saveNotifications([]);
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => {
      const next = [
        {
          ...notification,
          id: `notif-${Date.now()}`,
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ];
      saveNotifications(next);
      return next;
    });
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllRead,
    clearNotifications,
    addNotification,
  };
}

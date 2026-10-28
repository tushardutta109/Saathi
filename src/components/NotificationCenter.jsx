import React, { useState } from 'react';

export function NotificationCenter({ 
  notifications, 
  setNotifications, 
  isOpen, 
  setIsOpen,
  onAddTestNotification,
  t 
}) {
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleDeleteOne = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'urgent') return n.type === 'emergency' || n.type === 'medicine';
    return true;
  });

  return (
    <div className="notification-wrapper" style={{ position: 'relative' }}>
      {/* Notification Bell Button */}
      <button 
        className="notification-bell-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications - ${unreadCount} unread`}
        title={t.notificationsTitle || 'Notifications'}
        style={{
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid #1e293b',
          color: '#94a3b8',
          width: '34px',
          height: '34px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          transition: 'all 0.2s ease'
        }}
      >
        <span style={{ fontSize: '15px' }}>🔔</span>
        {unreadCount > 0 && (
          <span 
            className="notification-badge-count"
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: '800',
              minWidth: '16px',
              height: '16px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 2px',
              border: '2px solid #080e1a'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop overlay for closing on click outside */}
          <div 
            className="notification-backdrop"
            onClick={() => setIsOpen(false)}
          />

          <div className="notification-dropdown-card animate-fadeIn">
            {/* Header */}
            <div className="notification-header-row">
              <div className="notification-title-group">
                <h3>🔔 {t.notificationsTitle || 'Notifications'}</h3>
                {unreadCount > 0 && (
                  <span className="unread-pill-tag">
                    {unreadCount} {t.unreadTag || 'new'}
                  </span>
                )}
              </div>
              <button 
                className="close-dropdown-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✖
              </button>
            </div>

            {/* Filter Chips & Actions Bar */}
            <div className="notification-controls-bar">
              <div className="notification-tabs">
                <button 
                  className={`notif-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  {t.notifFilterAll || 'All'} ({notifications.length})
                </button>
                <button 
                  className={`notif-tab ${filter === 'unread' ? 'active' : ''}`}
                  onClick={() => setFilter('unread')}
                >
                  {t.notifFilterUnread || 'Unread'} ({unreadCount})
                </button>
              </div>

              <div className="notification-actions-group">
                {unreadCount > 0 && (
                  <button 
                    className="notif-action-btn"
                    onClick={handleMarkAllRead}
                  >
                    ✓ {t.notifMarkAllRead || 'Mark Read'}
                  </button>
                )}
                {notifications.length > 0 && (
                  <button 
                    className="notif-action-btn danger"
                    onClick={handleClearAll}
                  >
                    🗑️ {t.notifClearAll || 'Clear'}
                  </button>
                )}
              </div>
            </div>

            {/* Quick Test Alert Creator */}
            <button 
              className="btn-test-notif"
              onClick={onAddTestNotification}
            >
              ⚡ {t.btnTestNotification || 'Send Demo Notification'}
            </button>

            {/* Notifications List */}
            <div className="notification-list-body">
              {filteredNotifications.length === 0 ? (
                <div className="empty-notif-state">
                  <span style={{ fontSize: '42px' }}>🔕</span>
                  <p>{t.noNotifications || 'No notifications right now.'}</p>
                </div>
              ) : (
                filteredNotifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`notif-item-card ${notif.read ? 'read' : 'unread'}`}
                    onClick={() => handleMarkAsRead(notif.id)}
                  >
                    <div className="notif-icon-bubble">
                      {notif.icon || '📌'}
                    </div>

                    <div className="notif-content-area">
                      <div className="notif-title-line">
                        <span className="notif-item-title">{notif.title}</span>
                        <span className="notif-time">{notif.time}</span>
                      </div>
                      <p className="notif-item-message">{notif.message}</p>
                    </div>

                    <button 
                      className="notif-delete-btn"
                      onClick={(e) => handleDeleteOne(notif.id, e)}
                      title="Delete notification"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationCenter;

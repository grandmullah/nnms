import React from 'react';

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

const NotificationPage: React.FC = () => {
  const notifications: Notification[] = [
    {
      id: 1,
      message: 'Your lab results are ready!',
      timestamp: '2022-05-01T10:00:00.000Z',
    },
    {
      id: 2,
      message: 'You have a new message from your doctor.',
      timestamp: '2022-04-30T12:30:00.000Z',
    },
    {
      id: 3,
      message: 'Your next appointment is on May 15th at 2pm.',
      timestamp: '2022-04-28T15:20:00.000Z',
    },
  ];

  return (
    <div style={{ backgroundColor: '#F8F9FA', padding: '1rem' }}>
      <h1 style={{ color: '#343A40', textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>Notifications</h1>
      {notifications.map(notification => (
        <div key={notification.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '5px', padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{notification.message}</p>
          <p style={{ fontSize: '0.8rem', color: '#6C757D' }}>{notification.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;

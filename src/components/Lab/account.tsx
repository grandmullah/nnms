import React from 'react';

interface Props {
  name: string;
  email: string;
  phone: string;
}

export const AccountSettings: React.FC<Props> = ({ name, email, phone }) => {
  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Account Settings</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form style={{ width: '50%' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold' }}>Name:</label>
            <input id="name" type="text" value={name} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold' }}>Email:</label>
            <input id="email" type="email" value={email} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="phone" style={{ display: 'block', fontWeight: 'bold' }}>Phone:</label>
            <input id="phone" type="tel" value={phone} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <button style={{ padding: '0.5rem 1rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;

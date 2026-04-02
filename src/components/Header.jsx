import React from 'react';
import { Sun, Moon, Bell, User, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { theme, toggleTheme, role, toggleRole } = useAppContext();

  return (
    <header className="top-header glass-header">
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Welcome back, track your finances.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={toggleRole}
          className="btn btn-secondary"
          style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '20px' }}
          title="Toggle Role Demo"
        >
          <Shield size={16} />
          {role === 'admin' ? 'Admin View' : 'Viewer View'}
        </button>
        
        <button className="btn-icon" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button className="btn-icon">
          <Bell size={20} />
        </button>

        <div style={{ 
          width: '40px', height: '40px', borderRadius: '50%', 
          background: 'var(--accent-primary)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', color: 'white',
          marginLeft: '8px', cursor: 'pointer'
        }}>
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;

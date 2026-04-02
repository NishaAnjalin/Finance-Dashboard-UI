import React from 'react';
import { PieChart, List, Lightbulb, LogOut, Wallet } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <PieChart size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <List size={20} /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb size={20} /> },
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', color: 'var(--accent-primary)' }}>
        <Wallet size={32} />
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>FinDash</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              background: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent',
              transition: 'all 0.2s ease',
              fontWeight: activeTab === tab.id ? '600' : '500',
              textAlign: 'left'
            }}
          >
            <span style={{ color: activeTab === tab.id ? 'white' : 'inherit' }}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

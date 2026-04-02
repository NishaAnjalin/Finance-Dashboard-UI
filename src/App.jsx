import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import { Menu, X } from 'lucide-react';

const DashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return <Overview />;
      case 'transactions': return <Transactions />;
      case 'insights': return <Insights />;
      default: return <Overview />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Sidebar Toggle Area */}
      <div 
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} onClick={() => setIsSidebarOpen(false)} />
      )}

      <main className="main-content">
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-primary)' }}>
          <button 
            className="btn-icon" 
            style={{ display: 'none', marginLeft: '16px', marginTop: '16px', zIndex: 100 }} 
            onClick={() => setIsSidebarOpen(true)}
            id="mobile-menu-btn"
          >
            <Menu size={24} />
          </button>
        </div>
        <Header />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
      
      <style>{`
        @media (max-width: 768px) {
          #mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
};

export default App;

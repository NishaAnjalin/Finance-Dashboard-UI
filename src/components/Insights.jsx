import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Insights = () => {
  const { transactions } = useAppContext();

  // Compute insights
  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');

  const categories = {};
  expenses.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
  });

  const topCategory = Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b, 'None');
  const totalExpense = expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalIncome = incomes.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0;
  
  // Basic Mock Observation based on Savings Rate
  let observation = '';
  if (savingsRate > 20) {
    observation = "Great job! You're saving more than 20% of your income. Keep up the good work.";
  } else if (savingsRate > 0) {
    observation = "You have a positive cash flow, but there might be room to reduce expenses in non-essential categories.";
  } else {
    observation = "Warning: Your expenses exceed your income. Review your top spending categories to find cutbacks.";
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="card glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: savingsRate > 20 ? 'var(--success-bg)' : savingsRate > 0 ? 'var(--warning-bg)' : 'var(--danger-bg)' }}>
        <div style={{ color: savingsRate > 20 ? 'var(--success)' : savingsRate > 0 ? 'var(--warning)' : 'var(--danger)', marginTop: '4px' }}>
          {savingsRate > 0 ? <Award size={24} /> : <AlertCircle size={24} />}
        </div>
        <div>
          <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>Financial Health Observation</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {observation}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        <div className="card glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'var(--danger-bg)', color: 'var(--danger)', width: '36px', height: '36px' }}>
              <TrendingDown size={20} />
            </div>
            <h3 style={{ fontSize: '16px' }}>Highest Spend Category</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Your largest cash outflow was on</p>
          <h2 style={{ fontSize: '24px', color: 'var(--accent-primary)' }}>{topCategory}</h2>
          {categories[topCategory] && (
            <p style={{ marginTop: '8px', fontWeight: '500' }}>${categories[topCategory].toFixed(2)} total</p>
          )}
        </div>

        <div className="card glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'var(--success-bg)', color: 'var(--success)', width: '36px', height: '36px' }}>
              <TrendingUp size={20} />
            </div>
            <h3 style={{ fontSize: '16px' }}>Savings Rate</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Percentage of income saved</p>
          <h2 style={{ fontSize: '24px', color: savingsRate > 0 ? 'var(--success)' : 'var(--danger)' }}>
            {savingsRate}%
          </h2>
          <div style={{ height: '8px', background: 'var(--bg-hover)', borderRadius: '4px', marginTop: '16px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, savingsRate))}%`, background: 'var(--success)', borderRadius: '4px' }}></div>
          </div>
        </div>
        
        <div className="card glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', width: '36px', height: '36px' }}>
              <AlertCircle size={20} />
            </div>
            <h3 style={{ fontSize: '16px' }}>Monthly Comparison</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Compared to last month, your spending is down by <strong>12%</strong> and your income is up by <strong>5%</strong>.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>*Mock comparison based on synthetic historical data.</p>
        </div>

      </div>

    </div>
  );
};

export default Insights;

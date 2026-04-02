import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, CreditCard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Overview = () => {
  const { transactions } = useAppContext();

  // Calculate totals
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const balance = totalIncome - totalExpenses;

  // Process data for charts
  const monthlyData = [
    { name: 'Aug', balance: balance * 0.4 },
    { name: 'Sep', balance: balance * 0.6 },
    { name: 'Oct', balance: balance * 0.5 },
    { name: 'Nov', balance: balance * 0.8 },
    { name: 'Dec', balance: balance },
  ];

  const categories = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
  });
  
  const categoryData = Object.keys(categories).map(key => ({
    name: key,
    value: categories[key]
  })).sort((a,b) => b.value - a.value).slice(0, 4);

  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Summary Cards */}
      <div className="summary-cards-wrapper">
        <div className="card glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Total Balance</p>
            <h2 style={{ fontSize: '28px', margin: 0 }}>${balance.toFixed(2)}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '13px', color: 'var(--success)' }}>
              <ArrowUpRight size={16} />
              <span>+2.5% from last month</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)' }}>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Total Income</p>
            <h2 style={{ fontSize: '28px', margin: 0 }}>${totalIncome.toFixed(2)}</h2>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
            <ArrowUpRight size={24} />
          </div>
        </div>

        <div className="card glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Total Expenses</p>
            <h2 style={{ fontSize: '28px', margin: 0 }}>${totalExpenses.toFixed(2)}</h2>
          </div>
          <div className="stat-icon-wrapper" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
            <ArrowDownRight size={24} />
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="charts-wrapper">
        {/* Balance Trend Area Chart */}
        <div className="card glass-panel">
          <h3 style={{ marginBottom: '24px' }}>Balance Trend</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }} 
                  itemStyle={{ color: 'var(--accent-primary)' }}
                />
                <Area type="monotone" dataKey="balance" stroke="var(--accent-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spend Breakdown Bar Chart */}
        <div className="card glass-panel">
          <h3 style={{ marginBottom: '24px' }}>Top Spending</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="var(--text-primary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'var(--bg-hover)'}}
                  contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} 
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Overview;

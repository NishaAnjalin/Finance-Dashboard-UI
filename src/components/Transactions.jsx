import React, { useState } from 'react';
import { Search, Plus, Filter, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Transactions = () => {
  const { transactions, role, deleteTransaction, addTransaction } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, amount-desc, amount-asc
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New transaction form state
  const [newTx, setNewTx] = useState({ description: '', amount: '', type: 'expense', category: 'Food', date: new Date().toISOString().split('T')[0] });

  // Filtering & Sorting
  let filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  filteredTransactions.sort((a, b) => {
    if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount-desc') return b.amount - a.amount;
    if (sortBy === 'amount-asc') return a.amount - b.amount;
    return 0;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount) return;
    addTransaction({
      ...newTx,
      amount: parseFloat(newTx.amount)
    });
    setIsModalOpen(false);
    setNewTx({ description: '', amount: '', type: 'expense', category: 'Food', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="card glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', paddingLeft: '40px' }}
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>

        {role === 'admin' && (
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            Add Transaction
          </button>
        )}
      </div>

      <div className="card glass-panel data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              {role === 'admin' && <th style={{ textAlign: 'right', width: '80px' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{t.description}</td>
                  <td>{t.category}</td>
                  <td>
                    <span className={`badge ${t.type === 'income' ? 'badge-success' : 'badge-danger'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: '600', color: t.type === 'income' ? 'var(--success)' : 'var(--text-primary)' }}>
                    {t.type === 'income' ? '+' : '-'}${parseFloat(t.amount).toFixed(2)}
                  </td>
                  {role === 'admin' && (
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon" onClick={() => deleteTransaction(t.id)} style={{ color: 'var(--danger)' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content card glass-panel" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px' }}>Add Transaction</h2>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input required type="text" className="form-control" value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} placeholder="e.g. Groceries" />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Amount</label>
                  <input required type="number" step="0.01" className="form-control" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} placeholder="0.00" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Date</label>
                  <input required type="date" className="form-control" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} />
                </div>
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Type</label>
                  <select className="form-control" value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value})}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">Category</label>
                  <input required type="text" className="form-control" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} placeholder="e.g. Food" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;

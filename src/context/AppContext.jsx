import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const initialTransactions = [
  { id: '1', date: '2023-11-28', amount: 3500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2023-11-29', amount: 85.50, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '3', date: '2023-11-30', amount: 120.00, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: '4', date: '2023-12-01', amount: 45.00, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: '5', date: '2023-12-05', amount: 1500, category: 'Freelance', type: 'income', description: 'Web Project' },
  { id: '6', date: '2023-12-08', amount: 60.00, category: 'Transport', type: 'expense', description: 'Uber' },
  { id: '7', date: '2023-12-12', amount: 200.00, category: 'Shopping', type: 'expense', description: 'New Shoes' },
  { id: '8', date: '2023-12-15', amount: 15.00, category: 'Food', type: 'expense', description: 'Coffee' },
  { id: '9', date: '2023-12-20', amount: 1200, category: 'Investment', type: 'income', description: 'Dividend' },
  { id: '10', date: '2023-12-25', amount: 300.00, category: 'Shopping', type: 'expense', description: 'Christmas Gifts' },
];

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [role, setRole] = useState('viewer'); // 'viewer' or 'admin'
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) return JSON.parse(saved);
    return initialTransactions;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addTransaction = (t) => {
    setTransactions([{...t, id: Date.now().toString()}, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const toggleRole = () => {
    setRole(prev => prev === 'viewer' ? 'admin' : 'viewer');
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      role, setRole, toggleRole,
      transactions, addTransaction, deleteTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
};

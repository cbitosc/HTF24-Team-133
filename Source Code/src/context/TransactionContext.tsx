import React, { createContext, useContext, useState, useCallback } from 'react';
import { subDays } from 'date-fns';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  getFilteredTransactions: (filter: 'all' | '7days' | '30days') => Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: new Date(),
    description: 'Salary',
    amount: 5000,
    type: 'income',
    category: 'Salary'
  },
  {
    id: '2',
    date: subDays(new Date(), 2),
    description: 'Groceries',
    amount: 150,
    type: 'expense',
    category: 'Food'
  },
  // Add more dummy transactions here
];

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(DUMMY_TRANSACTIONS);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTransactions(prev => [...prev, newTransaction]);
  }, []);

  const getFilteredTransactions = useCallback((filter: 'all' | '7days' | '30days') => {
    const now = new Date();
    switch (filter) {
      case '7days':
        return transactions.filter(t => 
          t.date >= subDays(now, 7)
        );
      case '30days':
        return transactions.filter(t => 
          t.date >= subDays(now, 30)
        );
      default:
        return transactions;
    }
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      addTransaction,
      getFilteredTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
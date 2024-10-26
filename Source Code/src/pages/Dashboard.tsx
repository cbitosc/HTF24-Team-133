import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  PiggyBank
} from 'lucide-react';

const Dashboard = () => {
  const { transactions } = useTransactions();

  const totalBalance = transactions.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Mohammed Sufiyan</h1>
        <p className="text-gray-600">Here's your financial overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Total Balance</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">${totalBalance.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Total Income</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">${totalIncome.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Total Expenses</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">${totalExpenses.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-400">Savings Rate</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{savingsRate}%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.slice(0, 5).map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date.toLocaleDateString()}</p>
                </div>
                <span className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Tips</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Savings Opportunity</h4>
              <p className="text-blue-600">Based on your spending patterns, you could save an additional $200 by reducing dining out expenses.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Investment Tip</h4>
              <p className="text-green-600">Consider investing your surplus in a diversified portfolio to grow your wealth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
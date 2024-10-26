import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const Analytics = () => {
  const { transactions } = useTransactions();

  const chartData = transactions
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(transaction => ({
      date: format(transaction.date, 'MMM dd'),
      amount: transaction.type === 'income' ? transaction.amount : -transaction.amount
    }));

  const categories = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Financial Analytics</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Cash Flow Trend</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3B82F6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h2>
          <div className="space-y-4">
            {Object.entries(categories).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-gray-600">{category}</span>
                <span className="font-semibold text-gray-800">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Insights</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Spending Pattern</h3>
              <p className="text-blue-600">Your highest spending category is {
                Object.entries(categories).reduce((a, b) => a[1] > b[1] ? a : b)[0]
              }</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Savings Potential</h3>
              <p className="text-green-600">You could increase your savings by optimizing your spending in top categories.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
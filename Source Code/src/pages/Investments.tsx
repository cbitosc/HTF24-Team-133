import React from 'react';
import { TrendingUp, DollarSign, PieChart, ArrowUpRight } from 'lucide-react';

const Investments = () => {
  const portfolioData = {
    totalValue: 25000,
    returns: 12.5,
    allocation: [
      { name: 'Stocks', value: 60, return: 15.2 },
      { name: 'Bonds', value: 25, return: 5.8 },
      { name: 'Cash', value: 10, return: 1.2 },
      { name: 'Crypto', value: 5, return: 45.3 }
    ]
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Investment Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Portfolio Value</p>
          <h3 className="text-2xl font-bold text-gray-800">${portfolioData.totalValue.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Returns</p>
          <h3 className="text-2xl font-bold text-green-600">+{portfolioData.returns}%</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">Asset Classes</p>
          <h3 className="text-2xl font-bold text-gray-800">{portfolioData.allocation.length}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Asset Allocation</h2>
          <div className="space-y-4">
            {portfolioData.allocation.map((asset) => (
              <div key={asset.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${asset.value}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{asset.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{asset.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance by Asset</h2>
          <div className="space-y-4">
            {portfolioData.allocation.map((asset) => (
              <div key={asset.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <ArrowUpRight className={`h-5 w-5 ${
                    asset.return > 0 ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <span className="ml-2 text-gray-800">{asset.name}</span>
                </div>
                <span className={`font-semibold ${
                  asset.return > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {asset.return > 0 ? '+' : ''}{asset.return}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Investment Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Portfolio Rebalancing</h3>
            <p className="text-blue-600">Consider rebalancing your portfolio to maintain your target asset allocation.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Diversification Opportunity</h3>
            <p className="text-green-600">Adding international stocks could improve portfolio diversification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
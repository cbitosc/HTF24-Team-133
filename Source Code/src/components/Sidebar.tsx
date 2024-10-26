import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  BarChart2, 
  TrendingUp, 
  Settings,
  Wallet
} from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: "/", icon: LayoutDashboard, text: "Dashboard" },
    { to: "/transactions", icon: Receipt, text: "Transactions" },
    { to: "/analytics", icon: BarChart2, text: "Analytics" },
    { to: "/investments", icon: TrendingUp, text: "Investments" },
    { to: "/settings", icon: Settings, text: "Settings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-4 py-6">
      <div className="flex items-center mb-8 px-2">
        <Wallet className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold text-gray-800">FinanceHub</span>
      </div>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.text}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <link.icon className="h-5 w-5" />
            <span className="ml-3 font-medium">{link.text}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
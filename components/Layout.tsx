import React from 'react';
import { PageTab } from '../types';
import { Database, Activity, BarChart2, TrendingUp, DollarSign } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  customerName, 
  setCustomerName 
}) => {
  const tabs = [
    { id: PageTab.EXECUTIVE, icon: Activity },
    { id: PageTab.SEQUENTIAL, icon: Database },
    { id: PageTab.CONCURRENCY, icon: BarChart2 },
    { id: PageTab.SOAK, icon: TrendingUp },
    { id: PageTab.COST, icon: DollarSign },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-page text-gray-800 font-sans">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-subtle">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-brand-600">e6data</span> POC Metrics
              </h1>
              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                <span className="bg-bg-muted px-2 py-0.5 rounded font-medium text-gray-600 border border-gray-200">
                  {customerName} – POC – US-East
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cta-600 animate-pulse"></span>
                  Concurrent Execution
                </span>
                <span>Updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end">
               <label className="text-[10px] uppercase font-bold text-gray-400">Customer</label>
               <select 
                className="text-sm font-medium bg-transparent border-none outline-none text-right cursor-pointer hover:text-brand-600 transition-colors"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
               >
                 <option>Acme Retail</option>
                 <option>Freshworks</option>
                 <option>Cisco</option>
                 <option>Condé Nast</option>
               </select>
             </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 flex gap-6 overflow-x-auto border-t border-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 py-3 border-b-2 text-sm font-medium transition-colors whitespace-nowrap
                  ${isActive 
                    ? 'border-brand-600 text-brand-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'}
                `}
              >
                <Icon size={16} />
                {tab.id}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
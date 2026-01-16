import React, { useState } from 'react';
import Layout from './components/Layout';
import ExecutiveScorecard from './pages/ExecutiveScorecard';
import SequentialRuns from './pages/SequentialRuns';
import ConcurrencyScale from './pages/ConcurrencyScale';
import SoakRuns from './pages/SoakRuns';
import CostAnalysis from './pages/CostAnalysis';
import { PageTab } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<PageTab>(PageTab.EXECUTIVE);
  const [customerName, setCustomerName] = useState('Acme Retail');

  const renderContent = () => {
    switch (activeTab) {
      case PageTab.EXECUTIVE:
        return <ExecutiveScorecard customerName={customerName} />;
      case PageTab.SEQUENTIAL:
        return <SequentialRuns customerName={customerName} />;
      case PageTab.CONCURRENCY:
        return <ConcurrencyScale customerName={customerName} />;
      case PageTab.SOAK:
        return <SoakRuns customerName={customerName} />;
      case PageTab.COST:
        return <CostAnalysis />;
      default:
        return <ExecutiveScorecard customerName={customerName} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
      customerName={customerName}
      setCustomerName={setCustomerName}
    >
      <div className="animate-fadeIn">
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;
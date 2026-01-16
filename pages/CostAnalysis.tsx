import React from 'react';
import { Card } from '../components/ui/Card';
import { Construction } from 'lucide-react';

const CostAnalysis: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
      <div className="p-8 bg-gray-100 rounded-full border border-gray-200">
        <Construction size={48} className="text-gray-400" />
      </div>
      <div className="text-center space-y-2 max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800">Cost Analysis Under Construction</h2>
        <p className="text-gray-500 leading-relaxed">
          This module will feature detailed ROI calculations, resource utilization efficiency metrics, and dollar-for-dollar comparisons between e6data and the baseline engine.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-3xl px-4">
         <Card className="text-center py-8 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-3">Projected Savings</h3>
            <p className="text-4xl font-bold text-semantic-success tracking-tight">~40%</p>
         </Card>
         <Card className="text-center py-8 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-3">Break Even</h3>
            <p className="text-4xl font-bold text-gray-700 tracking-tight">3 Mos</p>
         </Card>
         <Card className="text-center py-8 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-3">TCO Reduction</h3>
            <p className="text-4xl font-bold text-brand-600 tracking-tight">$150k<span className="text-lg text-gray-400 font-medium">/yr</span></p>
         </Card>
      </div>
    </div>
  );
};

export default CostAnalysis;
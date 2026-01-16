import React from 'react';

interface KPITileProps {
  label: string;
  value: string | number;
  comparisonValue?: string | number;
  comparisonLabel?: string;
  trend?: 'better' | 'worse' | 'neutral';
  highlight?: boolean;
}

export const KPITile: React.FC<KPITileProps> = ({ 
  label, 
  value, 
  comparisonValue, 
  comparisonLabel = 'Baseline', 
  trend,
  highlight = false
}) => {
  const getTrendColor = () => {
    if (trend === 'better') return 'text-semantic-success';
    if (trend === 'worse') return 'text-semantic-error';
    return 'text-gray-500';
  };

  return (
    <div className={`rounded-lg border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
      highlight 
        ? 'border-brand-600/20 bg-brand-600/5 hover:bg-brand-600/10' 
        : 'border-gray-200 bg-white hover:border-brand-300'
    }`}>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">{label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className={`text-3xl font-bold ${highlight ? 'text-brand-700' : 'text-gray-900'}`}>{value}</h4>
      </div>
      
      {comparisonValue !== undefined && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-400 font-medium">{comparisonLabel}</span>
          <span className={`font-bold ${getTrendColor()}`}>
            {comparisonValue}
          </span>
        </div>
      )}
    </div>
  );
};
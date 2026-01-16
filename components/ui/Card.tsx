import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children, className = '', action }) => {
  return (
    <div className={`bg-bg-card rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-hover hover:border-brand-300 hover:-translate-y-1 overflow-hidden flex flex-col ${className}`}>
      {(title || action) && (
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            {title && <h3 className="text-[17px] font-semibold text-gray-800 tracking-tight leading-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-500 mt-1.5 font-medium">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6 flex-1">
        {children}
      </div>
    </div>
  );
};
import React from 'react';
import { formatCurrency } from '../utils/calculator';

interface DetailRowProps {
  label: string;
  value: number;
  isNegative?: boolean;
  highlight?: boolean;
  subText?: string;
  indentLevel?: number;
}

export const DetailRow: React.FC<DetailRowProps> = ({ 
  label, 
  value, 
  isNegative, 
  highlight, 
  subText,
  indentLevel = 0
}) => {
  return (
    <div className={`flex justify-between items-center py-3 border-b border-gray-100 last:border-0 ${highlight ? 'bg-blue-50 px-2 -mx-2 rounded' : ''}`}>
      <div className="flex flex-col" style={{ paddingLeft: `${indentLevel * 16}px` }}>
        <span className={`${highlight ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
          {label}
        </span>
        {subText && <span className="text-xs text-gray-500">{subText}</span>}
      </div>
      <span className={`font-mono font-medium ${isNegative ? 'text-red-600' : highlight ? 'text-blue-700' : 'text-gray-900'}`}>
        {isNegative ? '-' : ''}{formatCurrency(value)}
      </span>
    </div>
  );
};
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TaxResult } from '../types';
import { formatCurrency } from '../utils/calculator';

interface ChartsProps {
  result: TaxResult;
}

const COLORS = ['#22c55e', '#ef4444', '#f59e0b']; // Net (Green), Tax (Red), Insurance (Orange)

export const SalaryPieChart: React.FC<ChartsProps> = ({ result }) => {
  const data = [
    { name: 'Thực nhận (Net)', value: result.netSalary },
    { name: 'Thuế TNCN', value: result.taxAmount },
    { name: 'Bảo hiểm', value: result.totalInsurance },
  ].filter(item => item.value > 0);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  className?: string;
  suffix?: string;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  className = "",
  suffix,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (rawValue === '') {
      onChange(0);
      return;
    }
    const num = parseInt(rawValue, 10);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  // Format display value with commas
  const displayValue = value === 0 ? '' : new Intl.NumberFormat('en-US').format(value);

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all
            ${disabled ? 'bg-gray-100 text-gray-500 border-gray-200' : 'border-gray-300 bg-white text-gray-900'}
          `}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default NumberInput;
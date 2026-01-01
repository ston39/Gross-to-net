import { TaxBracket, TaxPolicy, Region } from './types';

// Rates (Employee side) - Assumed constant
export const SOCIAL_INSURANCE_RATE = 0.08;
export const HEALTH_INSURANCE_RATE = 0.015;
export const UNEMPLOYMENT_INSURANCE_RATE = 0.01;

// Current Progressive Tax Brackets (7 Levels)
export const TAX_BRACKETS_CURRENT: TaxBracket[] = [
  { min: 0, max: 5000000, rate: 0.05, deduction: 0 },
  { min: 5000000, max: 10000000, rate: 0.10, deduction: 250000 },
  { min: 10000000, max: 18000000, rate: 0.15, deduction: 750000 },
  { min: 18000000, max: 32000000, rate: 0.20, deduction: 1650000 },
  { min: 32000000, max: 52000000, rate: 0.25, deduction: 3250000 },
  { min: 52000000, max: 80000000, rate: 0.30, deduction: 5850000 },
  { min: 80000000, max: null, rate: 0.35, deduction: 9850000 },
];

// New Tax Brackets effective July 1, 2026 (5 Levels)
export const TAX_BRACKETS_JULY_2026: TaxBracket[] = [
  { min: 0, max: 10000000, rate: 0.05, deduction: 0 },
  { min: 10000000, max: 30000000, rate: 0.10, deduction: 500000 },
  { min: 30000000, max: 60000000, rate: 0.20, deduction: 3500000 },
  { min: 60000000, max: 100000000, rate: 0.30, deduction: 9500000 },
  { min: 100000000, max: null, rate: 0.35, deduction: 14500000 },
];

// Reference for the new Decree 293/2025/ND-CP values
export const REGIONAL_MIN_2026 = {
  [Region.I]: 5310000,
  [Region.II]: 4730000,
  [Region.III]: 4140000,
  [Region.IV]: 3700000,
};

export const REGIONAL_MIN_HOURLY_2026 = {
  [Region.I]: 25500,
  [Region.II]: 22700,
  [Region.III]: 20000,
  [Region.IV]: 17800,
};

export const POLICIES: TaxPolicy[] = [
  {
    id: 'current',
    name: 'Hiện tại',
    baseSalary: 2340000,
    personalDeduction: 11000000,
    dependentDeduction: 4400000,
    regionalMinSalary: {
      [Region.I]: 4960000,
      [Region.II]: 4410000,
      [Region.III]: 3860000,
      [Region.IV]: 3250000,
    },
    taxBrackets: TAX_BRACKETS_CURRENT
  },
  {
    id: 'jan_2026',
    name: 'Từ 01/01/2026',
    subLabel: '(Lương vùng & GT mới)',
    baseSalary: 2340000, 
    personalDeduction: 15500000, 
    dependentDeduction: 6200000, 
    regionalMinSalary: REGIONAL_MIN_2026,
    taxBrackets: TAX_BRACKETS_CURRENT
  },
  {
    id: 'jul_2026',
    name: 'Từ 01/07/2026',
    subLabel: '(Đầy đủ thay đổi)',
    baseSalary: 2340000,
    personalDeduction: 15500000,
    dependentDeduction: 6200000,
    regionalMinSalary: REGIONAL_MIN_2026,
    taxBrackets: TAX_BRACKETS_JULY_2026
  }
];
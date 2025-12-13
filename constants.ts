import { TaxBracket, TaxPolicy, Region } from './types';

// Rates (Employee side) - Assumed constant
export const SOCIAL_INSURANCE_RATE = 0.08;
export const HEALTH_INSURANCE_RATE = 0.015;
export const UNEMPLOYMENT_INSURANCE_RATE = 0.01;

export const LUNCH_ALLOWANCE_EXEMPTION = 730000;

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
// Level 1: Up to 10M -> 5%
// Level 2: 10-30M -> 10% (Quick deduction: 0.5M)
// Level 3: 30-60M -> 20% (Quick deduction: 3.5M)
// Level 4: 60-100M -> 30% (Quick deduction: 9.5M)
// Level 5: >100M -> 35% (Quick deduction: 14.5M)
export const TAX_BRACKETS_JULY_2026: TaxBracket[] = [
  { min: 0, max: 10000000, rate: 0.05, deduction: 0 },
  { min: 10000000, max: 30000000, rate: 0.10, deduction: 500000 },
  { min: 30000000, max: 60000000, rate: 0.20, deduction: 3500000 },
  { min: 60000000, max: 100000000, rate: 0.30, deduction: 9500000 },
  { min: 100000000, max: null, rate: 0.35, deduction: 14500000 },
];

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
    subLabel: '(Giảm trừ mới)',
    baseSalary: 2340000, 
    personalDeduction: 15500000, 
    dependentDeduction: 6200000, 
    regionalMinSalary: {
      [Region.I]: 4960000,
      [Region.II]: 4410000,
      [Region.III]: 3860000,
      [Region.IV]: 3250000,
    },
    taxBrackets: TAX_BRACKETS_CURRENT // Old brackets until July
  },
  {
    id: 'jul_2026',
    name: 'Từ 01/07/2026',
    subLabel: '(Biểu thuế mới)',
    baseSalary: 2340000, // Note in image implies 2.34M base (46.8M limit)
    personalDeduction: 15500000,
    dependentDeduction: 6200000,
    regionalMinSalary: {
      [Region.I]: 4960000,
      [Region.II]: 4410000,
      [Region.III]: 3860000,
      [Region.IV]: 3250000,
    },
    taxBrackets: TAX_BRACKETS_JULY_2026 // New 5-level brackets
  }
];
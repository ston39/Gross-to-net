import {
  SOCIAL_INSURANCE_RATE,
  HEALTH_INSURANCE_RATE,
  UNEMPLOYMENT_INSURANCE_RATE,
  TAX_BRACKETS_CURRENT
} from '../constants';
import { TaxInput, TaxResult, InsuranceMode, TaxPolicy } from '../types';

export const calculateSalary = (input: TaxInput, policy: TaxPolicy): TaxResult => {
  const { grossSalary, otherNonTaxableAllowance, insuranceMode, insuranceSalary, dependents, region } = input;
  const { baseSalary, personalDeduction, dependentDeduction, regionalMinSalary, taxBrackets } = policy;

  // Use brackets from policy, fallback to current global default
  const activeBrackets = taxBrackets || TAX_BRACKETS_CURRENT;

  // 1. Determine Insurance Base
  // We assume 'grossSalary' is the base for insurance unless 'insuranceMode' is fixed.
  let baseSalaryForInsurance = grossSalary;
  
  if (insuranceMode === InsuranceMode.FIXED_AMOUNT) {
    baseSalaryForInsurance = insuranceSalary;
  }

  // Calculate specific bases subject to caps
  // BHXH & BHYT Cap: 20 * Base Salary
  const maxSocialBase = 20 * baseSalary;
  const socialHealthBase = Math.min(baseSalaryForInsurance, maxSocialBase);
  
  // BHTN Cap: 20 * Regional Minimum Salary
  const unemploymentCap = 20 * regionalMinSalary[region];
  const unemploymentBase = Math.min(baseSalaryForInsurance, unemploymentCap);

  // 2. Calculate Insurance Amounts
  const socialInsurance = socialHealthBase * SOCIAL_INSURANCE_RATE;
  const healthInsurance = socialHealthBase * HEALTH_INSURANCE_RATE;
  const unemploymentInsurance = unemploymentBase * UNEMPLOYMENT_INSURANCE_RATE;
  
  const totalInsurance = socialInsurance + healthInsurance + unemploymentInsurance;

  // 3. Calculate Assessable Income (Thu nhập chịu thuế)
  // Formula: Gross - Insurance
  // Other Non-Taxable Allowance is excluded here entirely.
  const assessableIncome = grossSalary - totalInsurance;

  // 4. Calculate Taxable Income (Thu nhập tính thuế)
  // Formula: Assessable - Deductions
  const totalDependentDeduction = dependents * dependentDeduction;
  const taxableIncome = Math.max(0, assessableIncome - personalDeduction - totalDependentDeduction);

  // 5. Calculate Tax
  let taxAmount = 0;
  if (taxableIncome > 0) {
    // Find applicable bracket or loop through
    const bracket = activeBrackets.find(b => 
      (b.max === null && taxableIncome > b.min) || 
      (b.max !== null && taxableIncome > b.min && taxableIncome <= b.max)
    );

    if (bracket) {
      taxAmount = (taxableIncome * bracket.rate) - bracket.deduction;
    }
  }

  // 6. Net Salary
  // Net = Gross + OtherNonTaxable - Insurance - Tax
  const netSalary = grossSalary + otherNonTaxableAllowance - totalInsurance - taxAmount;

  return {
    policyId: policy.id,
    grossSalary,
    otherNonTaxableAllowance,
    insuranceSalaryBase: baseSalaryForInsurance,
    socialInsurance,
    healthInsurance,
    unemploymentInsurance,
    totalInsurance,
    assessableIncome,
    personalDeduction,
    dependentDeduction: totalDependentDeduction,
    taxableIncome,
    taxAmount,
    netSalary
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);
};

export const parseNumber = (value: string): number => {
  return parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
};
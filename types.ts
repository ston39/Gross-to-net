export enum InsuranceMode {
  ON_GROSS = 'ON_GROSS', // Đóng trên lương chính thức (có trần)
  FIXED_AMOUNT = 'FIXED_AMOUNT' // Đóng trên số tiền cố định
}

export enum Region {
  I = 1,
  II = 2,
  III = 3,
  IV = 4
}

export interface TaxInput {
  grossSalary: number;
  otherNonTaxableAllowance: number; // For other exempt allowances
  insuranceMode: InsuranceMode;
  insuranceSalary: number; // Only used if mode is FIXED_AMOUNT
  dependents: number;
  region: Region;
}

export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  deduction: number; // Quick deduction amount
}

export interface TaxPolicy {
  id: string;
  name: string;
  subLabel?: string;
  baseSalary: number; // Lương cơ sở
  personalDeduction: number; // Giảm trừ bản thân
  dependentDeduction: number; // Giảm trừ người phụ thuộc
  regionalMinSalary: Record<Region, number>; // Lương tối thiểu vùng
  taxBrackets?: TaxBracket[]; // Optional custom brackets for this policy
}

export interface TaxResult {
  policyId: string;
  grossSalary: number;
  otherNonTaxableAllowance: number;
  insuranceSalaryBase: number; // The actual base used for calc
  socialInsurance: number; // BHXH (8%)
  healthInsurance: number; // BHYT (1.5%)
  unemploymentInsurance: number; // BHTN (1%)
  totalInsurance: number;
  assessableIncome: number; // Thu nhập chịu thuế (Gross - Insurance)
  personalDeduction: number;
  dependentDeduction: number;
  taxableIncome: number; // Thu nhập tính thuế (Assessable - Deductions)
  taxAmount: number;
  netSalary: number;
}
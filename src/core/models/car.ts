// Arquivo temporário, acho q a service q vai definir esse type
export type TCar = {
  license: string;
  brand: string;
  model: string;
  year: number;
};

export enum StatusCarEnum {
  'WaitingBudget' = 1,
  'WaitingBudgetApproval' = 2,
  'ApprovedBudget' = 3,
  'BudgetRejected' = 4,
  'RunningService' = 5,
}

export type TStatusCar = keyof typeof StatusCarEnum;

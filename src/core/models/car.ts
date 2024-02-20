export type TCar = {
  license: string;
  manufacturer: string;
  model: string;
  year: number;
};

export type TStatusCar =
  | 'WaitingBudget'
  | 'WaitingBudgetApproval'
  | 'ApprovedBudget'
  | 'BudgetRejected'
  | 'RunningService';

export enum StatusCarEnum {
  'WaitingBudget' = 1,
  'WaitingBudgetApproval' = 2,
  'ApprovedBudget' = 3,
  'BudgetRejected' = 4,
  'RunningService' = 5,
  'Finished' = 6,
}

export type TStatusCar = keyof typeof StatusCarEnum;

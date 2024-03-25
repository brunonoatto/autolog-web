export enum BudgetStatusEnum {
  'MakingBudget' = 1,
  'WaitingBudgetApproval' = 2,
  'ApprovedBudget' = 3,
  'BudgetRejected' = 4,
  'RunningService' = 5,
  'CarReady' = 6,
  'Finished' = 7,
}

export type TBudgetStatus = keyof typeof BudgetStatusEnum;

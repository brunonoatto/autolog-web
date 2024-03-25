import { BudgetStatusEnum } from '@shared/types/budgetStatus';

export const getStatusCarDescription = (status: BudgetStatusEnum): string => {
  const values = {
    [BudgetStatusEnum.MakingBudget]: 'Realizando orçamento',
    [BudgetStatusEnum.WaitingBudgetApproval]: 'Aguardando aprovação',
    [BudgetStatusEnum.ApprovedBudget]: 'Orçamento aprovado',
    [BudgetStatusEnum.BudgetRejected]: 'Orçamento rejeitado',
    [BudgetStatusEnum.RunningService]: 'Serviço em execução',
    [BudgetStatusEnum.CarReady]: 'Veículo pronto',
    [BudgetStatusEnum.Finished]: 'Serviço Finalizado',
  };

  return values[status];
};

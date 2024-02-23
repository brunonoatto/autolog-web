import { StatusCarEnum } from '@core/models/car';

export const getStatusCarDescription = (status: StatusCarEnum): string => {
  const values = {
    [StatusCarEnum.WaitingBudget]: 'Realizando orçamento',
    [StatusCarEnum.WaitingBudgetApproval]: 'Aguardando aprovação',
    [StatusCarEnum.ApprovedBudget]: 'Orçamento aprovado',
    [StatusCarEnum.BudgetRejected]: 'Orçamento rejeitado',
    [StatusCarEnum.RunningService]: 'Serviço em execução',
  };

  return values[status];
};

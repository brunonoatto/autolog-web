import { ServiceApi } from '@core/api';

export default function useSendWhatApp() {
  const getWhatsAppLink = async (budgetId: string) => {
    const data = await ServiceApi.BudgetApi.getWhatsLink(budgetId);
    const { link } = data;

    return link;
  };

  const sendWhatsApp = async (budgetId: string) => {
    const link = await getWhatsAppLink(budgetId);

    link && window.open(link, '_blank')?.focus();
  };

  return { sendWhatsApp };
}

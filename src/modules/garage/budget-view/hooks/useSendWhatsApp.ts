import { ServiceApi } from '@core/api';

export default function useSendWhatApp() {
  const getWhatsAppLink = async (os: string) => {
    const data = await ServiceApi.BudgetApi.getWhatsLink(os);
    const { link } = data;

    return link;
  };

  const sendWhatsApp = async (os: string) => {
    const link = await getWhatsAppLink(os);

    link && window.open(link, '_blank')?.focus();
  };

  return { sendWhatsApp };
}

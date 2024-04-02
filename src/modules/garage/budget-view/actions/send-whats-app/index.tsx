import { ServiceApi } from '@core/api';
import type { TBudgetActionParams } from '@modules/garage/budget-view/actions/types';
import IconButton from '@shared/design-system/icon-button';

export default function SendWhatsApp({ os }: TBudgetActionParams) {
  const handleSendWhatsApp = async () => {
    // TODO: pensar em um local compartilhado para guardar essa ação
    const { data } = await ServiceApi.BudgetApi.getWhatsLink(os);
    const { link } = data;

    link && window.open(link, '_blank')?.focus();
  };

  return (
    <IconButton icon="WhatsAppIcon" color="secondary" onClick={handleSendWhatsApp}>
      Enviar Whats App
    </IconButton>
  );
}

import { ServiceApi } from '@core/api';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import IconButton from '@shared/design-system/icon-button';

export default function SendWhatsApp() {
  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleSendWhatsApp = async () => {
    // TODO: pensar em um local compartilhado para guardar essa ação
    const { data } = await ServiceApi.BudgetApi.getWhatsLink(os);
    const { link } = data;

    link && window.open(link, '_blank')?.focus();
  };

  return (
    <IconButton icon="WhatsAppIcon" onClick={handleSendWhatsApp}>
      Enviar Whats App
    </IconButton>
  );
}

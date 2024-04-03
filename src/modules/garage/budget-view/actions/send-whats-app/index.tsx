import { ServiceApi } from '@core/api';
import useGarageBudgetView from '@core/store/context/hooks/useGarageBudgetViewContext';
import IconButton from '@shared/design-system/icon-button';

export default function SendWhatsApp() {
  const { budget } = useGarageBudgetView();
  const { os = '' } = budget || {};

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

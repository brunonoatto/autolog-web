import useBudgetView from '@core/store/context/BudgetViewContext/useBudgetViewContext';
import useSendWhatApp from '@modules/garage/budget-view/hooks/useSendWhatsApp';
import { Button } from '@shared/design-system/ui/button';

export default function SendWhatsApp() {
  const { sendWhatsApp } = useSendWhatApp();
  const { budget } = useBudgetView();
  const { id = '' } = budget || {};

  const handleSendWhatsApp = async () => {
    await sendWhatsApp(id);
  };

  return (
    <Button icon="message-circle-more" onClick={handleSendWhatsApp}>
      Enviar Whats App
    </Button>
  );
}

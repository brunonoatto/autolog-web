import { MessageCircleMore } from 'lucide-react';

import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import useSendWhatApp from '@modules/garage/budget-view/hooks/useSendWhatsApp';
import { Button } from '@shared/design-system/ui/button';

export default function SendWhatsApp() {
  const { sendWhatsApp } = useSendWhatApp();
  const { budget } = useBudgetViewContext();
  const { id = '' } = budget || {};

  const handleSendWhatsApp = async () => {
    await sendWhatsApp(id);
  };

  return (
    <Button icon={MessageCircleMore} onClick={handleSendWhatsApp}>
      Enviar Whats App
    </Button>
  );
}

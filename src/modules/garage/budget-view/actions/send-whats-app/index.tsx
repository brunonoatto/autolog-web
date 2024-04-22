import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import useSendWhatApp from '@modules/garage/budget-view/hooks/useSendWhatsApp';
import IconButton from '@shared/design-system/ui/icon-button';

export default function SendWhatsApp() {
  const { sendWhatsApp } = useSendWhatApp();
  const { budget } = useBudgetView();
  const { os = '' } = budget || {};

  const handleSendWhatsApp = async () => {
    await sendWhatsApp(os);
  };

  return (
    <IconButton icon="message-circle-more" onClick={handleSendWhatsApp}>
      Enviar Whats App
    </IconButton>
  );
}

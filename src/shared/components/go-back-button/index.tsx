import { Button } from '@shared/design-system/ui/button';
import useNavigateApp from '@shared/hooks/useNavigateApp';

const GoBackButton = () => {
  const navigate = useNavigateApp();

  const handleGoBack = () => {
    navigate(-1);
  };

  return <Button onClick={handleGoBack}>Voltar</Button>;
};

export default GoBackButton;

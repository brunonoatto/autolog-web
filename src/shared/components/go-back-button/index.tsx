import { Button } from '@shared/design-system/ui/button';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

const GoBackButton = () => {
  const navigate = useNavigateCustom();

  const handleGoBack = () => {
    navigate(-1);
  };

  return <Button onClick={handleGoBack}>Voltar</Button>;
};

export default GoBackButton;

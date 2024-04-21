import { useNavigate } from 'react-router-dom';

import Button from '@shared/design-system_old/button';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return <Button onClick={handleGoBack}>Voltar</Button>;
};

export default GoBackButton;

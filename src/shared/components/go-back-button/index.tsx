import { useNavigate } from 'react-router-dom';

import Button from '../button';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleGoBack} className="mt-8">
      Voltar
    </Button>
  );
};

export default GoBackButton;

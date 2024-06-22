import { MouseEventHandler } from 'react';

import ClientInfo, { TClientInfoProps } from '@shared/components/client-info';
import ContainerTitle from '@shared/components/container-title';
import { Button } from '@shared/design-system/ui/button';

type TClientCardProps = TClientInfoProps & {
  isSelected: boolean;
  onClearClick: () => void;
};

export default function ClientCard({
  cpfCnpj,
  name,
  phone,
  isSelected,
  onClearClick,
}: TClientCardProps) {
  const handleClearSelectedCar: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    onClearClick();
  };

  return (
    <ContainerTitle title="Veículo selecionado" showTitle={isSelected}>
      <ClientInfo
        className="px-2 text-wrap"
        key={cpfCnpj}
        cpfCnpj={cpfCnpj}
        name={name}
        phone={phone}
      />

      {isSelected && (
        <Button
          className="block"
          type="button"
          variant={'link'}
          size="sm"
          onClick={handleClearSelectedCar}
        >
          Remover seleção
        </Button>
      )}
    </ContainerTitle>
  );
}

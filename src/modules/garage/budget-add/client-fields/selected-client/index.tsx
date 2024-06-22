import { useFormContext } from 'react-hook-form';

import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import ClientInfo from '@shared/components/client-info';
import ContainerTitle from '@shared/components/container-title';
import { Button } from '@shared/design-system/ui/button';

export function SelectedClient() {
  const handleClearSelectedClient = useBudgetAddContext((prop) => prop.handleClearSelectedClient);
  const { getValues } = useFormContext<TBudgetAddFormType>();

  const [cpfCnpj, name, phone] = getValues(['client.cpfCnpj', 'client.name', 'client.phone']);

  const handleChangeClientClick = () => {
    handleClearSelectedClient();
  };

  return (
    <ContainerTitle title="Cliente selecionado">
      <ClientInfo cpfCnpj={cpfCnpj} name={name} phone={phone} />

      <Button size="sm" variant="link" onClick={handleChangeClientClick}>
        Remover seleção
      </Button>
    </ContainerTitle>
  );
}

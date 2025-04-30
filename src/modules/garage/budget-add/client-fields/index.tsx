import { ArrowRight, User } from 'lucide-react';
import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import { TBudgetAddFormType } from '@core/store/context/types/budget-add';
import { SelectedClient } from '@modules/garage/budget-add/client-fields/selected-client';
import { SELECT_CAR_BUDGET_ADD_BUTTON_TESTID } from '@modules/garage/budget-add/const';
import FormField from '@shared/components/form/form-field';
import CpfCnpjInput from '@shared/components/inputs/cpf-cnpj-input';
import LoadingIcon from '@shared/components/loading-icon';
import { Button } from '@shared/design-system/ui/button';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';
import MaskInput from '@shared/design-system/ui/input-mask';
import MasksEnum from '@shared/helpers/string/masks';

export function ClientData() {
  const allowSelectCar = useBudgetAddContext((prop) => prop.allowSelectCar);
  const isLoadingClient = useBudgetAddContext((prop) => prop.isLoadingClient);
  const handleClearSelectedClient = useBudgetAddContext((prop) => prop.handleClearSelectedClient);
  const handleLoadClient = useBudgetAddContext((prop) => prop.handleLoadClient);
  const setAllowSelectCar = useBudgetAddContext((prop) => prop.setAllowSelectCar);

  const { control, watch, trigger } = useFormContext<TBudgetAddFormType>();

  const selectedClientId = watch('client.id');

  const handleLoadClientDebounce = useDebouncedCallback(handleLoadClient, 300);

  const handleCpfChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (selectedClientId) {
      handleClearSelectedClient();
    }

    handleLoadClientDebounce(event.target.value);
  };

  const handleClick = async () => {
    const isValid = await trigger('client', {
      shouldFocus: true,
    });

    if (isValid) {
      setAllowSelectCar(true);
    }
  };

  return (
    <>
      <CardTitle className="col-span-full" icon={User} size="lg">
        Dados do Cliente
      </CardTitle>

      {allowSelectCar && <SelectedClient />}

      {!allowSelectCar && (
        <>
          <div className="flex items-start gap-2">
            <FormField
              className="flex-1"
              control={control}
              name="client.cpfCnpj"
              label="CPF/CNPJ"
              isMask
            >
              <CpfCnpjInput
                onChange={handleCpfChange}
                placeholder="Informe o CPF/CNPJ do Cliente"
              />
            </FormField>

            {/* TODO: pensar numa forma de mandar o isLoading para o FielField */}
            {isLoadingClient && <LoadingIcon className="mt-10" />}
          </div>

          <FormField
            className="lg:row-start-3 md:col-span-2"
            control={control}
            name="client.name"
            label="Nome Cliente"
          >
            <Input disabled={!!selectedClientId} placeholder="Informe o nome do Cliente" />
          </FormField>

          <FormField
            className="lg:row-start-3"
            control={control}
            name="client.phone"
            label="Telefone"
          >
            <MaskInput
              mask={MasksEnum.phone}
              disabled={!!selectedClientId}
              placeholder="Informe o telefone do Cliente"
            />
          </FormField>

          <div className="col-span-full justify-self-end">
            <Button
              data-testid={SELECT_CAR_BUDGET_ADD_BUTTON_TESTID}
              secondIcon={ArrowRight}
              onClick={handleClick}
            >
              Selecionar Veículo
            </Button>
          </div>
        </>
      )}
    </>
  );
}

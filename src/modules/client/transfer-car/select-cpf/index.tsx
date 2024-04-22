import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { ServiceApi } from '@core/api';
import { TClientResponse } from '@core/api/client/types';
import { TTransferCarForm } from '@modules/client/transfer-car';
import ContainerSelected from '@shared/components/container-selected';
import FormField from '@shared/components/form/form-field';
import LoadingIcon from '@shared/components/loading-icon';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';

type TSelectCpfToTransferProps = {
  clientData?: TClientResponse;
  setClient: React.Dispatch<React.SetStateAction<TClientResponse | undefined>>;
};

export default function SelectCpfToTransfer({ clientData, setClient }: TSelectCpfToTransferProps) {
  const [cpfIsLoading, setCpfIsLoading] = useState(false);

  const { control } = useFormContext<TTransferCarForm>();

  const handleGetClient = async (cpf: string) => {
    setCpfIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { data: clientData } = await ServiceApi.ClientApi.get({ cpf });
      setClient(clientData);
    } finally {
      setCpfIsLoading(false);
    }
  };

  const debounce = useDebouncedCallback(handleGetClient, 500);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setClient(undefined);

    if (value?.length >= 11) debounce(value);
  };

  return (
    <>
      <CardTitle size="lg">Selecione para quem você quer transferir</CardTitle>
      <div className="space-y-4 md:space-y-0 md:flex gap-4">
        <FormField control={control} name="cpfToTransfer" label="CPF">
          <Input className="md:w-40" onChange={handleCpfChange} />
        </FormField>

        {cpfIsLoading && <LoadingIcon />}
        {clientData && !cpfIsLoading && (
          <ContainerSelected title="Nome do Usuário Selecionado">
            <p>Nome: {clientData?.name}</p>
          </ContainerSelected>
        )}
      </div>
    </>
  );
}

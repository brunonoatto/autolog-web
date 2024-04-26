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

  const handleGetClient = async (cpf_cnpj: string) => {
    if (cpf_cnpj.length !== 11 && cpf_cnpj.length !== 14) return;

    setCpfIsLoading(true);

    try {
      const clientData = await ServiceApi.ClientApi.get({
        cpf_cnpj,
      });

      setClient(clientData);
    } finally {
      setCpfIsLoading(false);
    }
  };

  const getClientDebounce = useDebouncedCallback(handleGetClient, 300);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (clientData) setClient(undefined);

    getClientDebounce(e.target.value);
  };

  return (
    <>
      <CardTitle size="lg">Selecione para quem você quer transferir</CardTitle>
      <div className="flex items-start gap-2">
        <FormField control={control} name="cpfOrCnpjToTransfer" label="CPF/CNPJ">
          <Input
            className="w-64"
            onChange={handleCpfChange}
            maxLength={14}
            placeholder="Informe o CPF/CNPJ do destinatário"
          />
        </FormField>

        {cpfIsLoading && <LoadingIcon className="mt-10" />}
      </div>

      {clientData && !cpfIsLoading && (
        <ContainerSelected title="Usuário Selecionado" align="center">
          {clientData?.name}
        </ContainerSelected>
      )}
    </>
  );
}

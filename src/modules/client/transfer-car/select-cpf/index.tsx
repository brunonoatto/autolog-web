import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { ServiceApi } from '@core/api';
import { TClientResponse } from '@core/api/client/types';
import { TTransferCarForm } from '@modules/client/transfer-car';
import ContainerTitle from '@shared/components/container-title';
import FormField from '@shared/components/form/form-field';
import CpfCnpjInput from '@shared/components/inputs/cpf-cnpj-input';
import LoadingIcon from '@shared/components/loading-icon';
import { CardTitle } from '@shared/design-system/ui/card';

type TSelectCpfToTransferProps = {
  clientData?: TClientResponse;
  setClient: React.Dispatch<React.SetStateAction<TClientResponse | undefined>>;
};

export default function SelectCpfToTransfer({ clientData, setClient }: TSelectCpfToTransferProps) {
  const [cpfIsLoading, setCpfIsLoading] = useState(false);

  const { control, setError, clearErrors } = useFormContext<TTransferCarForm>();

  const handleGetClient = async (cpfCnpj: string) => {
    if (cpfCnpj.length !== 11 && cpfCnpj.length !== 14) return;

    setCpfIsLoading(true);

    try {
      const clientData = await ServiceApi.ClientApi.get({
        cpfCnpj,
      });

      setClient(clientData);
      clearErrors('cpfOrCnpjToTransfer');
    } catch {
      setClient(undefined);
      setError('cpfOrCnpjToTransfer', { message: 'CPF não cadastrado' });
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
      <div className="flex flex-col md:flex-row gap-2">
        <div className="flex items-start gap-2">
          <FormField control={control} name="cpfOrCnpjToTransfer" label="CPF/CNPJ" isMask>
            <CpfCnpjInput
              onChange={handleCpfChange}
              placeholder="Informe o CPF/CNPJ do destinatário"
            />
          </FormField>

          {cpfIsLoading && <LoadingIcon className="mt-10" />}
        </div>

        {clientData && !cpfIsLoading && (
          <ContainerTitle className="flex-1" title="Usuário Selecionado" align="center">
            {clientData?.name}
          </ContainerTitle>
        )}
      </div>
    </>
  );
}

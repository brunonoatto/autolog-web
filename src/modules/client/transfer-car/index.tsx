import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { TCar } from '@core/api/car/types';
import { TClientResponse } from '@core/api/client/types';
import { useTransferCar } from '@core/service/car';
import { useClientCars } from '@core/service/client';
import { useLoadingStore } from '@core/store/hooks';
import SelectCarToTransfer from '@modules/client/transfer-car/select-car';
import SelectCpfToTransfer from '@modules/client/transfer-car/select-cpf';
import CarInfo from '@shared/components/car-info';
import Form from '@shared/components/form';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import LinkButton from '@shared/design-system/ui/link-button';
import Modal from '@shared/design-system/ui/modal';
import { useToast } from '@shared/design-system/ui/use-toast';
import { zodValidators } from '@shared/form-validations';
import useNavigateApp from '@shared/hooks/useNavigateApp';

const transferCarSchema = z
  .object({
    license: zodValidators.String({ requiredMessage: 'Selecione um veículo' }),
    cpfOrCnpjToTransfer: zodValidators.CpfOrCnpj(),
  })
  .strict();

export type TTransferCarForm = z.infer<typeof transferCarSchema>;

export default function ClientTransferCar() {
  const [openModal, setOpenModal] = useState(false);
  const [clientToTrasnferData, setClientToTrasnferData] = useState<TClientResponse>();

  const { toast } = useToast();
  const navigate = useNavigateApp();
  const loading = useLoadingStore((prop) => prop.loading);
  const { data: clientCars } = useClientCars();
  const { mutate } = useTransferCar();

  const form = useForm<TTransferCarForm>({
    mode: 'onSubmit',
    resolver: zodResolver(transferCarSchema),
  });
  const { watch, setError, getValues } = form;

  const licenseSelected = watch('license');

  const selectedCar = useMemo(
    () => clientCars?.find((c) => c.license === licenseSelected),
    [clientCars, licenseSelected],
  );

  const handleTrasnferCar = () => {
    loading(true);

    const formValues = getValues();

    mutate(formValues, {
      onSuccess: () => {
        toast({ title: 'Transferência realizada com sucesso' });
        navigate('/cliente');
      },
      onSettled: () => {
        loading(false);
      },
    });
  };

  const handleValid = () => {
    if (!clientToTrasnferData) {
      setError('cpfOrCnpjToTransfer', { message: 'Insira um cpf que esteja cadastrado' });
      return;
    }

    setOpenModal(true);
  };

  if (!clientCars?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle icon="folder-input">Transferência de veículo</CardTitle>
        </CardHeader>

        <CardContent>
          <Alert>
            <AlertTitle>Nehum veículo encontrado para para transferir.</AlertTitle>
            <AlertDescription>
              <LinkButton icon="car" to="/cliente/cadastrar-veiculo">
                Cadastrar seu veículo
              </LinkButton>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Form
        form={form}
        title="Transferência de veículo"
        icon="folder-input"
        confirmButtonText="Continuar"
        onValid={handleValid}
        useDefaultGrid={false}
      >
        <SelectCarToTransfer />

        <SelectCpfToTransfer
          clientData={clientToTrasnferData}
          setClient={setClientToTrasnferData}
        />
      </Form>

      <Modal
        open={openModal}
        title="Confirmação dos dados da Transferência de Veículo"
        confirmText="Transferir"
        onConfirmClick={handleTrasnferCar}
        onCancelClick={() => setOpenModal(false)}
      >
        <div className="inline md:flex justify-evenly space-y-4 md:space-y-0">
          <Card>
            <CardHeader>
              <CardTitle>Automóvel:</CardTitle>
            </CardHeader>

            <CardContent>
              <CarInfo {...(selectedCar as TCar)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transferir para:</CardTitle>
            </CardHeader>

            <CardContent>
              <div>CPF: {clientToTrasnferData?.cpf_cnpj}</div>
              <div>Nome: {clientToTrasnferData?.name}</div>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
}

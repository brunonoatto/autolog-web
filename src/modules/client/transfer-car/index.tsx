import {} from 'module';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { TCar } from '@core/api/car/types';
import { TClientResponse } from '@core/api/client/types';
import { ROUTES_PATH } from '@core/router/consts';
import { useTransferCar } from '@core/service/car';
import { useClientCars } from '@core/service/client';
import { useLoadingStore } from '@core/store/hooks';
import SelectCarToTransfer from '@modules/client/transfer-car/select-car';
import SelectCpfToTransfer from '@modules/client/transfer-car/select-cpf';
import CarInfo from '@shared/components/car-info';
import Form from '@shared/components/form';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/design-system/ui/card';
import Modal from '@shared/design-system/ui/modal';
import { useToast } from '@shared/design-system/ui/use-toast';
import { yup, yupValidators } from '@shared/form-validations';

const transferCarSchema = yup
  .object({
    license: yupValidators.StringValidator().required('Selecione um veículo'),
    cpfToTransfer: yupValidators.CpfValidator().required(),
  })
  .strict();

export type TTransferCarForm = yup.InferType<typeof transferCarSchema>;

export default function ClientTransferCar() {
  const [openModal, setOpenModal] = useState(false);
  const [clientToTrasnferData, setClientToTrasnferData] = useState<TClientResponse>();

  const { toast } = useToast();
  const navigate = useNavigate();
  const loading = useLoadingStore((prop) => prop.loading);
  const { data: clientCars } = useClientCars();
  const { mutate } = useTransferCar();

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(transferCarSchema),
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
        navigate(ROUTES_PATH.clientBudgetSearch);
      },
      onSettled: () => {
        loading(false);
      },
    });
  };

  const handleValid = () => {
    if (!clientToTrasnferData) {
      setError('cpfToTransfer', { message: 'Insira um cpf que esteja cadastrado.' });
      return;
    }

    setOpenModal(true);
  };

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
              <div>CPF: {clientToTrasnferData?.cpf}</div>
              <div>Nome: {clientToTrasnferData?.name}</div>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
}

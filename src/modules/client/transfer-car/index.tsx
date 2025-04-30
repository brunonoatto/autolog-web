import { zodResolver } from '@hookform/resolvers/zod';
import { Car, FolderCheck, FolderInput } from 'lucide-react';
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
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

const transferCarSchema = z
  .object({
    carId: zodValidators.String({ requiredMessage: 'Selecione um veículo' }),
    cpfOrCnpjToTransfer: zodValidators.CpfOrCnpj(),
  })
  .strict();

export type TTransferCarForm = z.infer<typeof transferCarSchema>;

export default function ClientTransferCar() {
  const [openModal, setOpenModal] = useState(false);
  const [clientToTrasnferData, setClientToTrasnferData] = useState<TClientResponse>();

  const { toast } = useToast();
  const navigate = useNavigateCustom();
  const loading = useLoadingStore((prop) => prop.loading);
  const { cars } = useClientCars();
  const { mutate } = useTransferCar();

  const form = useForm<TTransferCarForm>({
    mode: 'onSubmit',
    resolver: zodResolver(transferCarSchema),
  });
  const { watch, setError, getValues } = form;

  const selectedCarId = watch('carId');

  const selectedCar = useMemo(
    () => cars.find((c) => c.id === selectedCarId),
    [cars, selectedCarId],
  );

  const handleTrasnferCar = () => {
    if (!clientToTrasnferData) {
      return;
    }

    loading(true);

    const formValues = getValues();

    mutate(
      {
        carId: formValues.carId,
        clientIdToTransfer: clientToTrasnferData.id,
      },
      {
        onSuccess: () => {
          toast.success('Transferência realizada com sucesso');
          navigate('/cliente');
        },
        onSettled: () => {
          loading(false);
        },
      },
    );
  };

  const handleValid = () => {
    if (!clientToTrasnferData) {
      setError('cpfOrCnpjToTransfer', { message: 'Insira um cpf que esteja cadastrado' });
      return;
    }

    setOpenModal(true);
  };

  if (!cars.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle icon={FolderInput}>Transferência de veículo</CardTitle>
        </CardHeader>

        <CardContent>
          <Alert>
            <AlertTitle>Nehum veículo encontrado para para transferir.</AlertTitle>

            <AlertDescription>
              <LinkButton icon={Car} to="/cliente/cadastrar-veiculo">
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
        icon={FolderInput}
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
        icon={FolderCheck}
        confirmText="Transferir"
        onConfirmClick={handleTrasnferCar}
        onCancelClick={() => setOpenModal(false)}
      >
        <div className="inline md:grid grid-cols-2 space-y-4 md:space-y-0">
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
              <div>CPF: {clientToTrasnferData?.cpfCnpj}</div>
              <div>Nome: {clientToTrasnferData?.name}</div>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
}

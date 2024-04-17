import {} from 'module';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { ServiceApi } from '@core/api';
import { TCar } from '@core/api/car/types';
import { TClientResponse } from '@core/api/client/types';
import { useClientCar } from '@core/service/client';
import Form from '@layout/form';
import CarCard from '@modules/client/transfer-car/car-card';
import Container from '@shared/components/container';
import ContainerSelected from '@shared/components/container-selected';
import InputForm from '@shared/components/form/input';
import Button from '@shared/design-system/button';
import Icon from '@shared/design-system/Icon';
import Modal from '@shared/design-system/modal';
import { yup, yupValidators } from '@shared/form-validations';

const transferCarSchema = yup
  .object({
    license: yupValidators.StringValidator().required(),
    cpfToTransfer: yupValidators.CpfValidator().required(),
  })
  .strict();

export type TTransferCarForm = yup.InferType<typeof transferCarSchema>;

export default function ClientTransferCar() {
  const [openModal, setOpenModal] = useState(false);
  const [cpfIsLoading, setCpfIsLoading] = useState(false);
  const [clientToTrasnferData, setClientToTrasnferData] = useState<TClientResponse>();
  const { data: clientCars } = useClientCar();

  const form = useForm<TTransferCarForm>({
    mode: 'onSubmit',
    resolver: yupResolver(transferCarSchema),
  });
  const { setValue, register, watch } = form;

  const licenseSelected = watch('license');

  const selectedCar = useMemo(
    () => clientCars?.find((c) => c.license === licenseSelected),
    [clientCars, licenseSelected],
  );

  const handleTrasnferCar = () => {};

  const handleGetClient = async (cpf: string) => {
    setCpfIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { data: clientData } = await ServiceApi.ClientApi.get({ cpf });
      setClientToTrasnferData(clientData);
    } finally {
      setCpfIsLoading(false);
    }
  };

  const debounce = useDebouncedCallback(handleGetClient, 500);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setClientToTrasnferData(undefined);

    if (value?.length >= 11) debounce(value);
  };

  const handleSubmitForm = (formValues) => {};

  const handleRemoveSelectedCar = () => {
    setValue('license', '');
  };

  return (
    <>
      <Form
        form={form}
        title="Transferência de veículo"
        confirmButtonText="Continuar"
        onSubmit={handleSubmitForm}
        contentDefaultGrid={false}
      >
        <Container
          title={
            <>
              Selecione o carro que deseja transferir
              {selectedCar && (
                <Button type="button" size="small" onClick={handleRemoveSelectedCar}>
                  Remover seleção
                </Button>
              )}
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientCars?.map((car) => {
              return <CarCard key={car.license} car={car} />;
            })}
          </div>
        </Container>
        <Container bodyClassName="flex gap-4" title="Selecione para quem você quer transferir">
          <InputForm
            className="md:w-40"
            label="CPF"
            {...register('cpfToTransfer', { onChange: handleCpfChange })}
          />
          {cpfIsLoading && <Icon name="LoadingIcon" />}
          {clientToTrasnferData && !cpfIsLoading && (
            <ContainerSelected title="Nome do Usuário Selecionado">
              <p>Nome: {clientToTrasnferData?.name}</p>
            </ContainerSelected>
          )}
        </Container>
      </Form>

      <Modal
        open={openModal}
        title="Confirmação dos dados da Transferência de Veículo"
        confirmText="Transferir"
        onConfirmClick={handleTrasnferCar}
        onCancelClick={() => setOpenModal(false)}
      >
        <Container title="Confirme os dados da Trasnferência">
          Automóvel:
          <CarCard car={selectedCar as TCar} />
          Para:
          {clientToTrasnferData?.name}
        </Container>
      </Modal>
    </>
  );
}

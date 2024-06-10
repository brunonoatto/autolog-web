export type TCar = {
  id: string;
  license: string;
  clientId: string;
  brand: string;
  model: string;
  year: number;
};

// TODO: porquanto vai ser enviado o clientId para criar o carro, depois q mudar a api voltar como era antes
// export type TNewCar = Omit<TCar, 'clientId'>;
export type TNewCar = Omit<TCar, 'id'>;

export type TTransferCarProps = {
  carId: string;
  clientIdToTransfer: string;
};

export type TClientCarsResponse = TCar & {
  isTransfered: boolean;
};

export type TGetByClientParams = {
  clientId?: string;
  transfereds?: boolean;
};

export type TCar = {
  id: string;
  license: string;
  clientId: string;
  brand: string;
  model: string;
  year: number;
};

export type TNewCar = Omit<TCar, 'id' | 'clientId'>;

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

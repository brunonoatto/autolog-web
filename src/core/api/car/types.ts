export type TCar = {
  license: string;
  clientId: string;
  brand: string;
  model: string;
  year: number;
};

export type TNewCar = Omit<TCar, 'clientId'>;

export type TCarGetResponse = TCar & {
  isTransfered: boolean;
};

export type TGetByClientParams = {
  clientId?: string;
  transfereds?: boolean;
};

export type TTransferCarProps = {
  license: string;
  cpfOrCnpjToTransfer: string;
};

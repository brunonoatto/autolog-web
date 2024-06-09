import type { TCar } from '@core/api/car/types';

export type TClient = {
  id: string;
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
};

export type TClientResponse = TClient & {
  cars?: TCar[];
};

export type TGetClientParams = {
  cpfCnpj?: string;
  email?: string;
  withCars?: boolean;
};

export type TCarGetResponse = TCar & {
  isTransfered: boolean;
};

export type TGetByClientParams = {
  clientId: string;
  transfereds?: boolean;
};

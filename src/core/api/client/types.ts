import type { TCar } from '@core/api/car/types';

export type TNewClient = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
};

export type TClientResponse = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  cars?: TCar[];
};

export type TGetClientParams = {
  cpf?: string;
  email?: string;
  withCars?: boolean;
};

import type { TCar } from '@core/api/car/types';

export type TNewClient = {
  name: string;
  cpf_cnpj: string;
  phone: string;
  email: string;
  password: string;
};

export type TClientResponse = {
  id: string;
  name: string;
  cpf_cnpj: string;
  email: string;
  phone: string;
  cars?: TCar[];
};

export type TGetClientParams = {
  cpf_cnpj?: string;
  email?: string;
  withCars?: boolean;
};

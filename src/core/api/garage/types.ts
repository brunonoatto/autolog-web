export type TGarage = {
  id: string;
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
  number: number;
  complement?: string;
  password: string;
};

export type TNewGarage = Omit<TGarage, 'id'>;

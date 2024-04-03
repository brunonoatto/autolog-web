export type TClientResponse = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

export type TGetClientParams = {
  cpf?: string;
  email?: string;
};

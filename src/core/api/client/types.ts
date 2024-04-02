export type TClientResponse = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  licenses: string[];
};

export type TGetClientParams = {
  cpf?: string;
  email?: string;
};

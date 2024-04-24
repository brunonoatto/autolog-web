export type TCar = {
  license: string;
  clientId: string;
  brand: string;
  model: string;
  year: number;
};

export type TCarGetResponse = TCar & {
  isTransfered: boolean;
};

export type TGetByClientParams = {
  clientId?: string;
  transfereds?: boolean;
};

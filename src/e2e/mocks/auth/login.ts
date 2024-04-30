import { TAccessTokenData } from '@core/api/auth/types';

export const garageAccessTokenData: TAccessTokenData = {
  id: '54d77a26-d07a-4010-b0b3-9f5ad8139bbf',
  name: 'Garagem do Zeca',
  type: 'garage',
};
export const garageAccessToken = `.${btoa(JSON.stringify(garageAccessTokenData))}.`;

export const clientAccessTokenData: TAccessTokenData = {
  id: '5f182bd8-501c-4a84-803a-933cd253d2a8',
  name: 'Joao Client CNPJ',
  type: 'client',
};

export const clientAccessToken = `.${btoa(JSON.stringify(clientAccessTokenData))}.`;

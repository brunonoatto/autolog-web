import { TClient } from '@core/api/client/types';
import { TGarage } from '@core/api/garage/types';

export type TNewClient = Omit<TClient, 'id'>;

export type TNewGarage = Omit<TGarage, 'id'>;

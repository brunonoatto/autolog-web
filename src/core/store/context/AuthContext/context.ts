import { createContext } from 'react';

import type { TAccessTokenData, TLoginResponse } from '@core/api/auth/types';

export type TAuthContextValue = {
  isAuthenticated: boolean;
  login(loginResponse: TLoginResponse): void;
  logout(): void;
  getTokenData: () => TAccessTokenData | null;
};

export const AuthContext = createContext({} as TAuthContextValue);

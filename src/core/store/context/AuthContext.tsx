import { createContext, useCallback, useLayoutEffect, useState } from 'react';

import httpClient from '@core/api/HttpClient';
import { TLoginResponse } from '@core/api/auth/types';
import { useLogin } from '@core/service/auth';

const authStorageKey = 'autolog-auth';

type TAuthContextValue = {
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  logout(): void;
  getTokenData: () => TLoginResponse;
};

export const AuthContext = createContext({} as TAuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { mutate: mutateLogin } = useLogin();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(authStorageKey));

  const login = useCallback(
    async (email: string, password: string) => {
      mutateLogin(
        { email, password },
        {
          onSuccess: (loginResponse) => {
            localStorage.setItem(authStorageKey, loginResponse.accessToken);
            setIsAuthenticated(true);
          },
        },
      );
    },
    [mutateLogin],
  );

  const logout = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
  }, []);

  const getTokenData = useCallback(() => {
    return JSON.parse(
      atob((localStorage.getItem(authStorageKey) || '.').split('.')[1]),
    ) as TLoginResponse;
  }, []);

  useLayoutEffect(() => {
    const requestInterceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(authStorageKey);

      if (accessToken) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return config;
    });

    const responseInterceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          localStorage.clear();
        }

        return Promise.reject(error);
      },
    );

    return () => {
      httpClient.interceptors.request.eject(requestInterceptorId);
      httpClient.interceptors.response.eject(responseInterceptorId);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        getTokenData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

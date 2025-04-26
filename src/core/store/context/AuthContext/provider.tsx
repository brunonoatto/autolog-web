import { useCallback, useLayoutEffect, useState } from 'react';

import type { TAccessTokenData, TLoginResponse } from '@core/api/auth/types';
import httpClient from '@core/api/http-client';
import { AuthContext } from '@core/store/context/AuthContext';
import { StorageKeyEnum } from '@shared/types/storageKey';

const AUTH_STORAGE_KEY = StorageKeyEnum.auth;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(AUTH_STORAGE_KEY));

  const login = useCallback((loginResponse: TLoginResponse) => {
    localStorage.setItem(AUTH_STORAGE_KEY, loginResponse.accessToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
  }, []);

  const getTokenData = useCallback(() => {
    const storageKey = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storageKey) return null;

    const storageKeyArr = storageKey.split('.');

    if (storageKeyArr.length < 2) return null;

    const decriptStorageKey = atob(storageKeyArr[1]);

    return JSON.parse(decriptStorageKey) as TAccessTokenData;
  }, []);

  useLayoutEffect(() => {
    const requestInterceptorId = httpClient.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem(AUTH_STORAGE_KEY);

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

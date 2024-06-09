import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AxiosError } from 'axios';
import { createContext, useLayoutEffect } from 'react';

import { statusCodeMessages } from '@core/api/consts';
import httpClient from '@core/api/http-client';
import type { TErrorApiData } from '@core/api/types';
import { AuthProvider } from '@core/store/context/AuthContext';
import { ThemeProvider } from '@core/store/context/ThemeContext';
import BigSpinner from '@layout/body-app/big-spinner';
import { Toaster } from '@shared/design-system/ui/toaster';
import { useToast } from '@shared/design-system/ui/use-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppContext = createContext({});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  useLayoutEffect(() => {
    const responseInterceptorId = httpClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<TErrorApiData>) => {
        const configData = JSON.parse(error?.config?.data || '{}');
        if (configData.noShowError) {
          return Promise.reject(error);
        }

        if (error.code === 'ERR_NETWORK') {
          toast.error('Nâo foi possível conectar com o servidor!');
          return;
        }

        const status = error.response?.status || 0;
        if (status === 400) {
          toast.error('Ops...ocorreu um erro no servidor.');
        } else if (status >= 401 && status <= 499) {
          const message =
            typeof error.response?.data === 'string'
              ? error.response?.data
              : error.response?.data?.message;

          if (message) {
            toast.error(message);
          } else {
            const statusCodeMessage =
              statusCodeMessages[status] || 'Ops...ocorreu um erro no servidor.';
            toast.error(statusCodeMessage);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(responseInterceptorId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="autolog-theme">
          <Toaster />
          <BigSpinner />

          <AuthProvider>{children}</AuthProvider>

          <ReactQueryDevtools buttonPosition="bottom-left" />
        </ThemeProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

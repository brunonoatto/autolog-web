import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AxiosError } from 'axios';
import { createContext, useLayoutEffect } from 'react';

import httpClient from '@core/api/HttpClient';
import type { TErrorApiData } from '@core/api/types';
import { AuthProvider } from '@core/store/context/AuthContext';
import { ThemeProvider } from '@core/store/context/ThemeProvider';
import BigSpinner from '@layout/body-app/big-spinner';
import { Toaster } from '@shared/design-system/ui/toaster';
import { useToast } from '@shared/design-system/ui/use-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
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
        if (error.code === 'ERR_NETWORK') {
          toast({ title: 'Nâo foi possível conectar com o servidor!', variant: 'destructive' });
          return;
        }

        const status = error.response?.status || 0;
        if (status >= 400 && status <= 499) {
          const message = error.response?.data?.message;

          if (message) {
            toast({ title: message, variant: 'destructive' });
            return;
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      httpClient.interceptors.response.eject(responseInterceptorId);
    };
  }, []);

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

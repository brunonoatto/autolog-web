import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createContext } from 'react';

import { AuthProvider } from '@core/store/context/AuthContext';
import { ThemeProvider } from '@core/store/context/ThemeProvider';
import BigSpinner from '@layout/body-app/big-spinner';
import { Toaster } from '@shared/design-system/ui/toaster';

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
  return (
    <AppContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="autolog-theme">
          <BigSpinner />
          <Toaster />

          <AuthProvider>{children}</AuthProvider>

          <ReactQueryDevtools buttonPosition="bottom-left" />
        </ThemeProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

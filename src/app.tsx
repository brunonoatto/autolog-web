import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Router from '@core/router';
import { AuthProvider } from '@core/store/context/AuthContext';
import { ThemeProvider } from '@core/store/context/ThemeProvider';
import BigSpinner from '@layout/body-app/big-spinner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="autolog-theme">
        <BigSpinner />

        <AuthProvider>
          <Router />
        </AuthProvider>

        <ReactQueryDevtools buttonPosition="bottom-left" />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

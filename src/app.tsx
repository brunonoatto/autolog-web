import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Router from '@core/router';
import { AuthProvider } from '@core/store/context/AuthContext';
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
      <BigSpinner />

      <AuthProvider>
        <Router />
      </AuthProvider>

      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
};

export default App;

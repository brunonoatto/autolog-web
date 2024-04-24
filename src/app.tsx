import Router from '@core/router';
import { AppProvider } from '@core/store/context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;

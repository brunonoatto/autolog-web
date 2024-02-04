import { RouterProvider } from 'react-router-dom';

import router from '@core/router';

const App = () => {
  return <RouterProvider router={router} fallbackElement={<>Big spinner</>} />;
};
export default App;

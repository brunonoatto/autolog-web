import { RouterProvider } from 'react-router-dom';

import router from '@core/router';

export function App() {
  return <RouterProvider router={router} fallbackElement={<>Big spinner</>} />;
}

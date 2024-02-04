import { RouterProvider } from 'react-router-dom';

import router from '@core/router';

const Main = () => {
  return (
    <main className="bg-neutral-800 px-4">
      <RouterProvider router={router} fallbackElement={<>Big spinner</>} />
    </main>
  );
};
export default Main;

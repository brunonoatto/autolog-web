import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import BigSpinner from '@layout/body-app/big-spinner';

export default function SuspenseRoute() {
  return (
    <Suspense fallback={<BigSpinner open={true} />}>
      <Outlet />
    </Suspense>
  );
}

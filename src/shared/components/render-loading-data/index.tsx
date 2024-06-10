import { ReactNode } from 'react';

import LoadingCard from '@shared/components/loading-card';
import { Alert, AlertTitle } from '@shared/design-system/ui/alert';

type RenderLoadingData = {
  children: ReactNode;
  isLoading: boolean;
  hasData: boolean;
  notFoundElement?: ReactNode;
};

export function RenderLoadingData({
  children,
  isLoading,
  hasData,
  notFoundElement,
}: RenderLoadingData) {
  if (isLoading) return <LoadingCard />;

  if (!hasData) {
    return (
      notFoundElement || (
        <Alert>
          <AlertTitle>Dados não encontrados.</AlertTitle>
        </Alert>
      )
    );
  }

  return children;
}

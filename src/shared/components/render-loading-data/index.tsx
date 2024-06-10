import { ReactNode } from 'react';

import LoadingCard from '@shared/components/loading-card';
import { Alert, AlertTitle } from '@shared/design-system/ui/alert';

type RenderLoadingData = {
  children: ReactNode;
  isLoading: boolean;
  hasData: boolean;
  notFoundText?: string;
  notFoundElement?: ReactNode;
};

export function RenderLoadingData({
  children,
  isLoading,
  hasData,
  notFoundText,
  notFoundElement,
}: RenderLoadingData) {
  if (isLoading) return <LoadingCard />;

  if (!hasData) {
    return (
      notFoundElement || (
        <Alert>
          <AlertTitle>{notFoundText || 'Dados não encontrados.'}</AlertTitle>
        </Alert>
      )
    );
  }

  return children;
}

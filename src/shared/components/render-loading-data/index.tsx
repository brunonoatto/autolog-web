import { ReactNode } from 'react';

import LoadingCard from '@shared/components/loading-card';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';

type TRenderLoadingData = {
  children: ReactNode;
  isLoading: boolean;
  hasData: boolean;
  notFoundTitle?: ReactNode | string;
  notFoundDescription?: ReactNode | string;
  notFoundElement?: ReactNode;
};

export function RenderLoadingData({
  children,
  isLoading,
  hasData,
  notFoundTitle,
  notFoundDescription,
  notFoundElement,
}: TRenderLoadingData) {
  if (isLoading) return <LoadingCard />;

  if (!hasData) {
    return (
      notFoundElement || (
        <Alert>
          <AlertTitle>{notFoundTitle || 'Dados não encontrados.'}</AlertTitle>

          {notFoundDescription && <AlertDescription>{notFoundDescription}</AlertDescription>}
        </Alert>
      )
    );
  }

  return children;
}

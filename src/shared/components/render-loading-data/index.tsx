import { ReactNode } from 'react';

import LoadingCard from '@shared/components/loading-card';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';

type TRenderLoadingData = {
  children: ReactNode;
  isLoading: boolean;
  hasData: boolean;
  loadingElement?: ReactNode;
  notFoundTitle?: ReactNode | string;
  notFoundDescription?: ReactNode | string;
  notFoundElement?: ReactNode;
};

export function RenderLoadingData({
  children,
  isLoading,
  hasData,
  loadingElement,
  notFoundTitle,
  notFoundDescription,
  notFoundElement,
}: TRenderLoadingData) {
  if (isLoading) return loadingElement || <LoadingCard />;

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

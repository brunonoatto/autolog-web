import type { PropsWithChildren } from 'react';

import { cn } from '@shared/design-system/helpers/utils';

type TWithoutLoginMainProps = PropsWithChildren & {
  className?: string;
};

export function WithoutLoginMain({ children, className }: TWithoutLoginMainProps) {
  return (
    <div className={cn('w-full max-w-[650px] pt-4 px-4 md:px-0 mx-auto space-y-4', className)}>
      {children}
    </div>
  );
}

import React from 'react';
import { twMerge } from 'tailwind-merge';

type TContainerSelectedProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export default function ContainerSelected({
  children,
  className,
  title = 'Selecionado',
}: TContainerSelectedProps) {
  return (
    <div className={twMerge('rounded-lg border-2 border-border', className)}>
      <div className="px-4 rounded-top-lg bg-border text-center text-sm">{title}</div>
      <div className="p-2">{children}</div>
    </div>
  );
}

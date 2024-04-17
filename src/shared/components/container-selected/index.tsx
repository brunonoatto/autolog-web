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
    <div className={twMerge('md:w-fit rounded-lg border-2 border-teal-700', className)}>
      <div className="px-4 rounded-top-lg bg-teal-700 text-center text-sm">{title}</div>
      <div className="p-2">{children}</div>
    </div>
  );
}

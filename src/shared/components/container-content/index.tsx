import { twMerge } from 'tailwind-merge';

type TContainerFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContainerContent({ children, className }: TContainerFooterProps) {
  return (
    <div className={twMerge('grow space-y-4 overflow-y-auto px-4 py-2', className)}>{children}</div>
  );
}

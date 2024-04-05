import { twMerge } from 'tailwind-merge';

type TContainerFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContainerFooter({ children, className }: TContainerFooterProps) {
  return <div className={twMerge('flex-none px-4 py-2', className)}>{children}</div>;
}

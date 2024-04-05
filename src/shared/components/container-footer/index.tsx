import { twMerge } from 'tailwind-merge';

type TContainerFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContainerFooter({ children, className }: TContainerFooterProps) {
  return <div className={twMerge('pb-2 pt-4', className)}>{children}</div>;
}

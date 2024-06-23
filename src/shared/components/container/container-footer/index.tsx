import { cn } from '@shared/design-system/helpers/utils';

type TContainerFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContainerFooter({ children, className }: TContainerFooterProps) {
  return <div className={cn('pb-2 pt-4', className)}>{children}</div>;
}

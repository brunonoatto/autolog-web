import { cn } from '@shared/design-system/helpers/utils';

type TContainerFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContainerContent({ children, className }: TContainerFooterProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

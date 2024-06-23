import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@shared/design-system/helpers/utils';

const containerTitleContentVariants = cva('p-2', {
  variants: {
    align: {
      center: 'text-center',
    },
  },
});

type TContainerTitleProps = VariantProps<typeof containerTitleContentVariants> & {
  children: React.ReactNode;
  className?: string;
  title?: string;
  showTitle?: boolean;
};

export default function ContainerTitle({
  children,
  className,
  title = 'Selecionado',
  showTitle = true,
  align,
}: TContainerTitleProps) {
  return (
    <div className={cn('rounded-lg border-2 border-border h-full', className)}>
      {showTitle && (
        <div className="px-4 rounded-top-lg bg-border text-center text-sm font-semibold">
          {title}
        </div>
      )}
      <div className={containerTitleContentVariants({ align })}>{children}</div>
    </div>
  );
}

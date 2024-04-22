import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const containerSelectedContentVariants = cva('p-2', {
  variants: {
    align: {
      center: 'text-center',
    },
  },
});

type TContainerSelectedProps = VariantProps<typeof containerSelectedContentVariants> & {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export default function ContainerSelected({
  children,
  className,
  title = 'Selecionado',
  align,
}: TContainerSelectedProps) {
  return (
    <div className={twMerge('rounded-lg border-2 border-border min-w-80', className)}>
      <div className="px-4 rounded-top-lg bg-border text-center text-sm font-semibold">{title}</div>
      <div className={containerSelectedContentVariants({ align })}>{children}</div>
    </div>
  );
}

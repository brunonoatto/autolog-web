import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@shared/design-system/helpers/utils';
import Icon, { TIcons } from '@shared/design-system/ui/icon';

const alertVariants = cva(
  'w-full rounded-lg border p-4 space-y-2 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
        primary: 'bg-primary text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

type TAlertTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  icon?: TIcons;
};
const AlertTitle = React.forwardRef<HTMLParagraphElement, TAlertTitleProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div className="flex items-center gap-2">
      {icon && <Icon name={icon} />}
      <h5 ref={ref} className={cn('font-medium leading-none tracking-tight', className)} {...props}>
        {children}
      </h5>
    </div>
  ),
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };

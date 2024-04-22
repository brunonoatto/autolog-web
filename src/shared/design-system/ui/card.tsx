import { cva } from 'class-variance-authority';
import React from 'react';
import { VariantProps } from 'tailwind-variants';

import Icon, { TIcons } from '@shared/design-system/ui/icon';
import { cn } from '@shared/design-system-utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const cardVariants = cva('flex gap-2 border-b-[1px] border-primary w-11/12 md:w-3/4 pb-2', {
  variants: {
    alignTitle: {
      default: '',
      center: 'w-full md:w-full justify-center',
    },
  },
  defaultVariants: {
    alignTitle: 'default',
  },
});
const cardTitleVariants = cva('font-semibold leading-none tracking-tight', {
  variants: {
    size: {
      default: 'text-2xl',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> &
    VariantProps<typeof cardVariants> &
    VariantProps<typeof cardTitleVariants> & { icon?: TIcons }
>(({ className, icon, size, alignTitle, children, ...props }, ref) => (
  <div className={cn(cardVariants({ className, alignTitle }))}>
    {icon && <Icon name={icon} />}
    <div ref={ref} className={cn(cardTitleVariants({ size }))} {...props}>
      {children}
    </div>
  </div>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 flex-1', className)} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const cardFooterVariants = cva('flex items-center gap-2 p-6 pt-0', {
  variants: {
    align: {
      end: 'justify-end',
      center: 'justify-center',
    },
  },
  defaultVariants: {
    align: 'end',
  },
});
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardFooterVariants>
>(({ className, align, ...props }, ref) => (
  <div ref={ref} className={cardFooterVariants({ className, align })} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

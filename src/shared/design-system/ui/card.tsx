import { cva } from 'class-variance-authority';
import React from 'react';
import { VariantProps } from 'tailwind-variants';

import Icon, { TIcons } from '@shared/design-system/ui/icon';
import { cn } from '@shared/design-system-utils';

const cardVariants = cva('flex flex-col rounded-lg bg-card text-card-foreground shadow-sm', {
  variants: {
    border: {
      true: 'border border-primary',
    },
  },
  defaultVariants: {
    border: false,
  },
});

type TCardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, TCardProps>(
  ({ className, border, ...props }, ref) => (
    <div ref={ref} className={cardVariants({ className, border })} {...props} />
  ),
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const cardTitleVariants = cva(
  'flex items-center gap-2 border-b-[1px] border-primary w-11/12 md:w-3/4 pb-2',
  {
    variants: {
      size: {
        lg: 'pb-0',
      },
      alignTitle: {
        center: 'w-full md:w-full justify-center',
      },
    },
  },
);
const cardTitleTextVariants = cva('font-semibold leading-none tracking-tight', {
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
    VariantProps<typeof cardTitleVariants> &
    VariantProps<typeof cardTitleTextVariants> & { icon?: TIcons }
>(({ className, icon, size, alignTitle, children, ...props }, ref) => (
  <div className={cn(cardTitleVariants({ className, alignTitle, size }))}>
    {icon && <Icon name={icon} size={size === 'lg' ? 18 : 22} />}
    <div ref={ref} className={cn(cardTitleTextVariants({ size }))} {...props}>
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
    <div ref={ref} className={cn('p-6 pt-0 flex-1 space-y-2', className)} {...props} />
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

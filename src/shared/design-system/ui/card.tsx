import { cva } from 'class-variance-authority';
import React from 'react';
import { VariantProps } from 'tailwind-variants';

import { cn } from '@shared/design-system/helpers/utils';
import { CARD_TITLE_TESTE_ID } from '@shared/design-system/ui/consts';
import Icon, { type TIcons } from '@shared/design-system/ui/icon';

const cardVariants = cva('flex flex-col rounded-lg bg-card text-card-foreground shadow-sm', {
  variants: {
    border: {
      true: 'border border-border',
    },
  },
  defaultVariants: {
    border: false,
  },
});

type TCardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, TCardProps>(
  ({ className, border, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ border }), className)} {...props} />
  ),
);
Card.displayName = 'Card';

const cardHeaderVariants = cva('flex flex-col space-y-1.5 py-4 px-6', {
  variants: {
    paddingX: {
      false: 'px-0',
    },
  },
  defaultVariants: {
    paddingX: true,
  },
});
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardHeaderVariants>
>(({ className, paddingX, ...props }, ref) => (
  <div ref={ref} className={cn(cardHeaderVariants({ paddingX }), className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const cardTitleVariants = cva(
  'flex items-center gap-2 border-b-[1px] border-border w-11/12 md:w-3/4 pb-2',
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
  <div
    data-testid={CARD_TITLE_TESTE_ID}
    className={cn(cardTitleVariants({ alignTitle, size }), className)}
  >
    {icon && <Icon name={icon} size={size === 'lg' ? 'lg' : 'default'} />}
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

const cardContentVariants = cva('px-6 pb-4 pt-0 flex-1 space-y-4', {
  variants: {
    paddingX: {
      false: 'px-0',
    },
  },
  defaultVariants: {
    paddingX: true,
  },
});
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardContentVariants>
>(({ className, paddingX, ...props }, ref) => (
  <div ref={ref} className={cn(cardContentVariants({ paddingX }), className)} {...props} />
));
CardContent.displayName = 'CardContent';

const cardFooterVariants = cva('flex items-center gap-2 p-6 pt-0', {
  variants: {
    align: {
      end: 'justify-end',
      center: 'justify-center',
    },
    paddingX: {
      false: 'px-0',
    },
  },
  defaultVariants: {
    align: 'end',
    paddingX: true,
  },
});
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardFooterVariants>
>(({ className, align, paddingX, ...props }, ref) => (
  <div ref={ref} className={cn(cardFooterVariants({ align, paddingX }), className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

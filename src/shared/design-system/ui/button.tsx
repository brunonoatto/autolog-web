import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import LoadingIcon from '@shared/components/loading-icon';
import { cn } from '@shared/design-system/helpers/utils';
import Icon, { TIconProps, TIcons } from '@shared/design-system/ui/icon';

export const buttonVariants = cva(
  'inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70',
  {
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      variant: {
        default: 'bg-border text-primary-foreground hover:bg-border/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'outline-active':
          'border-2 border-input bg-background text-primary hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface TButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: TIcons;
  iconProps?: TIconProps;
  secondIcon?: TIcons;
  secondIconProps?: TIconProps;
}

export const Button = React.forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      className,
      children,
      disabled,
      isLoading,
      variant,
      size = 'default',
      asChild = false,
      icon,
      iconProps,
      secondIcon,
      secondIconProps,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const iconSize = size === 'icon' ? 'sm' : size;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingIcon size={size === 'icon' ? 'sm' : size} />}

        {icon && !isLoading && <Icon name={icon} size={iconSize} {...iconProps} />}

        {children}

        {secondIcon && <Icon name={secondIcon} size={iconSize} {...secondIconProps} />}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

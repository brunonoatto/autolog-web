import { PropsWithChildren } from 'react';
import { FieldValues, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Button, type TButtonProps } from '@shared/design-system/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';
import type { TIcons } from '@shared/design-system/ui/icon';

type TForm<T extends FieldValues> = PropsWithChildren & {
  'data-testid'?: string;
  isLoading?: boolean;
  form: UseFormReturn<T>;
  onValid: SubmitHandler<T>;
  title: string;
  confirmButtonText?: string;
  confirmButtonProps?: TButtonProps;
  className?: string;
  icon?: TIcons;
  useDefaultGrid?: boolean;
  border?: boolean;
  paddingX?: boolean;
  showFooter?: boolean;
};

export default function Form<T extends FieldValues>({
  'data-testid': dataTestId,
  isLoading = false,
  form,
  onValid,
  title,
  confirmButtonText = 'Confirmar',
  confirmButtonProps,
  children,
  className,
  icon,
  useDefaultGrid = true,
  border = false,
  paddingX = true,
  showFooter = true,
}: TForm<T>) {
  const { disabled: disabledConfirmButton, ...otherConfirmButtonProps } = confirmButtonProps || {};

  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={handleSubmit(onValid)}>
        <Card border={border}>
          <CardHeader paddingX={paddingX}>
            <CardTitle icon={icon}>{title}</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>

          <CardContent paddingX={paddingX}>
            {useDefaultGrid ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">{children}</div>
            ) : (
              <div className="space-y-2">{children}</div>
            )}
          </CardContent>

          {showFooter && (
            <CardFooter paddingX={paddingX}>
              <Button
                data-testid={dataTestId}
                disabled={disabledConfirmButton || isLoading}
                {...otherConfirmButtonProps}
              >
                {confirmButtonText}
              </Button>
            </CardFooter>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}

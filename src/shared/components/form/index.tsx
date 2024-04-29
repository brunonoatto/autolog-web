import { PropsWithChildren } from 'react';
import { FieldValues, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import { Button } from '@shared/design-system/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';
import type { TIcons } from '@shared/design-system/ui/icon';
import IconButton from '@shared/design-system/ui/icon-button';

type TForm<T extends FieldValues> = PropsWithChildren & {
  'data-testid'?: string;
  form: UseFormReturn<T>;
  onValid: SubmitHandler<T>;
  title: string;
  confirmButtonText?: string;
  iconButton?: TIcons;
  className?: string;
  icon?: TIcons;
  useDefaultGrid?: boolean;
  border?: boolean;
  paddingX?: boolean;
};

export default function Form<T extends FieldValues>({
  'data-testid': dataTestId,
  form,
  onValid,
  title,
  confirmButtonText = 'Confirmar',
  iconButton,
  children,
  className,
  icon,
  useDefaultGrid = true,
  border = false,
  paddingX = true,
}: TForm<T>) {
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

          <CardFooter paddingX={paddingX}>
            {iconButton ? (
              <IconButton data-testid={dataTestId} icon={iconButton}>
                {confirmButtonText}
              </IconButton>
            ) : (
              <Button data-testid={dataTestId}>{confirmButtonText}</Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}

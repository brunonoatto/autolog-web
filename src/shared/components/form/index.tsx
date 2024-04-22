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
  form: UseFormReturn<T>;
  onValid: SubmitHandler<T>;
  title: string;
  confirmButtonText?: string;
  iconButton?: TIcons;
  className?: string;
  icon?: TIcons;
  useDefaultGrid?: boolean;
};

export default function Form<T extends FieldValues>({
  form,
  onValid,
  title,
  confirmButtonText = 'Confirmar',
  iconButton,
  children,
  className,
  icon,
  useDefaultGrid = true,
}: TForm<T>) {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={handleSubmit(onValid)}>
        <Card>
          <CardHeader>
            <CardTitle icon={icon}>{title}</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>

          <CardContent>
            {useDefaultGrid ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
            ) : (
              <div className="space-y-4">{children}</div>
            )}
          </CardContent>

          <CardFooter>
            {iconButton ? (
              <IconButton icon={iconButton}>{confirmButtonText}</IconButton>
            ) : (
              <Button>{confirmButtonText}</Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}

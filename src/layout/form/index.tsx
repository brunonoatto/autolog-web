import { PropsWithChildren } from 'react';
import { FieldValues, FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import Container from '@shared/components/container';
import type { TIcons } from '@shared/design-system_old/assets/icons/types';
import Button from '@shared/design-system_old/button';
import IconButton from '@shared/design-system_old/icon-button';

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
      <Container border className={className} title={title} icon={icon}>
        <form onSubmit={handleSubmit(onValid)}>
          <Container.Content>
            {useDefaultGrid ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
            ) : (
              children
            )}
          </Container.Content>

          <Container.Footer>
            <div className="text-right">
              {iconButton ? (
                <IconButton icon={iconButton}>{confirmButtonText}</IconButton>
              ) : (
                <Button>{confirmButtonText}</Button>
              )}
            </div>
          </Container.Footer>
        </form>
      </Container>
    </FormProvider>
  );
}

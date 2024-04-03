/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, PropsWithChildren } from 'react';
import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import Container from '@shared/components/container';
import type { TIcons } from '@shared/design-system/assets/icons/types';
import Button from '@shared/design-system/button';
import IconButton from '@shared/design-system/icon-button';

type TForm = PropsWithChildren & {
  // TODO: trocar any por um tipo q faça inferência ao outro
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  title: string;
  confirmButtonText?: string;
  iconButton?: TIcons;
  className?: string;
  icon?: TIcons;
};

const Form: FunctionComponent<TForm> = ({
  form,
  onSubmit,
  title,
  confirmButtonText = 'Confirmar',
  iconButton,
  children,
  className,
  icon,
}) => {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <Container border className={className} title={title} icon={icon}>
        <div className="my-2">{children}</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-right ">
            {iconButton ? (
              <IconButton icon={iconButton}>{confirmButtonText}</IconButton>
            ) : (
              <Button>{confirmButtonText}</Button>
            )}
          </div>
        </form>
      </Container>
    </FormProvider>
  );
};

export default Form;

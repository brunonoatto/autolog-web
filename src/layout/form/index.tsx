import { FunctionComponent, PropsWithChildren } from 'react';

import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import Button from '@shared/design-system/button';
import Container from '@shared/components/container';
import { TIcons } from '@shared/design-system/assets/icons/types';
import IconButton from '@shared/design-system/icon-button';

type TForm = PropsWithChildren & {
  // TODO: trocar any por um tipo q faça inferência ao outro
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  title: string;
  confirmButtonText?: string;
  iconButton?: TIcons;
  className?: string;
};

const Form: FunctionComponent<TForm> = ({
  form,
  onSubmit,
  title,
  confirmButtonText = 'Confirmar',
  iconButton,
  children,
  className,
}) => {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className={className} title={title}>
          <div className="my-2">{children}</div>

          <div className="text-right ">
            {iconButton ? (
              <IconButton icon={iconButton}>{confirmButtonText}</IconButton>
            ) : (
              <Button>{confirmButtonText}</Button>
            )}
          </div>
        </Container>
      </form>
    </FormProvider>
  );
};

export default Form;

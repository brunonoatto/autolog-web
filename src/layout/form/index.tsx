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
  contentDefaultGrid?: boolean;
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
  contentDefaultGrid = true,
}) => {
  const { handleSubmit } = form;

  return (
    <Container border className={className} title={title} icon={icon}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container.Content>
            {contentDefaultGrid ? (
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
      </FormProvider>
    </Container>
  );
};

export default Form;

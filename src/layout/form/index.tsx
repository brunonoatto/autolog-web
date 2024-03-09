import { FunctionComponent, PropsWithChildren } from 'react';

import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import Button from '@shared/design-system/button';
import Card from '@layout/card';

type TForm = PropsWithChildren & {
  // TODO: trocar any por um tipo q faça inferência ao outro
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  title: string;
  confirmButtonText?: string;
  className?: string;
};

const Form: FunctionComponent<TForm> = ({
  form,
  onSubmit,
  title,
  confirmButtonText = 'Confirmar',
  children,
  className,
}) => {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={className} title={title}>
          <div className="my-2">{children}</div>

          <div className="text-right ">
            <Button>{confirmButtonText}</Button>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
};

export default Form;

import { FunctionComponent, PropsWithChildren } from 'react';

import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import Button from '@shared/design-system/button';

type TFormCard = PropsWithChildren & {
  // TODO: trocar any por um tipo q faça inferência ao outro
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  title: string;
  confirmButtonText?: string;
  className?: string;
};

const FormCard: FunctionComponent<TFormCard> = ({
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
        <div className={twMerge('border-2 border-teal-800 rounded-lg p-2', className)}>
          <h2>{title}</h2>

          <div className="my-2">{children}</div>

          <div className="text-right ">
            <Button>{confirmButtonText}</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormCard;

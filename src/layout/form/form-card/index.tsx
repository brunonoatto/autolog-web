import { FunctionComponent, PropsWithChildren } from 'react';

import { FormProvider, type SubmitHandler, type UseFormReturn } from 'react-hook-form';

import styles from './styles.module.css';
import Button from '@shared/design-system/button';

type TFormCard = PropsWithChildren & {
  // TODO: trocar any por um tipo q faça inferência ao outro
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
  title: string;
  confirmButtonText?: string;
};

const FormCard: FunctionComponent<TFormCard> = ({
  form,
  onSubmit,
  title,
  confirmButtonText = 'Confirmar',
  children,
}) => {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.content}>
          <h2>{title}</h2>

          <div className={styles.body}>{children}</div>

          <div className={styles.footer}>
            <Button>{confirmButtonText}</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormCard;

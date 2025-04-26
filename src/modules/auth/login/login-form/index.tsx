import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useLogin } from '@core/service/auth';
import { useAuth } from '@core/store/context/AuthContext';
import { LOGIN_FORM_TEST_ID } from '@modules/auth/login/const';
import { loginFormSchema, TLoginFormType } from '@modules/auth/login/types';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { mutate: mutateLogin } = useLogin();

  const form = useForm<TLoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const { control } = form;

  const handleValid: SubmitHandler<TLoginFormType> = async ({ email, password }) => {
    setIsLoading(true);

    mutateLogin(
      { email, password },
      {
        onSuccess: login,
        onError: () => setIsLoading(false),
      },
    );
  };

  return (
    <Form
      data-testid={LOGIN_FORM_TEST_ID}
      className="w-full"
      isLoading={isLoading}
      form={form}
      title="Login"
      useDefaultGrid={false}
      confirmButtonText="Entrar"
      confirmButtonProps={{ className: 'w-full', size: 'lg' }}
      onValid={handleValid}
    >
      <FormField control={control} name="email" label="Email">
        <Input placeholder="Informe seu e-mail" disabled={isLoading} />
      </FormField>

      <FormField control={control} name="password" label="Senha">
        <Input type="password" placeholder="Informe sua senha" disabled={isLoading} />
      </FormField>
    </Form>
  );
}

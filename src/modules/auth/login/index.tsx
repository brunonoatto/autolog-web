import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useLogin } from '@core/service/auth';
import useAuth from '@core/store/context/AuthContext/hook';
import HomeLink from '@layout/body-app/header/home-link';
import { LOGIN_FORM_TEST_ID } from '@modules/auth/login/const';
import { loginFormSchema, type TLoginFormType } from '@modules/auth/login/types';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';

export default function Login() {
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
    <div className="px-6 pt-10 flex flex-col items-center space-y-6">
      <HomeLink />

      <Form
        data-testid={LOGIN_FORM_TEST_ID}
        className="w-full sm:w-1/2 lg:w-1/3"
        isLoading={isLoading}
        form={form}
        title="Login"
        useDefaultGrid={false}
        onValid={handleValid}
      >
        <FormField control={control} name="email" label="Email">
          <Input placeholder="Informe seu e-mail" disabled={isLoading} />
        </FormField>

        <FormField control={control} name="password" label="Senha">
          <Input type="password" placeholder="Informe sua senha" disabled={isLoading} />
        </FormField>
      </Form>
    </div>
  );
}

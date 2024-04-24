import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import useAuth from '@core/store/context/hooks/useAuth';
import { useLoadingStore } from '@core/store/hooks';
import HomeLink from '@layout/body-app/header/home-link';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { Input } from '@shared/design-system/ui/input';
import { zodValidators } from '@shared/form-validations';

const loginFormSchema = z
  .object({
    email: zodValidators.Email(),
    password: zodValidators.String(),
  })
  .strict();

type TLoginType = z.infer<typeof loginFormSchema>;

export default function Login() {
  const loading = useLoadingStore((state) => state.loading);
  const { login } = useAuth();

  const form = useForm<TLoginType>({
    resolver: zodResolver(loginFormSchema),
  });
  const { control } = form;

  const handleValid: SubmitHandler<TLoginType> = async ({ email, password }) => {
    loading(true);

    await login(email, password);

    // TODO: se der erro chega aqui?
    loading(false);
  };

  return (
    <div className="px-6 pt-10 flex flex-col items-center space-y-6">
      <HomeLink />

      <Form
        className="w-full sm:w-1/2 lg:w-1/3"
        form={form}
        title="Login"
        useDefaultGrid={false}
        onValid={handleValid}
      >
        <FormField control={control} name="email" label="Email">
          <Input placeholder="Informe seu e-mail" />
        </FormField>

        <FormField control={control} name="password" label="Senha">
          <Input type="password" placeholder="Informe sua senha" />
        </FormField>
      </Form>
    </div>
  );
}

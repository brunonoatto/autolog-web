import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import useAuth from '@core/store/context/hooks/useAuth';
import { useLoadingStore } from '@core/store/hooks';
import HomeLink from '@layout/body-app/header/home-link';
import Form from '@layout/form';
import InputForm from '@shared/components/form/input';
import { yup, yupValidators } from '@shared/form-validations';

const schema = yup
  .object({
    email: yupValidators.EmailValidator().required(),
    password: yupValidators.StringValidator().required(),
  })
  .required();

type TLoginType = yup.InferType<typeof schema>;

export default function Login() {
  const loading = useLoadingStore((state) => state.loading);
  const { login } = useAuth();

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { register } = form;

  const handleValid: SubmitHandler<TLoginType> = async ({ email, password }) => {
    loading(true);

    await login(email, password);

    // TODO: se der erro chega aqui?
    loading(false);
  };

  return (
    <div className="pt-10 flex flex-col items-center space-y-6">
      <HomeLink />

      <Form
        form={form}
        onValid={handleValid}
        title="Login"
        useDefaultGrid={false}
        className="w-full md:w-1/2"
      >
        <InputForm label="Email" {...register('email')} />
        <InputForm label="Senha" type="password" {...register('password')} />
      </Form>
    </div>
  );
}

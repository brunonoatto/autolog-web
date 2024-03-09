import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ROUTES_PATH } from '@core/router/consts';
import { useAuthStore, useLoadingStore } from '@core/store/hooks';
import { useLogin } from '@core/service/auth';
import type { TGarage } from '@core/api/garage/types';
import { yup, yupValidators } from '@shared/form-validations';
import Form from '@layout/form';
import InputForm from '@shared/components/form/input';

const schema = yup
  .object({
    email: yupValidators.EmailValidator().required(),
    password: yupValidators.StringValidator().required(),
  })
  .required();

type TLoginType = yup.InferType<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const { mutate } = useLogin();
  const loading = useLoadingStore((props) => props.loading);
  const signin = useAuthStore((props) => props.signin);

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { register } = form;

  const handleSuccess = async (result: TGarage) => {
    await signin(result);
    navigate(ROUTES_PATH.dashboard);
  };

  const onSubmit: SubmitHandler<TLoginType> = async (data) => {
    loading(true);

    mutate(data, {
      onSuccess: handleSuccess,
      onSettled: () => loading(false),
    });
  };

  return (
    <div className="pt-10">
      <Form form={form} onSubmit={onSubmit} title="Login" className="m-4 md:m-auto md:w-1/2">
        <InputForm label="Email" {...register('email')} />
        <InputForm label="Senha" type="password" {...register('password')} />
      </Form>
    </div>
  );
}

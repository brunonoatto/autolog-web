import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useAuthStore, useLoadingStore } from '@core/store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import FormCard from '@layout/form/form-card';
import InputForm from '@shared/components/form/input';
import { yup, yupValidators } from '@shared/form-validations';

const schema = yup
  .object({
    username: yupValidators.StringValidator().required(),
    password: yupValidators.StringValidator().required(),
  })
  .required();

type TLoginType = yup.InferType<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const loading = useLoadingStore((props) => props.loading);
  const signin = useAuthStore((props) => props.signin);

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { register } = form;

  const onSubmit: SubmitHandler<TLoginType> = async (data) => {
    loading(true);
    await signin(data);
    navigate(ROUTES_PATH.dashboard);
    loading(false);
  };

  return (
    <div className="pt-10">
      <FormCard form={form} onSubmit={onSubmit} title="Login" className="m-4 md:m-auto md:w-1/2">
        <InputForm label="Usuário" {...register('username')} />
        <InputForm label="Senha" type="password" {...register('password')} />
      </FormCard>
    </div>
  );
}

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLoadingStore } from '@core/store/hooks';
import useAuth from '@core/store/context/hooks/useAuth';
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
  const loading = useLoadingStore((props) => props.loading);
  const { login } = useAuth();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit } = form;

  const onSubmit: SubmitHandler<TLoginType> = async ({ email, password }) => {
    loading(true);

    await login(email, password);

    // TODO: se der erro chega aqui?
    loading(false);
  };

  return (
    <div className="pt-10">
      <Form
        form={form}
        onSubmit={handleSubmit(onSubmit)}
        title="Login"
        className="m-4 md:m-auto md:w-1/2"
      >
        <InputForm label="Email" {...register('email')} />
        <InputForm label="Senha" type="password" {...register('password')} />
      </Form>
    </div>
  );
}

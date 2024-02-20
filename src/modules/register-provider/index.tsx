import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import InputForm from '@shared/components/form/input-form';
import {
  CnpjValidator,
  BirthdayValidator,
  EmailValidator,
  NumberValidator,
  StringValidator,
} from '@shared/form-validations';
import FormCard from '@core/layout/form/form-card';

const schema = yup
  .object({
    name: StringValidator(),
    dataNascimento: BirthdayValidator(),
    cnpj: CnpjValidator(),
    email: EmailValidator(),
    address: StringValidator(),
    number: NumberValidator(),
    complement: StringValidator({ size: 50 }),
    password: StringValidator({ size: 25 }),
    passwordConfirm: StringValidator({ size: 25 }).oneOf([yup.ref('password')], 'Confirmação da senha inválida.'),
  })
  .required();

type TRegisterProvicerFormType = yup.InferType<typeof schema>;

const RegisterProvider = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { register } = form;

  const onSubmit: SubmitHandler<TRegisterProvicerFormType> = (data) => console.log(data);

  return (
    <FormCard form={form} onSubmit={onSubmit} title="Dados para Cadastro">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputForm label="Nome" {...register('name')} />
        <InputForm label="Data Nascimento" {...register('dataNascimento')} type="date" />
        <InputForm label="CNPJ" {...register('cnpj')} />
        <InputForm label="E-mail" {...register('email')} />
        <InputForm label="Endereço" {...register('address')} />
        <InputForm label="Número" {...register('number')} type="number" />
        <InputForm label="Complemento" {...register('complement')} />
      </div>

      <hr />
      <h3>Defina uma senha de acesso</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputForm label="Senha" {...register('password')} type="password" />
        <InputForm label="Confirmação Senha" {...register('passwordConfirm')} type="password" />
      </div>
    </FormCard>
  );
};

export default RegisterProvider;

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yup, yupValidators } from '@shared/form-validations/index';
import InputForm from '@shared/components/form/input';
import FormCard from '@core/layout/form/form-card';
import InputDateForm from '@shared/components/form/inputDate';
import InputNumberForm from '@shared/components/form/inputNumber';

const schema = yup
  .object({
    name: yupValidators.StringValidator().required(),
    dataNascimento: yupValidators.BirthdayValidator().required(),
    cnpj: yupValidators.CnpjValidator().required(),
    email: yupValidators.EmailValidator().required(),
    address: yupValidators.StringValidator().required(),
    number: yupValidators.NumberValidator().required(),
    complement: yupValidators.StringValidator({ size: 50 }),
    password: yupValidators.StringValidator({ size: 25 }).required(),
    passwordConfirm: yupValidators
      .StringValidator({ size: 25 })
      .oneOf([yup.ref('password')], 'Confirmação da senha inválida.'),
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
        <InputForm label="Nome" inputProps={register('name')} />
        <InputDateForm label="Data Nascimento" inputProps={register('dataNascimento')} />
        <InputForm label="CNPJ" inputProps={register('cnpj')} />
        <InputForm label="E-mail" inputProps={register('email')} />
        <InputForm label="Endereço" inputProps={register('address')} />
        <InputNumberForm label="Número" inputProps={register('number')} />
        <InputForm label="Complemento" inputProps={register('complement')} />
      </div>

      <hr />
      <h3>Defina uma senha de acesso</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputForm label="Senha" inputProps={{ ...register('password'), type: 'password' }} />
        <InputForm
          label="Confirmação Senha"
          inputProps={{ ...register('passwordConfirm'), type: 'password' }}
        />
      </div>
    </FormCard>
  );
};

export default RegisterProvider;

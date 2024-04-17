import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useCreateClient } from '@core/service/client';
import { useLoadingStore } from '@core/store/hooks';
import HomeLink from '@layout/body-app/header/home-link';
import Form from '@layout/form';
import InputForm from '@shared/components/form/input';
import Title from '@shared/components/title';
import Modal from '@shared/design-system/modal';
import { yup, yupValidators } from '@shared/form-validations/index';

const schema = yup
  .object({
    name: yupValidators.StringValidator().required().min(5),
    cpf: yupValidators.CpfValidator().required(),
    phone: yupValidators.StringValidator().required(),
    email: yupValidators.EmailValidator().required(),
    password: yupValidators.StringValidator({ size: 25 }).required(),
    passwordConfirm: yupValidators
      .StringValidator({ size: 25 })
      .oneOf([yup.ref('password')], 'Confirmação da senha inválida.'),
  })
  .required();

type TRegisterClientFormType = yup.InferType<typeof schema>;

export default function ClientRegister() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const loading = useLoadingStore((state) => state.loading);
  const { mutate } = useCreateClient();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit } = form;

  const handleValid: SubmitHandler<TRegisterClientFormType> = (formData) => {
    const { passwordConfirm, ...newClientData } = formData;

    loading(true);

    mutate(newClientData, {
      onSuccess: () => setOpenSuccessModal(true),
      onSettled: () => loading(false),
    });
  };

  const handleGoToClientLogin = () => {
    navigate(ROUTES_PATH.login);
  };

  return (
    <>
      <div className="pt-10 space-y-6 flex flex-col items-center p-4">
        <HomeLink />

        <Form
          form={form}
          onSubmit={handleSubmit(handleValid)}
          title="Dados para Cadastro de Cliente"
          contentDefaultGrid={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputForm label="Nome" {...register('name')} />
            <InputForm label="Telefone" {...register('phone')} />
            <InputForm label="CPF" {...register('cpf')} />
            <InputForm label="E-mail" {...register('email')} />
          </div>

          <Title>Defina uma senha de acesso</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputForm label="Senha" type="password" {...register('password')} />
            <InputForm label="Confirmação Senha" type="password" {...register('passwordConfirm')} />
          </div>
        </Form>
      </div>

      <Modal
        open={openSuccessModal}
        title="Oba...seu cadastro foi realizado com sucesso!"
        confirmText="Continuar"
        onConfirmClick={handleGoToClientLogin}
      >
        Você será redirecionado para realizar o seu login.
      </Modal>
    </>
  );
}

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateClient } from '@core/service/client';
import { useLoadingStore } from '@core/store/hooks';
import HomeLink from '@layout/body-app/header/home-link';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';
import Modal from '@shared/design-system/ui/modal';
import { yup, yupValidators } from '@shared/form-validations/index';
import useNavigateApp from '@shared/hooks/useNavigateApp';

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
  const navigate = useNavigateApp();

  const form = useForm({
    resolver: yupResolver(schema),
  });
  const { control } = form;

  const handleValid: SubmitHandler<TRegisterClientFormType> = (formData) => {
    const { passwordConfirm, ...newClientData } = formData;

    loading(true);

    mutate(newClientData, {
      onSuccess: () => setOpenSuccessModal(true),
      onSettled: () => loading(false),
    });
  };

  const handleGoToClientLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="pt-10 space-y-6 flex flex-col items-center p-4">
        <HomeLink />

        <Form
          form={form}
          onValid={handleValid}
          title="Cadastro de Cliente"
          icon="circle-user-round"
          useDefaultGrid={false}
          border
        >
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            <FormField control={control} name="name" label="Nome">
              <Input />
            </FormField>
            <FormField control={control} name="cpf" label="CPF">
              <Input />
            </FormField>
            <FormField control={control} name="email" label="E-mail">
              <Input />
            </FormField>
            <FormField control={control} name="phone" label="Telefone">
              <Input />
            </FormField>
          </div>

          <CardTitle size="lg">Defina uma senha de acesso</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={control} name="password" label="Senha">
              <Input type="password" />
            </FormField>
            <FormField control={control} name="passwordConfirm" label="Confirmação Senha">
              <Input type="password" />
            </FormField>
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

import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { useCreateClient } from '@core/service/user';
import { useLoadingStore } from '@core/store/hooks';
import HomeLink from '@layout/body-app/header/home-link';
import { WithoutLoginMain } from '@layout/without-login-main';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import CpfCnpjInput from '@shared/components/inputs/cpf-cnpj-input';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';
import MaskInput from '@shared/design-system/ui/input-mask';
import Modal from '@shared/design-system/ui/modal';
import { zodValidators } from '@shared/form-validations/index';
import { PasswordSchema } from '@shared/form-validations/validators';
import MasksEnum from '@shared/helpers/string/masks';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

const registerClientSchema = z
  .object({
    name: zodValidators.String({ minLength: 5 }),
    cpfCnpj: zodValidators.CpfOrCnpj(),
    phone: zodValidators.String(),
    email: zodValidators.Email(),
  })
  .and(PasswordSchema);

type TRegisterClientFormType = z.infer<typeof registerClientSchema>;

export default function ClientRegister() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const loading = useLoadingStore((state) => state.loading);
  const { mutate } = useCreateClient();
  const navigate = useNavigateCustom();

  const form = useForm<TRegisterClientFormType>({
    resolver: zodResolver(registerClientSchema),
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
      <WithoutLoginMain className="max-w-[825px]">
        <HomeLink center />

        <Form
          form={form}
          onValid={handleValid}
          title="Cadastro de Cliente"
          icon={CircleUserRound}
          useDefaultGrid={false}
          border
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField className="col-span-full" control={control} name="name" label="Nome">
              <Input />
            </FormField>

            <FormField control={control} name="cpfCnpj" label="CPF/CNPJ" isMask>
              <CpfCnpjInput />
            </FormField>

            {/* TODO: colocar um tooltip com info para que o telefone é utilizado */}
            <FormField control={control} name="phone" label="Telefone">
              <MaskInput mask={MasksEnum.phone} />
            </FormField>
          </div>

          <CardTitle size="lg">Defina uma senha de acesso</CardTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              className="col-span-full md:col-span-2"
              control={control}
              name="email"
              label="E-mail"
            >
              <Input />
            </FormField>

            <FormField className="row-start-2" control={control} name="password" label="Senha">
              <Input type="password" />
            </FormField>

            <FormField
              className="row-start-3 md:row-start-2"
              control={control}
              name="passwordConfirm"
              label="Confirmação Senha"
            >
              <Input type="password" />
            </FormField>
          </div>
        </Form>
      </WithoutLoginMain>

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

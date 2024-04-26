import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useCreateGarage } from '@core/service/garage';
import { useLoadingStore } from '@core/store/hooks';
import HomeLink from '@layout/body-app/header/home-link';
import Form from '@shared/components/form';
import FormField from '@shared/components/form/form-field';
import { CardTitle } from '@shared/design-system/ui/card';
import { Input } from '@shared/design-system/ui/input';
import Modal from '@shared/design-system/ui/modal';
import { zodValidators } from '@shared/form-validations/index';
import { PasswordSchema } from '@shared/form-validations/validators';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

const registerGarageSchema = z
  .object({
    name: zodValidators.String({ minLength: 5 }),
    cnpj: zodValidators.Cnpj(),
    phone: zodValidators.String(),
    email: zodValidators.Email(),
    address: zodValidators.String(),
    number: zodValidators.Number(),
    complement: zodValidators.String({ maxLength: 50 }).optional(),
  })
  .and(PasswordSchema);

type TRegisterGarageFormType = z.infer<typeof registerGarageSchema>;

export default function GarageRegister() {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const loading = useLoadingStore((state) => state.loading);
  const { mutate } = useCreateGarage();
  const navigate = useNavigateCustom();

  const form = useForm<TRegisterGarageFormType>({
    resolver: zodResolver(registerGarageSchema),
  });
  const { control } = form;

  const handleValid: SubmitHandler<TRegisterGarageFormType> = (formData) => {
    const { passwordConfirm, ...newGarageData } = formData;

    loading(true);

    mutate(newGarageData, {
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
          title="Cadastro de Mecânica"
          icon="warehouse"
          useDefaultGrid={false}
          border
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField control={control} name="name" label="Nome">
              <Input />
            </FormField>
            <FormField control={control} name="cnpj" label="CNPJ">
              <Input />
            </FormField>
            <FormField control={control} name="email" label="E-mail">
              <Input />
            </FormField>
            <FormField control={control} name="phone" label="Telefone">
              <Input />
            </FormField>
            <FormField control={control} name="address" label="Endereço">
              <Input />
            </FormField>
            <FormField control={control} name="number" label="Número">
              <Input type="number" />
            </FormField>
            <FormField control={control} name="complement" label="Complemento">
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

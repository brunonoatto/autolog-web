import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yup, yupValidators } from '@shared/form-validations';
import { DashboardItem } from '@core/models/autolog';
import Modal from '@shared/components/modal';
import FormCard from '@core/layout/form/form-card';
import InputForm from '@shared/components/form/input';
import InputNumberForm from '@shared/components/form/inputNumber';
import { useState } from 'react';

const schema = yup
  .object({
    description: yupValidators.StringValidator().required(),
    quantity: yupValidators.NumberValidator().required(),
    price: yupValidators.NumberValidator().required(),
  })
  .required();

type TBudgetItemFormType = yup.InferType<typeof schema>;

type TCarModalProps = { car: DashboardItem; onClose: () => void };
const CarModal = ({ car, onClose }: TCarModalProps) => {
  const { license, brand, model, year } = car;

  const [items, setItems] = useState<TBudgetItemFormType[]>([
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
    {
      description: 'cs dsf a',
      price: 1,
      quantity: 1,
    },
  ]);

  const form = useForm({
    defaultValues: { quantity: 1, price: 0 },
    resolver: yupResolver(schema),
  });
  const { register, reset } = form;

  const onSubmit: SubmitHandler<TBudgetItemFormType> = async (formValues) => {
    setItems((prev) => [...prev, formValues]);
    reset();
  };

  return (
    <Modal
      open={true}
      title={`Placa ${license}`}
      onClose={onClose}
      cancelText="Fechar"
      onCancelClick={onClose}
    >
      <h5 className="">
        {brand} {' - '} {model} {' - '} {year}
      </h5>

      <br />

      <FormCard
        form={form}
        onSubmit={onSubmit}
        title="Aicionar Item no Orçamento"
        confirmButtonText="Adicionar"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputForm
            label="Descrição"
            inputProps={register('description')}
            labelProps={{ className: 'col-span-full' }}
          />
          <InputNumberForm label="Quantidade" inputProps={register('quantity')} />
          <InputNumberForm label="Preço Unitário" inputProps={register('price')} />
        </div>
      </FormCard>

      <br />
      <h2>Orçamento</h2>
      <table className="w-full">
        <thead>
          <th scope="col">Descrição</th>
          <th scope="col">Qtd.</th>
          <th scope="col">Preço</th>
          <th scope="col">Total</th>
        </thead>
        <tbody>
          {items.map(({ description, quantity, price }, index) => {
            return (
              <tr key={index}>
                <td>{description}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{quantity * price}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={3}>
              Total do Orçamento:
            </th>
            <td>
              {items.reduce((acc, item) => {
                return acc + item.quantity * item.price;
              }, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Modal>
  );
};

export default CarModal;

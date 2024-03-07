import { useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { yup, yupValidators } from '@shared/form-validations';
import Modal from '@shared/design-system/modal';
import FormCard from '@layout/form/form-card';
import InputForm from '@shared/components/form/input';
import InputNumberForm from '@shared/components/form/inputNumber';
import { useListDashboard } from '@core/service/autolog';
import { DashboardItem } from '@core/models/autolog';
import StatusBadge from '@modules/service-provider/dashboard/status-badge';

const schema = yup
  .object({
    description: yupValidators.StringValidator().required(),
    quantity: yupValidators.NumberValidator().required(),
    price: yupValidators.NumberValidator().required(),
  })
  .required();

type TBudgetItemFormType = yup.InferType<typeof schema>;

const CarModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const licenseParam = searchParams.get('license');

  const { data: cars = [] } = useListDashboard(false);

  const car = useMemo(() => {
    return cars.find((car) => car.license === licenseParam) || ({} as DashboardItem);
  }, [cars, licenseParam]);
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
  ]);

  const form = useForm({
    defaultValues: { quantity: 1, price: 0 },
    resolver: yupResolver(schema),
  });
  const { register, reset } = form;

  const onClose = () => {
    const newSearchParam = new URLSearchParams();
    newSearchParam.delete('license');
    setSearchParams(newSearchParam);
  };

  const onSubmit: SubmitHandler<TBudgetItemFormType> = async (formValues) => {
    setItems((prev) => [...prev, formValues]);
    reset();
  };

  return (
    <Modal
      open={!!license}
      title={`Placa ${license}`}
      onClose={onClose}
      cancelText="Fechar"
      onCancelClick={onClose}
    >
      <div className="space-y-2">
        <h5 className="">
          {brand} {' - '} {model} {' - '} {year}
        </h5>
        <div className="absolute right-[16px] top-[48px]">
          <StatusBadge {...car} />
        </div>

        <FormCard
          form={form}
          onSubmit={onSubmit}
          title="Aicionar Item no Orçamento"
          confirmButtonText="Adicionar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <InputForm
              label="Descrição"
              labelProps={{ className: 'col-span-full' }}
              {...register('description')}
            />
            <InputNumberForm label="Quantidade" {...register('quantity')} />
            <InputNumberForm label="Preço Unitário" {...register('price')} />
          </div>
        </FormCard>

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
      </div>
    </Modal>
  );
};

export default CarModal;

import { useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useListDashboard } from '@core/service/dashboard';
import { yup, yupValidators } from '@shared/form-validations';
import Modal from '@shared/design-system/modal';
import { StatusCarEnum } from '@shared/types/statusCar';
import Form from '@layout/form';
import InputForm from '@shared/components/form/input';
import InputNumberForm from '@shared/components/form/inputNumber';
import { DashboardItem } from '@core/models/dashboard';
import StatusBadge from '@modules/garage/dashboard/status-badge';

const statusAction: { [key in StatusCarEnum]: string } = {
  [StatusCarEnum.WaitingBudget]: 'Enviar orçamento',
  [StatusCarEnum.WaitingBudgetApproval]: '',
  [StatusCarEnum.ApprovedBudget]: 'Iniciar serviço',
  [StatusCarEnum.BudgetRejected]: 'Reenviar orçamento',
  [StatusCarEnum.RunningService]: 'Finalizar serviço',
  [StatusCarEnum.Finished]: '',
};

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
      description: 'item1',
      price: 1,
      quantity: 1,
    },
    {
      description: 'item2',
      price: 1,
      quantity: 1,
    },
  ]);

  const form = useForm({
    defaultValues: { quantity: 1, price: 0 },
    resolver: yupResolver(schema),
  });
  const { register, reset } = form;

  const handleClose = () => {
    const newSearchParam = new URLSearchParams();
    newSearchParam.delete('license');
    setSearchParams(newSearchParam);
  };

  const handleAddBudgetItem: SubmitHandler<TBudgetItemFormType> = async (formValues) => {
    setItems((prev) => [...prev, formValues]);
    reset();
  };

  const handleConfirm = () => {
    // Aqui vai fazer a ação de acordo com o status
  };

  return (
    <Modal
      open={!!license}
      title={`Placa ${license}`}
      confirmText={statusAction[car.status]}
      onConfirmClick={handleConfirm}
      cancelText="Fechar"
      onClose={handleClose}
      onCancelClick={handleClose}
    >
      <div className="space-y-2">
        <h5 className="">
          {brand} {' - '} {model} {' - '} {year}
        </h5>
        <div className="md:absolute right-[16px] top-[48px]">
          <StatusBadge {...car} />
        </div>

        <Form
          form={form}
          onSubmit={handleAddBudgetItem}
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
        </Form>

        <h2>Orçamento</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Qtd.</th>
              <th scope="col">Preço</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ description, quantity, price }) => {
              return (
                <tr key={description}>
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

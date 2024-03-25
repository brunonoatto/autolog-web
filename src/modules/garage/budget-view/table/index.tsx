import { useGetBudget } from '@core/service/budget';
import { useDeleteBudgetItem } from '@core/service/budget-items';
import type { TBudgetItemFormType } from '@modules/garage/budget-view';
import Container from '@shared/components/container';
import IconButton from '@shared/design-system/icon-button';
import { useFormContext } from 'react-hook-form';

type TBudgetViewTableProps = {
  allowActions: boolean;
};

export default function BudgetViewTable({ allowActions }: TBudgetViewTableProps) {
  const { data: budget, refetch } = useGetBudget();
  const { mutate: mutateDeleteBudgetItem } = useDeleteBudgetItem();
  const { reset } = useFormContext<TBudgetItemFormType>();

  const handleDeleteBudgetItem = async (id: string) => {
    mutateDeleteBudgetItem(id, {
      onSuccess: () => {
        refetch();
        reset();
      },
    });
  };

  if (!budget?.items.length) {
    return (
      <div className="border-2 border-teal-600 rounded-xl w-3/4 m-auto">
        <h3 className="text-center">Nenhum item adicionado no orçamento ainda.</h3>
        <h4 className="text-center">Preencha o formulário acima para adicionar um item.</h4>
      </div>
    );
  }

  return (
    <Container title="Itens do Orçamento">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th scope="col">Descrição</th>
            <th scope="col" className="text-right">
              Qtd.
            </th>
            <th scope="col" className="text-right">
              Preço
            </th>
            <th scope="col" className="text-right">
              Total
            </th>
            {allowActions && (
              <th scope="col" className="text-right">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {budget?.items.map(({ id, description, qtd, price }) => {
            return (
              <tr key={description}>
                <td>{description}</td>
                <td className="text-right">{qtd}</td>
                <td className="text-right">{price}</td>
                <td className="text-right">{qtd * price}</td>
                {allowActions && (
                  <td className="flex justify-end space-x-2">
                    <IconButton icon="EditIcon" size="small" color="secondary" />
                    <IconButton
                      icon="TrashIcon"
                      size="small"
                      color="secondary"
                      onClick={() => handleDeleteBudgetItem(id)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="text-right">
            <th scope="row" colSpan={3}>
              Total do Orçamento:
            </th>
            <td>
              {budget?.items?.reduce((acc, item) => {
                return acc + item.qtd * item.price;
              }, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Container>
  );
}

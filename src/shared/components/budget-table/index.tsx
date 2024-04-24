import { useDeleteBudgetItem } from '@core/service/budget-items';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import { CardTitle } from '@shared/design-system/ui/card';
import IconButton from '@shared/design-system/ui/icon-button';

type TBudgetViewTableProps = {
  allowActions?: boolean;
};

export default function BudgetTable({ allowActions = false }: TBudgetViewTableProps) {
  const { budget, refetch } = useBudgetView();
  const { mutate: mutateDeleteBudgetItem } = useDeleteBudgetItem();

  const handleDeleteBudgetItem = async (id: string) => {
    // TODO: add modal
    mutateDeleteBudgetItem(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  if (!budget?.items.length) {
    return (
      <Alert>
        <AlertTitle>
          <p>Nenhum item adicionado no orçamento ainda.</p>
        </AlertTitle>
        <AlertDescription>Preencha o formulário acima para adicionar um item.</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <CardTitle icon="list-ordered" size="lg">
        Itens do Orçamento
      </CardTitle>
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
                    {/* // TODO criar modal para alterar */}
                    <IconButton icon="pencil" size="sm" variant="outline" />
                    <IconButton
                      icon="trash-2"
                      size="sm"
                      variant="outline"
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
    </>
  );
}

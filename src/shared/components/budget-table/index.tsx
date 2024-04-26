import { useState } from 'react';

import type { TBudgetItem } from '@core/api/budget-item/types';
import { useDeleteBudgetItem } from '@core/service/budget-items';
import useBudgetView from '@core/store/context/hooks/useBudgetViewContext';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import { CardTitle } from '@shared/design-system/ui/card';
import IconButton from '@shared/design-system/ui/icon-button';
import Modal from '@shared/design-system/ui/modal';
import { useToast } from '@shared/design-system/ui/use-toast';

type TBudgetViewTableProps = {
  allowActions?: boolean;
};

export default function BudgetTable({ allowActions = false }: TBudgetViewTableProps) {
  const { toast } = useToast();
  const { budget } = useBudgetView();
  const { mutate: mutateDeleteBudgetItem } = useDeleteBudgetItem();

  const [itemToDeleted, setItemToDeleted] = useState<TBudgetItem>();

  const handleDeleteItemClick = async (item: TBudgetItem) => {
    setItemToDeleted(item);
  };

  const handleDeleteItem = () => {
    handleClearItemToDeleted();

    mutateDeleteBudgetItem(itemToDeleted!.id, {
      onError: () => {
        toast({
          title: `Nâo foi possível remover o item '${itemToDeleted?.description}'.`,
          variant: 'destructive',
        });
      },
    });
  };

  const handleClearItemToDeleted = () => {
    setItemToDeleted(undefined);
  };

  console.log({ items: budget?.items, lenght: budget?.items.length });

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
          {budget?.items.map((item) => {
            const { id, description, qtd, price, recordStatus } = item;

            return (
              <tr key={id}>
                <td>{description}</td>
                <td className="text-right">{qtd}</td>
                <td className="text-right">{price}</td>
                <td className="text-right">{qtd * price}</td>
                {allowActions && (
                  <td className="flex justify-end space-x-2">
                    {/* // TODO criar modal para alterar */}
                    <IconButton
                      icon="pencil"
                      size="sm"
                      variant="outline"
                      title="Alterar"
                      disabled={recordStatus === 'pending'}
                    />
                    <IconButton
                      icon="trash-2"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteItemClick(item)}
                      title="Remover"
                      disabled={recordStatus === 'pending'}
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

      <Modal
        open={!!itemToDeleted}
        title={`Confirmação de exclusão`}
        cancelText="Cancelar"
        onConfirmClick={handleDeleteItem}
        onCancelClick={handleClearItemToDeleted}
      >
        <span>
          Você realmente deseja remover o item <b>{itemToDeleted?.description}</b>?
        </span>
      </Modal>
    </>
  );
}

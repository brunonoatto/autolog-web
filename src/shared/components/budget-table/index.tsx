import { ListOrdered, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { TBudgetItem, TFormBudgetItem } from '@core/api/budget-item/types';
import { useDeleteBudgetItem } from '@core/service/budget-items';
import { useUpdateBudgetItem } from '@core/service/budget-items/useUpdateBudgetItem';
import useBudgetViewContext from '@core/store/context/BudgetViewContext/hook';
import { BugdetItemForm } from '@shared/components/budget-item-form';
import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import { Button } from '@shared/design-system/ui/button';
import { CardTitle } from '@shared/design-system/ui/card';
import Modal from '@shared/design-system/ui/modal';
import { useToast } from '@shared/design-system/ui/use-toast';

export const EDITED_BUDGET_ITEM_FORM_ID = 'edited-budget-item-form';

type TBudgetViewTableProps = {
  allowActions?: boolean;
};

export default function BudgetTable({ allowActions = false }: TBudgetViewTableProps) {
  const { toast } = useToast();
  const { budget } = useBudgetViewContext();
  const { mutate: mutateDeleteBudgetItem } = useDeleteBudgetItem();
  const { mutate: mutateUpdateBudgetItem } = useUpdateBudgetItem();

  const [itemToDeleted, setItemToDeleted] = useState<TBudgetItem>();
  const [itemToEdited, setItemToEdited] = useState<TBudgetItem>();

  const budgetTotalValue = useMemo(() => {
    const totalCentsValue =
      budget?.items?.reduce((acc, item) => {
        const centsPrice = item.price * 100;
        return acc + item.qtd * centsPrice;
      }, 0) || 0;

    return totalCentsValue > 0 ? (totalCentsValue / 100).toFixed(2) : 0;
  }, [budget?.items]);

  const handleDeleteItemClick = async (item: TBudgetItem) => {
    setItemToDeleted(item);
  };

  const handleEditItemClick = async (item: TBudgetItem) => {
    setItemToEdited(item);
  };

  const handleDeleteItem = () => {
    handleClearItemToDeleted();

    mutateDeleteBudgetItem(itemToDeleted!.id, {
      onError: () => {
        toast.error(`Nâo foi possível remover o item '${itemToDeleted?.description}'.`);
      },
    });
  };

  const handleEditItem = (editedItem: TFormBudgetItem) => {
    handleClearItemToEdited();

    mutateUpdateBudgetItem(editedItem, {
      onError: () => {
        toast.error(`Nâo foi possível editar o item '${editedItem?.description}'.`);
      },
    });
  };

  const handleClearItemToDeleted = () => {
    setItemToDeleted(undefined);
  };

  const handleClearItemToEdited = () => {
    setItemToEdited(undefined);
  };

  if (!budget?.items.length) {
    return (
      <Alert>
        <AlertTitle>
          <p>Nenhum item adicionado ao orçamento.</p>
        </AlertTitle>
        {allowActions && (
          <AlertDescription>Preencha o formulário acima para adicionar um item.</AlertDescription>
        )}
      </Alert>
    );
  }

  return (
    <>
      <CardTitle icon={ListOrdered} size="lg">
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
              <tr key={id} className=" hover:bg-muted">
                <td>{description}</td>
                <td className="text-right">{qtd}</td>
                <td className="text-right">{price}</td>
                <td className="text-right">{qtd * price}</td>
                {allowActions && (
                  <td className="flex justify-end space-x-2">
                    {/* // TODO criar modal para alterar */}
                    <Button
                      icon={Pencil}
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditItemClick(item)}
                      title="Alterar"
                      disabled={recordStatus === 'pending'}
                    />
                    <Button
                      icon={Trash2}
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
            <td>{budgetTotalValue}</td>
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

      <Modal
        open={!!itemToEdited}
        title={`Edição de item do orçamento`}
        cancelText="Cancelar"
        formId={EDITED_BUDGET_ITEM_FORM_ID}
        onCancelClick={handleClearItemToEdited}
      >
        <BugdetItemForm
          id={EDITED_BUDGET_ITEM_FORM_ID}
          item={itemToEdited}
          onSubmit={handleEditItem}
          showFooter={false}
        />
      </Modal>
    </>
  );
}

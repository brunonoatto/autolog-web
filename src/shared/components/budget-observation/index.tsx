import { MouseEventHandler, useRef, useState } from 'react';

import { Button } from '@shared/design-system/ui/button';
import { CardTitle } from '@shared/design-system/ui/card';
import { Textarea } from '@shared/design-system/ui/textarea';

type TBudgetObservation = {
  observation?: string;
  onEditedCallback?: (newObservation: string) => void;
  isLoading?: boolean;
};
export function BudgetObservation({
  observation,
  onEditedCallback,
  isLoading = false,
}: TBudgetObservation) {
  const observationRef = useRef<HTMLTextAreaElement>(null);
  const [inEditing, setInEditing] = useState(false);

  const handleOnEditing = () => setInEditing(true);

  const handleCancelEdit = () => {
    // if (observationReg.current?.value !== observation) Show Modal "Você perderá os dados alterado."

    setInEditing(false);
  };

  const handleObservationSaveClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    onEditedCallback?.(observationRef.current?.value || '');

    setInEditing(false);
  };

  if (!observation) return null;

  return (
    <>
      <CardTitle icon="notebook-pen" size="lg">
        <div className="flex gap-2">
          <div>Observações</div>

          {onEditedCallback && !inEditing && (
            <Button size="sm" variant="link" onClick={handleOnEditing}>
              Editar
            </Button>
          )}
        </div>
      </CardTitle>

      <div className="flex flex-col items-end gap-2">
        <Textarea ref={observationRef} defaultValue={observation} rows={5} disabled={isLoading} />

        {inEditing && (
          <div className="space-x-2">
            <Button size="sm" variant="outline" disabled={isLoading} onClick={handleCancelEdit}>
              Cancelar edição
            </Button>

            <Button size="sm" isLoading={isLoading} onClick={handleObservationSaveClick}>
              Salvar observação
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

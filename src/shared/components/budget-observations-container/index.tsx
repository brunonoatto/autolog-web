import {
  BudgetObservation,
  type TBudgetObservationProps,
} from '@shared/components/budget-observation';

type TBudgetObservationsContainerProps = {
  observationData: TBudgetObservationProps;
  observationClientData: TBudgetObservationProps;
};

export function BudgetObservationsContainer({
  observationData,
  observationClientData,
}: TBudgetObservationsContainerProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-2">
      <BudgetObservation {...observationData} />

      <BudgetObservation title="Obs. do Cliente" {...observationClientData} />
    </div>
  );
}

import useBudgetAddContext from '@core/store/context/BudgetAddContext/hook';
import ClientCarButton from '@modules/garage/budget-add/car-fields/client-cars/client-car-button';

export default function ClientCars() {
  const selectedClient = useBudgetAddContext((prop) => prop.selectedClient);

  if (!selectedClient || !selectedClient.cars?.length) {
    return null;
  }

  return (
    <div className="col-span-full">
      <div>Veículos do Cliente:</div>
      <div className="flex gap-2 pt-2 overflow-x-auto">
        {selectedClient.cars.map((car) => {
          return (
            // <Tooltip
            //   key={license}
            //   title={
            //     <>
            //       {brand} {model} {year}
            //     </>
            //   }
            // >
            <ClientCarButton key={car.license} car={car} />
            // </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

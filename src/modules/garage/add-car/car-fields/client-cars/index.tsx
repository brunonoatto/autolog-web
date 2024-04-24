import useGarageAddCarContext from '@core/store/context/hooks/useGarageAddCar';
import ClientCarButton from '@modules/garage/add-car/car-fields/client-cars/client-car-button';

export default function ClientCars() {
  const selectedClient = useGarageAddCarContext((prop) => prop.selectedClient);

  if (!selectedClient || !selectedClient.cars?.length) {
    return null;
  }

  return (
    <div className="col-span-full">
      <div>Carros do Cliente:</div>
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

type TIdentificationCarProps = {
  license?: string;
  brand: string;
  model: string;
  year: number;
};

const IdentificationCar = ({ license, brand, model, year }: TIdentificationCarProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between">
      <h3>{license}</h3>
      <div className="hidden md:block text-right">
        <h5> {brand}</h5>
        <h5> {model}</h5>
        <h5> {year}</h5>
      </div>
      <h5 className="block md:hidden">
        {brand}
        {' - '}
        {model}
        {' - '}
        {year}
      </h5>
    </div>
  );
};

export default IdentificationCar;

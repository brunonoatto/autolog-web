type TIdentificationCarProps = {
  license?: string;
  model: string;
  year: number;
};

// TODO: trocar pelo componentes CarInfo
const IdentificationCar = ({ license, model, year }: TIdentificationCarProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between">
      <h3 className="font-semibold">{license}</h3>
      <div className="hidden md:block text-right">
        <h5> {model}</h5>
        <h5> {year}</h5>
      </div>
      <h5 className="block md:hidden">
        {model}
        {' - '}
        {year}
      </h5>
    </div>
  );
};

export default IdentificationCar;

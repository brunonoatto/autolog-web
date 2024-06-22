import { twMerge } from 'tailwind-merge';

export type TClientInfoProps = {
  cpfCnpj: string;
  name: string;
  phone: string;
  className?: string;
};

export default function ClientInfo({ className, cpfCnpj, name, phone }: TClientInfoProps) {
  return (
    <div className={twMerge('px-2', className)}>
      <div className="flex gap-2">
        CPF/CNPJ:
        <h3 className="font-semibold">{cpfCnpj}</h3>
      </div>
      <div className="flex gap-2">
        Nome:
        <h3 className="font-semibold">{name}</h3>
      </div>
      <div className="flex gap-2">
        Telefone:
        <h3 className="font-semibold">{phone}</h3>
      </div>
    </div>
  );
}

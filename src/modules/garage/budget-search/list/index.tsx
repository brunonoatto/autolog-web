import { ROUTES_PATH } from '@core/router/consts';
import { useListBudgets } from '@core/service/budget';
import StatusBadge from '@shared/components/status-badge';
import { useNavigate } from 'react-router-dom';

export default function ListBudgets() {
  const navigate = useNavigate();
  const { data } = useListBudgets();

  const handleBudgetSelected = (os: string) => {
    navigate(`${ROUTES_PATH.bugget}/${os}`);
  };

  return (
    <>
      <h2>Orçamentos ({data?.length || 0})</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th scope="col">Placa</th>
            <th scope="col">Nome</th>
            <th scope="col">Modelo</th>
            <th scope="col" className="text-right">
              Data entrada
            </th>
            <th scope="col" className="text-right">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ os, license, name, status }) => {
            return (
              <tr
                key={os}
                className="hover:bg-opacity-20 hover:bg-teal-500 hover:cursor-pointer"
                onClick={() => handleBudgetSelected(os)}
              >
                <td>{license}</td>
                <td>{name}</td>
                <td>{'MODELO'}</td>
                <td className="text-right">{'DATA'}</td>
                <td className="text-right">
                  <StatusBadge status={status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

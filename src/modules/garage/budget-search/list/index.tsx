import { useNavigate } from 'react-router-dom';

import { ROUTES_PATH } from '@core/router/consts';
import { useListBudgets } from '@core/service/budget';
import Container from '@shared/components/container';
import StatusBadge from '@shared/components/status-badge';

export default function ListBudgets() {
  const navigate = useNavigate();
  const { data: budgets } = useListBudgets();

  const handleBudgetSelected = (os: string) => {
    navigate(`${ROUTES_PATH.garageBudgetView}/${os}`);
  };

  return (
    <Container border title={`Orçamentos (${budgets?.length || 0})`}>
      <table className="text-sm border-separate border-spacing-y-2 border-y-teal-700">
        <thead>
          <tr className="border-y-2 border-teal-800 text-left">
            <th scope="col">Automóvel</th>
            <th scope="col">Nome</th>
            <th scope="col" className="text-right">
              Data entrada
            </th>
            <th scope="col" className="text-right">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {budgets?.map(({ os, createdDate, license, clientName, status, car: { model } }) => {
            return (
              <tr
                key={os}
                className="border-b-2 border-teal-800 hover:bg-opacity-20 hover:bg-teal-500 hover:cursor-pointer"
                onClick={() => handleBudgetSelected(os)}
              >
                <td>
                  {license} - {model}
                </td>
                <td>{clientName}</td>
                <td className="text-right">{createdDate}</td>
                <td className="text-right">
                  <StatusBadge status={status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}

import HomeLink from '@layout/body-app/header/home-link';
import ClientBudgetView from '@modules/client/budget-view';
import { ClientRegisterCard } from '@shared/components/client-register-card';

export default function ClientBudgetAction() {
  return (
    <div className="w-full max-w-[650px] pt-4 px-4 md:px-0 mx-auto space-y-4 ">
      <HomeLink />

      <ClientRegisterCard />

      <ClientBudgetView />
    </div>
  );
}

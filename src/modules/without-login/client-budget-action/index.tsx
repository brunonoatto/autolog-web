import HomeLink from '@layout/body-app/header/home-link';
import { WithoutLoginMain } from '@layout/without-login-main';
import ClientBudgetView from '@modules/client/budget-view';
import { ClientRegisterCard } from '@shared/components/client-register-card';

export default function ClientBudgetAction() {
  return (
    <WithoutLoginMain>
      <HomeLink />

      <ClientRegisterCard />

      <ClientBudgetView />
    </WithoutLoginMain>
  );
}

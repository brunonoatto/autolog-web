import HomeLink from '@layout/body-app/header/home-link';
import { WithoutLoginMain } from '@layout/without-login-main';
import { ClientRegisterCard } from '@shared/components/client-register-card';
import { Card, CardDescription, CardHeader, CardTitle } from '@shared/design-system/ui/card';

export default function BudgetApproved() {
  return (
    <WithoutLoginMain>
      <HomeLink />

      <Card border>
        <CardHeader>
          <CardTitle>Orçamento Aprovado!</CardTitle>
          <CardDescription>Oba! Você aprovou o orçamento do seu veículo.</CardDescription>
        </CardHeader>
      </Card>

      <ClientRegisterCard />
    </WithoutLoginMain>
  );
}

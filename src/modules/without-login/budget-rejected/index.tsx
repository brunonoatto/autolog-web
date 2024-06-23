import HomeLink from '@layout/body-app/header/home-link';
import { WithoutLoginMain } from '@layout/without-login-main';
import { ClientRegisterCard } from '@shared/components/client-register-card';
import { Card, CardDescription, CardHeader, CardTitle } from '@shared/design-system/ui/card';

export default function BudgetRejected() {
  return (
    <WithoutLoginMain>
      <HomeLink />

      <Card border>
        <CardHeader>
          <CardTitle>Orçamento Rejeitado!</CardTitle>
          <CardDescription>
            Você rejeitou o orçamento enviado, já enviamos para a mecânica realizar as alterações
            solicitadas.
          </CardDescription>
        </CardHeader>
      </Card>

      <ClientRegisterCard />
    </WithoutLoginMain>
  );
}

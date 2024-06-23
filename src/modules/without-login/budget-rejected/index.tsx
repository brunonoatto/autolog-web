import HomeLink from '@layout/body-app/header/home-link';
import { ClientRegisterCard } from '@shared/components/client-register-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';

export default function BudgetRejected() {
  return (
    <div className="w-full max-w-[650px] pt-4 px-4 md:px-0 mx-auto space-y-4 ">
      <HomeLink />

      <Card>
        <CardHeader>
          <CardTitle>Orçamento Rejeitado!</CardTitle>
          <CardDescription>
            Você rejeitou o orçamento enviado, já enviamos para a mecânica realizar as alterações
            solicitadas.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ClientRegisterCard />
        </CardContent>
      </Card>
    </div>
  );
}

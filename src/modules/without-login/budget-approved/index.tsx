import HomeLink from '@layout/body-app/header/home-link';
import { ClientRegisterCard } from '@shared/components/client-register-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@shared/design-system/ui/card';

export default function BudgetApproved() {
  return (
    <div className="w-full max-w-[650px] pt-4 px-4 md:px-0 mx-auto space-y-4 ">
      <HomeLink />
      <Card>
        <CardHeader>
          <CardTitle>Orçamento Aprovado!</CardTitle>
          <CardDescription>Oba! Você aprovou o orçamento do seu veículo.</CardDescription>
        </CardHeader>

        <CardContent>
          <ClientRegisterCard />
        </CardContent>
      </Card>
    </div>
  );
}

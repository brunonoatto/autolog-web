import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import LinkButton from '@shared/design-system/ui/link-button';

export function ClientRegisterCard() {
  return (
    <Alert variant="primary">
      <AlertTitle>
        Você quer consultar a qualquer momento este e outros orçamentos do seu veículo?.
      </AlertTitle>
      <AlertDescription className="space-y-4">
        <p>
          Clique no botão abaixo para se cadastrar de GRAÇA e ter todos os dados do seu veículo
          centralizado em um só lugar.
        </p>
        <div className="block">
          <LinkButton className="" size="lg" variant="outline-active" to="/cadastro-cliente">
            Fazer cadastro GRÁTIS.
          </LinkButton>
        </div>
      </AlertDescription>
    </Alert>
  );
}

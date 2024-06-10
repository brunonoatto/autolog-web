import { Alert, AlertDescription, AlertTitle } from '@shared/design-system/ui/alert';
import LinkButton from '@shared/design-system/ui/link-button';

export function NotFoundCars() {
  return (
    <Alert>
      <AlertTitle>Você não possui nenhum veículo cadastrado.</AlertTitle>
      <AlertDescription>
        <LinkButton icon="car" to="/cliente/cadastrar-veiculo">
          Cadastrar seu veículo
        </LinkButton>
      </AlertDescription>
    </Alert>
  );
}

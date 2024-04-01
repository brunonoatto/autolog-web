import LinkButton from '@shared/design-system/link-button';

import GoBackButton from '../go-back-button';

export default function NotFoundRoute() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div>Ops...pagina não encontrada</div>
      <span className="flex gap-4">
        <GoBackButton />
        <LinkButton to="/">Home</LinkButton>
      </span>
    </div>
  );
}

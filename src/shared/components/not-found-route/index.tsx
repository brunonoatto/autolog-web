import GoBackButton from '../go-back-button';
import LinkButton from '../link-button';

const NotFoundRoute = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div>Ops...pagina não encontrada</div>
      <span className="flex gap-4">
        <GoBackButton />
        <LinkButton to="/">Home</LinkButton>
      </span>
    </div>
  );
};

export default NotFoundRoute;

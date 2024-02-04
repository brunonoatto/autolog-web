import GoBackButton from '../go-back-button';

const ErrorBoundary = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div>Rota não encontrada</div>
      <GoBackButton />
    </div>
  );
};

export default ErrorBoundary;

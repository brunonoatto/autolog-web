import { useLoadingStore } from '@core/store/hooks';
import LoadingIcon from '@shared/components/loading-icon';
import Portal from '@shared/design-system/ui/portal';

type TBigSpinnerProps = { open?: boolean };

export default function BigSpinner({ open }: TBigSpinnerProps) {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <Portal open={open || isLoading}>
      <div className="m-auto w-48 bg-background text-center rounded-xl p-6 space-y-4">
        <LoadingIcon />
        <div className="text-primary text-xl">Carregando...</div>
      </div>
    </Portal>
  );
}

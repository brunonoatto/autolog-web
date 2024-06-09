import { useLoadingStore } from '@core/store/hooks';
import LoadingCard from '@shared/components/loading-card';
import Portal from '@shared/design-system/ui/portal';

type TBigSpinnerProps = { open?: boolean };

export default function BigSpinner({ open }: TBigSpinnerProps) {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <Portal open={open || isLoading}>
      <LoadingCard />
    </Portal>
  );
}

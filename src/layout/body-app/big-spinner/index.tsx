import { useLoadingStore } from '@core/store/hooks';
import Icon from '@shared/design-system/Icon';
import Portal from '@shared/design-system/portal';

export default function BigSpinner() {
  const isLoading = useLoadingStore((props) => props.isLoading);

  return (
    <Portal open={isLoading}>
      <div className="relative top-1/3 m-auto w-48 bg-neutral-800 text-center rounded-xl py-4">
        <Icon name="LoadingIcon" />
        <div className="text-teal-400">Carregando...</div>
      </div>
    </Portal>
  );
}

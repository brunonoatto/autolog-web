import { useLoadingStore } from '@core/store/hooks';
import Icon from '@shared/components/Icon';
import Portal from '../../../../shared/components/portal';

const BigSpinner = () => {
  const isLoading = useLoadingStore((props) => props.isLoading);

  return (
    <Portal open={true || isLoading}>
      <div className="relative top-1/4 m-auto w-48 bg-neutral-800 text-center rounded-xl py-4">
        <Icon icon="LoadingIcon" />
        <div className="text-teal-400">Carregando...</div>
      </div>
    </Portal>
  );
};

export default BigSpinner;

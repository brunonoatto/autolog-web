import { useLoadingStore } from '@core/store/hooks';
import Icon from '@shared/components/Icon';

const Loading = () => {
  const isLoading = useLoadingStore((props) => props.isLoading);

  if (!isLoading) return null;

  return (
    <div className="absolute h-full w-full bg-neutral-100 bg-opacity-20 z-50 ">
      <div className="relative top-1/4 m-auto opacity-80 w-48 bg-neutral-800 text-center rounded-xl py-4">
        <Icon icon="LoadingIcon" />
        <div className="text-teal-400">Carregando...</div>
      </div>
    </div>
  );
};

export default Loading;

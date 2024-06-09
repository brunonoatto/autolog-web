import { twMerge } from 'tailwind-merge';

import LoadingIcon from '@shared/components/loading-icon';

type TLoadingIconProps = {
  className?: string;
};

export default function LoadingCard({ className }: TLoadingIconProps) {
  return (
    <div
      className={twMerge(
        'm-auto w-48 bg-background text-center rounded-xl p-6 space-y-4',
        className,
      )}
    >
      <LoadingIcon />
      <div className="text-primary text-xl">Carregando...</div>
    </div>
  );
}

import { ElementType, Suspense } from 'react';

type TSize = 'sm' | 'default' | 'lg';
const sizeData: { [key in TSize]: number } = {
  sm: 20,
  default: 26,
  lg: 34,
};

export type TIcons = ElementType;
export type TIconProps = {
  component: TIcons;
  size?: TSize;
  className?: string;
};

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />;

export default function Icon({
  component: Component,
  size = 'default',
  ...otherProps
}: TIconProps) {
  return (
    <Suspense fallback={fallback}>
      <Component {...otherProps} width={sizeData[size]} />
    </Suspense>
  );
}

import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';

type TSize = 'sm' | 'default' | 'lg';
const sizeData: { [key in TSize]: number } = {
  sm: 20,
  default: 26,
  lg: 34,
};

export type TIcons = keyof typeof dynamicIconImports;
export type TIconProps = Omit<LucideProps, 'ref'> & {
  name: TIcons;
  size?: TSize;
};

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />;

export default function Icon({ name, size = 'default', ...otherProps }: TIconProps) {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...otherProps} width={sizeData[size]} />
    </Suspense>
  );
}

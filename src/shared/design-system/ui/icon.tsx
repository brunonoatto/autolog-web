import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';

export type TIcons = keyof typeof dynamicIconImports;
export type TIconProps = Omit<LucideProps, 'ref'> & {
  name: TIcons;
};

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />;

export default function Icon({ name, ...otherProps }: TIconProps) {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...otherProps} />
    </Suspense>
  );
}

import { PropsWithChildren } from 'react';

type TPortalProps = PropsWithChildren & { open: boolean };
const Portal = ({ children, open }: TPortalProps) => {
  if (!open) return null;

  return <div className="absolute inset-0 bg-neutral-100 bg-opacity-20 z-50">{children}</div>;
};

export default Portal;

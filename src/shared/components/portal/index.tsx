import { PropsWithChildren } from 'react';

type TPortalProps = PropsWithChildren & { open: boolean };
const Portal = ({ children, open }: TPortalProps) => {
  if (!open) return null;

  // TODO: absolute tbm funciona
  return <div className="fixed inset-0 bg-neutral-100 bg-opacity-20">{children}</div>;
};

export default Portal;

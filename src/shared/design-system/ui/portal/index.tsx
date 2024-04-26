import { PropsWithChildren } from 'react';

type TPortalProps = PropsWithChildren & { open: boolean };
const Portal = ({ children, open }: TPortalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 grid overflow-y-auto bg-neutral-100/80 dark:bg-neutral-100/10">
      {children}
    </div>
  );
};

export default Portal;

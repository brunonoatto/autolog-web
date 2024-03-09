import type { FunctionComponent, PropsWithChildren } from 'react';

import { twMerge } from 'tailwind-merge';

type TCard = PropsWithChildren & {
  title?: string;
  className?: string;
};

const Card: FunctionComponent<TCard> = ({ title, children, className }) => {
  return (
    <div className={twMerge('border-2 border-teal-800 rounded-lg p-2', className)}>
      {title && <h2>{title}</h2>}
      <div className="my-2">{children}</div>
    </div>
  );
};

export default Card;

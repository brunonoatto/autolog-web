import { RefObject, useEffect } from 'react';

type TUseOutsideClickProps = {
  ref: RefObject<HTMLDivElement>;
  action: () => void;
};
const useOutsideClick = ({ ref, action }: TUseOutsideClickProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
        action?.();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [action, ref]);
};

export default useOutsideClick;

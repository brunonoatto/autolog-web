import { useNavigate } from 'react-router-dom';

import IconButton from '../icon-button';
import { useRef } from 'react';
import useOutsideClick from '@shared/hooks/useOutsideClick';

type TMenuContentItem = {
  route?: string;
  onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
  title: string;
  dividerTop?: boolean;
};
type TMenuContentProps = React.HTMLAttributes<HTMLButtonElement> & {
  items: TMenuContentItem[];
};

const MenuContent = ({ items, ...otherPops }: TMenuContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleToogleContentClick = () => {
    const menuList = document.getElementById('menu-content');
    menuList?.classList.toggle('hidden');
  };

  const handleCloseMenu = () => {
    const menuList = document.getElementById('menu-content');
    menuList?.classList.add('hidden');
  };

  const handleMenuClick =
    (route: TMenuContentItem['route'], onClick: TMenuContentItem['onClick']): TMenuContentItem['onClick'] =>
    (e) => {
      handleCloseMenu();
      onClick?.(e);

      if (route) {
        navigate(route);
      }
    };

  useOutsideClick({ ref, action: handleCloseMenu });

  return (
    <div ref={ref}>
      <IconButton id="menu-content-button" icon="ArrowDownLineIcon" onClick={handleToogleContentClick} {...otherPops} />

      <div
        id="menu-content"
        className="absolute hidden min-w-36 top-14 right-3 p-2 text-md font-semibold text-neutral-200 bg-neutral-700 space-y-1 rounded-lg"
      >
        {items.map(({ title, route, dividerTop, onClick }) => (
          <div key={route} className={`py-1 ${dividerTop ? 'border-t-2 border-teal-800' : ''}`}>
            <button
              className={`block w-full p-2 rounded-lg ring-teal-300 hover:ring-2`}
              onClick={handleMenuClick(route, onClick)}
            >
              {title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuContent;

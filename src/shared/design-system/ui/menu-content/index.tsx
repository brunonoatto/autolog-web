import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@shared/design-system/ui/button';
import IconButton, { TIconButtonProps } from '@shared/design-system/ui/icon-button';
import useOutsideClick from '@shared/hooks/useOutsideClick';

const handleToogleContentClick = () => {
  const menuList = document.getElementById('menu-content');
  menuList?.classList.toggle('hidden');
};

const handleCloseMenu = () => {
  const menuList = document.getElementById('menu-content');
  menuList?.classList.add('hidden');
};

type TMenuContentItem = {
  route?: string;
  onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
  title: string;
  dividerTop?: boolean;
};

type TMenuContentProps = TIconButtonProps & {
  items: TMenuContentItem[];
};

const MenuContent = ({ items, ...otherPops }: TMenuContentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useOutsideClick({ ref, action: handleCloseMenu });

  const handleMenuClick =
    (
      route: TMenuContentItem['route'],
      onClick: TMenuContentItem['onClick'],
    ): TMenuContentItem['onClick'] =>
    (e) => {
      handleCloseMenu();

      onClick?.(e);

      if (route) {
        navigate(route);
      }
    };

  return (
    <div ref={ref}>
      <IconButton
        id="menu-content-button"
        variant="outline"
        size="sm"
        onClick={handleToogleContentClick}
        {...otherPops}
      />

      <div
        id="menu-content"
        className="absolute hidden min-w-36 top-14 right-3 p-2 text-md font-semibold text-neutral-200 bg-neutral-700 space-y-1 rounded-lg"
      >
        {items.map(({ title, route, dividerTop, onClick }) => (
          <div
            key={title}
            data-divider-top={dividerTop}
            className="py-1 data-[divider-top=true]:border-t-2 data-[divider-top=true]:border-teal-800"
          >
            <Button className="w-full" variant={'ghost'} onClick={handleMenuClick(route, onClick)}>
              {title}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuContent;

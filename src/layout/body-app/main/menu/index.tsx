import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import IconButton from '@shared/design-system/ui/icon-button';
import LinkButton from '@shared/design-system/ui/link-button';

import type { TMenu } from './types';

type TMenuProps = { items: TMenu[] };

const toogleMenu = () => {
  const menuList = document.getElementById('menu-list');
  menuList?.classList.toggle('hidden');
  /* Como está sendo usado o mobile first, precisei fazer o toogle
    no flex pq o tailwind não permite colocar 'hidden e flex' ao
    mesmo tempo, e o elemento precisa iniciar como hidden no mobile */
  menuList?.classList.toggle('flex');
};

const closeMenu = () => {
  const menuList = document.getElementById('menu-list');
  menuList?.classList.add('hidden');
  menuList?.classList.remove('flex');
};

const Menu = ({ items }: TMenuProps) => {
  const { pathname } = useLocation();

  const handleMobileMenuClick = () => {
    toogleMenu();
  };

  useEffect(() => {
    // somente quando for mobile
    if (window.innerWidth <= 768) {
      closeMenu();
    }
  }, [pathname]);

  return (
    <nav className="p-4 md:p-0 md:w-60 md:border-r-[1px] md:rounded-xl">
      <div className="flex justify-end md:hidden" aria-label="Menu" aria-expanded="false">
        <IconButton variant="outline" icon="menu" onClick={handleMobileMenuClick} />
      </div>

      <div id="menu-list" className="hidden md:flex flex-col gap-6 pt-6 px-4">
        {items.map(({ route, title, icon }) => (
          <LinkButton
            key={route}
            className="md:justify-start"
            variant={pathname.endsWith(route) ? 'outline-active' : 'outline'}
            to={route}
            icon={icon}
          >
            {title}
          </LinkButton>
        ))}
      </div>
    </nav>
  );
};

export default Menu;

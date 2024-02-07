import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { MenuIcon } from '@assets/icons';
import type { TMenu } from './types';
import MenuItem from './menu-item';
import styles from './styles.module.css';
import Icon from '@shared/components/Icon';
import IconButton from '@shared/components/icon-button';

type TMenuProps = { menus: TMenu[] };

const toogleMenu = () => {
  const menuList = document.getElementById('menu-list');
  menuList?.classList.toggle('hidden');
  /* Como está sendo usado o mobile first, precisei fazer o toogle
    no flex pq o tailwind não permite colocar 'hidden e flex' ao
    mesmo tempo, e o elemento precisa iniciar como hidden no mobile */
  menuList?.classList.toggle('flex');
};

const Menu = ({ menus }: TMenuProps) => {
  const { pathname } = useLocation();

  const handleMobileMenuClick = () => {
    toogleMenu();
  };

  useEffect(() => {
    // somente quando for mobile
    if (window.innerWidth <= 768) {
      toogleMenu();
    }
  }, [pathname]);

  return (
    <nav className={styles.content}>
      <div className="flex justify-end md:hidden" aria-label="Menu" aria-expanded="false">
        <IconButton icon="MenuIcon" onClick={handleMobileMenuClick} />
      </div>
      <div id="menu-list" className="hidden md:flex flex-col gap-6 pt-6">
        {menus.map((menu) => (
          <MenuItem key={menu.route} isActive={pathname.includes(`/${menu.route}`)} {...menu} />
        ))}
      </div>
    </nav>
  );
};

export default Menu;

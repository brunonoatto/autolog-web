import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import IconButton from '@shared/components/icon-button';
import MenuItem from './menu-item';
import type { TMenu } from './types';
import styles from './styles.module.css';

type TMenuProps = { menus: TMenu[] };

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

const Menu = ({ menus }: TMenuProps) => {
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

import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import type { TMenu } from './types';
import MenuItem from './menu-item';
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
        <button onClick={handleMobileMenuClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 50 50"
            className="fill-neutral-200"
          >
            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
          </svg>
        </button>
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

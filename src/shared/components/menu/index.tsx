import type { TMenu } from './types';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

type TMenuProps = { menus: TMenu[] };

const Menu = ({ menus }: TMenuProps) => {
  const handleMobileMenuClick = () => {
    document.getElementById('menu')?.classList.toggle('hidden');
    /* Como está sendo usado o mobile first, precisei fazer o toogle
     no flex pq o tailwind não permite colocar 'hidden e flex' ao
     mesmo tempo, e o elemento precisa iniciar como hidden no mobile */
    document.getElementById('menu')?.classList.toggle('flex');
  };

  return (
    <nav className="md:w-60">
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
      <div id="menu" className="hidden md:flex flex-col pr-2 gap-2">
        {menus.map((menu) => (
          <Link key={menu.route} className={styles.link} to={menu.route}>
            {menu.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Menu;

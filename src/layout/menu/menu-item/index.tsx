import { Link } from 'react-router-dom';

import type { TMenu } from '../types';
import styles from './styles.module.css';

type TMenuItemProps = TMenu & { isActive: boolean };
const MenuItem = ({ route, title, isActive }: TMenuItemProps) => {
  const isActiveClass = isActive ? styles.isActive : '';

  return (
    <Link key={route} className={`${styles.content} ${isActiveClass}`} to={route}>
      {title}
    </Link>
  );
};

export default MenuItem;

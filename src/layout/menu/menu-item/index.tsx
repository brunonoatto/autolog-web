import { Link } from 'react-router-dom';

import type { TMenu } from '../types';
import styles from './styles.module.css';

type TMenuItemProps = TMenu & { isActive: boolean };
const MenuItem = ({ route, title, isActive }: TMenuItemProps) => {
  return (
    <Link key={route} data-active={isActive} className={styles.content} to={route}>
      {title}
    </Link>
  );
};

export default MenuItem;

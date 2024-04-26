import { cn } from '@shared/design-system-utils';

import styles from './styles.module.css';

export default function DashboardButton({
  className = 'md:min-h-32',
  ...otherProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(styles.container, className)} {...otherProps}></button>;
}

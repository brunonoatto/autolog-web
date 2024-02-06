import { forwardRef } from 'react';

import styles from './styles.module.css';

export type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

const Input = forwardRef<HTMLInputElement, TInputProps>(({ label, error, className = '', ...inputProps }, ref) => {
  return (
    <label className={styles.label}>
      {label}: <input ref={ref} className={`${className} ${styles.input}`} {...inputProps} />
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
});

export default Input;

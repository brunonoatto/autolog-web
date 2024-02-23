import { forwardRef } from 'react';

import styles from '../styles.module.css';

export type TInputNumberProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

const InputNumber = forwardRef<HTMLInputElement, TInputNumberProps>(
  ({ label, error, className = '', ...inputProps }, ref) => {
    return (
      <label className={styles.label}>
        {label}: <input ref={ref} type="number" className={`${className} ${styles.input}`} {...inputProps} />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default InputNumber;

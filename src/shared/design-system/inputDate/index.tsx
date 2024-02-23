import { forwardRef } from 'react';

import styles from '../styles.module.css';

export type TInputDateProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

const InputDate = forwardRef<HTMLInputElement, TInputDateProps>(
  ({ label, error, className = '', ...inputProps }, ref) => {
    return (
      <label className={styles.label}>
        {label}: <input ref={ref} type="date" className={`${className} ${styles.input}`} {...inputProps} />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default InputDate;

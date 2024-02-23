import { forwardRef } from 'react';

import styles from '../styles.module.css';

export type TTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string };

const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(
  ({ label, error, className = '', ...inputProps }, ref) => {
    return (
      <label className={styles.label}>
        {label}: <textarea ref={ref} className={`${className} leading-4 ${styles.input}`} {...inputProps} />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default Textarea;

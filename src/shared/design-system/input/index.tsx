import { forwardRef } from 'react';

import styles from '../styles.module.css';

export type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ label, error, labelProps = {}, ...inputProps }, ref) => {
    const { className: inputClass = '', ...otherInputProps } = inputProps;
    const { className: labelClass = '', ...otherLabelProps } = labelProps;

    return (
      <label className={`${labelClass} ${styles.label}`} {...otherLabelProps}>
        {label}:{' '}
        <input ref={ref} className={`${inputClass} ${styles.input}`} {...otherInputProps} />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default Input;

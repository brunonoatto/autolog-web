import { forwardRef } from 'react';

import styles from '../styles.module.css';
import { twMerge } from 'tailwind-merge';

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
      <label className={twMerge(styles.label, labelClass)} {...otherLabelProps}>
        {label}:{' '}
        <input ref={ref} className={twMerge(styles.input, inputClass)} {...otherInputProps} />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default Input;

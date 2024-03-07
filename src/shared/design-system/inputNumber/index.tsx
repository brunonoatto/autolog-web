import { forwardRef } from 'react';

import type { TInputProps } from '../input';
import styles from '../styles.module.css';
import { twMerge } from 'tailwind-merge';

const InputNumber = forwardRef<HTMLInputElement, TInputProps>(
  ({ label, error, labelProps = {}, ...inputProps }, ref) => {
    const { className: inputClass, ...otherInputProps } = inputProps || {};
    const { className: labelClass, ...otherLabelProps } = labelProps;

    return (
      <label className={twMerge(styles.label, labelClass)} {...otherLabelProps}>
        {label}:{' '}
        <input
          ref={ref}
          type="number"
          className={twMerge(styles.input, inputClass)}
          {...otherInputProps}
        />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default InputNumber;

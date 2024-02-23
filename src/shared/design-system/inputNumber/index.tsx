import { forwardRef } from 'react';

import type { TInputProps } from '../input';
import styles from '../styles.module.css';

const InputNumber = forwardRef<HTMLInputElement, TInputProps>(
  ({ label, error, labelProps = {}, inputProps = {} }, ref) => {
    const { className: inputClass = '', ...otherInputProps } = inputProps;
    const { className: labelClass = '', ...otherLabelProps } = labelProps;

    return (
      <label className={`${labelClass} ${styles.label}`} {...otherLabelProps}>
        {label}:{' '}
        <input
          ref={ref}
          type="number"
          className={`${inputClass} ${styles.input}`}
          {...otherInputProps}
        />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default InputNumber;

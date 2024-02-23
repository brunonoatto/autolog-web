import { forwardRef } from 'react';

import styles from '../styles.module.css';

export type TTextareaProps = {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  label: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(
  ({ label, error, labelProps = {}, inputProps = {} }, ref) => {
    const { className: inputClass = '', ...otherInputProps } = inputProps;
    const { className: labelClass = '', ...otherLabelProps } = labelProps;

    return (
      <label className={`${labelClass} ${styles.label}`} {...otherLabelProps}>
        {label}:{' '}
        <textarea
          ref={ref}
          className={`${inputClass} leading-4 ${styles.input}`}
          {...otherInputProps}
        />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default Textarea;

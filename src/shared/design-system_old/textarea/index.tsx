import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from '../styles.module.css';

export type TTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  label: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TTextareaProps>(
  ({ label, error, labelProps = {}, ...inputProps }, ref) => {
    const { className: inputClass, ...otherInputProps } = inputProps;
    const { className: labelClass, ...otherLabelProps } = labelProps;

    return (
      <label className={twMerge(styles.label, labelClass)} {...otherLabelProps}>
        {label}:{' '}
        <textarea
          ref={ref}
          className={twMerge('leading-4', styles.input, inputClass)}
          {...otherInputProps}
        />
        {error && <p className={styles.error}>{error}</p>}
      </label>
    );
  },
);

export default Textarea;

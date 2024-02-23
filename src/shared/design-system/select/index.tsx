import { forwardRef } from 'react';

import styles from '../styles.module.css';

export type TSelectOption = { value: string | number; title: string };

export type TSelectDefaultProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string };

export type TSelectProps = TSelectDefaultProps & {
  options: TSelectOption[];
};

const Select = forwardRef<HTMLSelectElement, TSelectProps>(({ label, error, options, ...props }, ref) => {
  return (
    <label htmlFor={props.id} className={styles.label}>
      {label}
      <select ref={ref} {...props}>
        <option value=""></option>
        {options?.map(({ value, title }) => <option key={value} value={value} label={title} />)}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
});

export default Select;

import { twMerge } from 'tailwind-merge';

type TButtonProps = React.HTMLAttributes<HTMLButtonElement> & { color?: 'primary' | 'secondary' };
const Button = ({ className, color = 'primary', ...otherProps }: TButtonProps) => {
  if (color === 'primary') {
    return (
      <button
        className={twMerge(
          'text-white bg-teal-800 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none',
          className,
        )}
        {...otherProps}
      />
    );
  } else {
    return (
      <button
        className={twMerge(
          'text-white hover:text-teal-300 ring-1 ring-white hover:ring-teal-300 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none',
          className,
        )}
        {...otherProps}
      />
    );
  }
};

export default Button;

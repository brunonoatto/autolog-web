import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'text-white font-medium text-sm rounded-lg px-5 py-2.5 focus:ring-2 focus:ring-teal-300 focus:outline-none',
  variants: {
    color: {
      primary: 'bg-teal-800 hover:bg-teal-700',
      secondary: 'ring-1 ring-white hover:ring-teal-300 hover:text-teal-300',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type TButtonProps = React.HTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
const Button = ({ className, color = 'primary', ...otherProps }: TButtonProps) => {
  return <button className={buttonVariants({ color, className })} {...otherProps} />;
};

export default Button;

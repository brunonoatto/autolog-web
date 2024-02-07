const Button = ({ className = '', ...otherProps }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800 ${className}`}
      {...otherProps}
    />
  );
};

export default Button;

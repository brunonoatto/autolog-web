const Button = ({ className = '', ...otherProps }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`text-white bg-teal-800 hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none ${className}`}
      {...otherProps}
    />
  );
};

export default Button;

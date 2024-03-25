import { twMerge } from 'tailwind-merge';

type TContainerProps = {
  children: React.ReactNode;
  title: string;
  className?: string;
};

export default function Container({ children, title, className }: TContainerProps) {
  return (
    <div className={twMerge('rounded-lg border-2 border-teal-700 p-2 space-y-4', className)}>
      {title && <h2 className="border-b-2 border-teal-800 w-3/4">{title}</h2>}
      {children}
    </div>
  );
}

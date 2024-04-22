type TTooltipProps = {
  children: React.ReactNode;
  title: React.ReactNode;
};

export default function Tooltip({ children, title }: TTooltipProps) {
  return (
    <div className="relative group group-hover">
      {children}
      <div className="hidden group-hover:block text-left absolute bg-neutral-900 ring-1 ring-teal-600 min-w-80 p-2">
        {title}
      </div>
    </div>
  );
}

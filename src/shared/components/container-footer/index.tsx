type TContainerFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContainerFooter({ children, className }: TContainerFooterProps) {
  return <div className={className}>{children}</div>;
}

import { Button, TButtonProps } from '@shared/design-system/ui/button';

type THoverButton = TButtonProps & {
  isSelected?: boolean;
};

// TODO: melhorar o nome deste componente
export function HoverButton({ isSelected, ...otherProps }: THoverButton) {
  return (
    <Button
      type="button"
      variant="ghost"
      data-selected={isSelected}
      className="block p-0 h-full duration-300 data-[selected=true]:col-span-full data-[selected=true]:hover:bg-background data-[selected=true]:hover:cursor-default"
      {...otherProps}
    />
  );
}

import type { TRoute } from '@core/router/consts';
import IconButton, { type TIconButtonProps } from '@shared/design-system/ui/icon-button';
import {
  handleCloseMenuContent,
  handleToogleMenuContent,
} from '@shared/design-system/ui/menu-content/helpers';
import MenuContentList from '@shared/design-system/ui/menu-content/menu-content-list';
import useOutsideClick from '@shared/hooks/useOutsideClick';

export type TMenuContentItem = {
  route?: TRoute;
  onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
  title: string;
  dividerTop?: boolean;
};

export type TMenuContentProps = TIconButtonProps & {
  items: TMenuContentItem[];
};

export default function MenuContent({ items, ...otherPops }: TMenuContentProps) {
  const ref = useOutsideClick(handleCloseMenuContent);

  return (
    <div ref={ref}>
      <IconButton variant="outline" size="sm" onClick={handleToogleMenuContent} {...otherPops} />

      <MenuContentList items={items} />
    </div>
  );
}

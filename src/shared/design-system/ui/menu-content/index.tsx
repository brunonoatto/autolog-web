import type { TRoute } from '@core/router/consts';
import { Button, TButtonProps } from '@shared/design-system/ui/button';
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

export type TMenuContentProps = TButtonProps & {
  items: TMenuContentItem[];
};

export default function MenuContent({ items, ...otherPops }: TMenuContentProps) {
  const ref = useOutsideClick(handleCloseMenuContent);

  return (
    <div ref={ref}>
      <Button variant="outline" size="sm" onClick={handleToogleMenuContent} {...otherPops} />

      <MenuContentList items={items} />
    </div>
  );
}

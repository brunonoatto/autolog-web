import { Button } from '@shared/design-system/ui/button';
import {
  type TMenuContentItem,
  type TMenuContentProps,
} from '@shared/design-system/ui/menu-content';
import {
  handleCloseMenuContent,
  MENU_CONTENT_ID,
} from '@shared/design-system/ui/menu-content/helpers';
import useNavigateCustom from '@shared/hooks/useNavigateCustom';

type TMenuContentListProps = {
  items: TMenuContentProps['items'];
};

export default function MenuContentList({ items }: TMenuContentListProps) {
  const navigate = useNavigateCustom();

  const handleMenuClick =
    (
      route: TMenuContentItem['route'],
      onClick: TMenuContentItem['onClick'],
    ): TMenuContentItem['onClick'] =>
    (e) => {
      handleCloseMenuContent();

      onClick?.(e);

      if (route) {
        navigate(route);
      }
    };

  return (
    <div
      id={MENU_CONTENT_ID}
      className="absolute hidden min-w-36 top-15 right-3 p-4 text-md font-semibold ring-1 ring-border bg-background space-y-1 rounded-lg"
    >
      {items.map(({ title, route, dividerTop, onClick }) => (
        <div key={title}>
          {dividerTop && <div className="h-0.5 bg-border mb-1" />}

          <Button className="w-full" variant="ghost" onClick={handleMenuClick(route, onClick)}>
            {title}
          </Button>
        </div>
      ))}
    </div>
  );
}

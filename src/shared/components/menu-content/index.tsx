import { useNavigate } from 'react-router-dom';

import IconButton from '../icon-button';

type TMenuContentItem = {
  route?: string;
  onClick?: React.HTMLAttributes<HTMLButtonElement>['onClick'];
  title: string;
  dividerTop?: boolean;
};
type TMenuContentProps = React.HTMLAttributes<HTMLButtonElement> & {
  items: TMenuContentItem[];
};

const MenuContent = ({ items, ...otherPops }: TMenuContentProps) => {
  const navigate = useNavigate();
  const onToogleContentClick = () => {
    const menuList = document.getElementById('menu-content');
    menuList?.classList.toggle('hidden');
  };

  const onMenuClick =
    (route: TMenuContentItem['route'], onClick: TMenuContentItem['onClick']): TMenuContentItem['onClick'] =>
    (e) => {
      if (route) navigate(route);
      onClick?.(e);
    };

  return (
    <>
      <IconButton id="dropdownDefaultButton" icon="ArrowDownLineIcon" onClick={onToogleContentClick} {...otherPops} />

      <div id="menu-content" className="hidden min-w-36 absolute top-14 right-3 rounded-lg bg-neutral-700 p-2">
        <ul className="text-md text-neutral-200 space-y-2" aria-labelledby="dropdownDefaultButton">
          {items.map(({ title, route, dividerTop, onClick }) => (
            <li key={route} className={`${dividerTop ? 'border-t-2 border-teal-800' : ''}`}>
              <button onClick={onMenuClick(route, onClick)}>{title}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MenuContent;

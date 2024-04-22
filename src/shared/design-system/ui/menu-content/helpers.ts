export const MENU_CONTENT_ID = 'menu-content';

export const handleToogleMenuContent = () => {
  const menuList = document.getElementById(MENU_CONTENT_ID);
  menuList?.classList.toggle('hidden');
};

export const handleCloseMenuContent = () => {
  const menuList = document.getElementById(MENU_CONTENT_ID);
  menuList?.classList.add('hidden');
};

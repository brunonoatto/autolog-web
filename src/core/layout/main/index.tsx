import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <main className="bg-neutral-800 px-4">
      <Outlet />
    </main>
  );
};
export default Main;

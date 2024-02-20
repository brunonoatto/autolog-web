import { Link } from 'react-router-dom';

type THomeLink = { isAuthenticated: boolean };
const HomeLink = ({ isAuthenticated }: THomeLink) => {
  return (
    <Link
      to={isAuthenticated ? '/prestador-servico/dashboard' : '/'}
      className="text-2xl font-bold text-neutral-100 rounded-lg border-2 border-teal-500 px-4 py-2 shadow-sm shadow-teal-100 hover:shadow-teal-500"
    >
      AutoLog
    </Link>
  );
};

export default HomeLink;

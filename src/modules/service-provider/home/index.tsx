import { useAuthStore } from '@core/store/hooks';

// TODO: Melhorar o nome do componente
const Home = () => {
  const username = useAuthStore((props) => props.username);

  return <>Olá {username}!</>;
};

export default Home;

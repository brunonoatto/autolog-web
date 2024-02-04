import { Link } from 'react-router-dom';

import styles from './styles.module.css';

const ChoosePerfil = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <div className="mb-6">Selecione o seu Perfil</div>
      <div className="flex justify-around gap-x-8">
        <Link className={styles.link} to="prestador-servico/dashboard">
          Sou Prestador de Serviço
        </Link>
        <Link className={styles.link} to="consulta">
          Consultar Placa
        </Link>
      </div>
    </div>
  );
};

export default ChoosePerfil;

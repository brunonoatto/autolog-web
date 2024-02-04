import LinkButton from '@shared/components/link-button';
import styles from './styles.module.css';

const ChoosePerfil = () => {
  return (
    <div className="flex flex-col items-center p-2 md:p-10">
      <div className="font-bold mb-6">Selecione o Produto desejado</div>
      <div className="flex justify-around gap-x-8">
        <div className={styles.card}>
          <div className={styles.header}>Sistema para mecânicas</div>

          <ul className={styles.infos}>
            <li>Visualização geral dos carros que estão na oficina e facilidade de encontrar informações.</li>
            <li>Gere o Orçamento e envie o link para o cliente revisar e aprovar pelo site.</li>
          </ul>

          <div className={styles.price}>
            Preço: <div className="font-semibold text-teal-400">R$ 99,99 p/ mês</div>
          </div>

          <LinkButton to="cadastro">Quero me cadastrar</LinkButton>
        </div>
        <div className={styles.card}>
          <div className={styles.header}>Consultar Placa</div>

          <ul className={styles.infos}>
            <li>Consulte o histórico de manutenção de um veículo pela placa.</li>
          </ul>

          <div className={styles.price}>
            Preço: <div className="font-bold text-xl text-teal-400">GRÁTIS</div>
          </div>

          <LinkButton to="consulta">Consultar</LinkButton>
        </div>
      </div>
    </div>
  );
};

export default ChoosePerfil;

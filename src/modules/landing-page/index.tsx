import { ROUTES_PATH } from '@core/router/consts';
import Header from '@layout/body-app/header';

import HomeCard from './home-card';

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-2 md:p-10">
        <div className="font-bold mb-6">Selecione o Produto desejado</div>
        <div className="flex justify-around gap-x-2 md:gap-x-4">
          <HomeCard
            title="Sistema para mecânicas"
            infos={[
              'Visualização geral dos carros que estão na oficina e facilidade de encontrar informações.',
              'Gere o Orçamento e envie o link para o cliente revisar e aprovar pelo site.',
            ]}
            price={
              <>
                Preço: <div className="font-semibold text-teal-400">R$ 99,99 p/ mês</div>
              </>
            }
            linkRoute={ROUTES_PATH.garageRegister}
            linkText="Quero me cadastrar"
          />

          <HomeCard
            title="Sistema para clientes"
            infos={[
              'Aprove ou Rejeite os orçamentos on-line.',
              'Organize todas revisões de seu carro em um só lugar.',
              'Consulte o histórico de manutenção de outros veículos pela placa.',
            ]}
            price={
              <>
                Preço: <div className="font-bold text-xl text-teal-400">GRÁTIS</div>
              </>
            }
            linkRoute={ROUTES_PATH.clientRegister}
            linkText="Quero me cadastrar"
          />
        </div>
      </div>
    </>
  );
}

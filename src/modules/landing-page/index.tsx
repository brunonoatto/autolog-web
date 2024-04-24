import Header from '@layout/body-app/header';

import HomeCard from './home-card';

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-2 md:p-10">
        <div className="font-bold mb-6">Selecione o Produto desejado</div>
        <div className="md:flex md:justify-around md:space-y-0 md:gap-x-4 space-y-4">
          <HomeCard
            title="Sistema para mecânicas"
            infos={[
              'Visualização geral dos veículos que estão na oficina e facilidade de encontrar informações.',
              'Gere o Orçamento e envie o link para o cliente revisar e aprovar pelo site.',
            ]}
            price={
              <>
                Preço: <div className="font-semibold text-teal-400">R$ 99,99 p/ mês</div>
              </>
            }
            linkRoute="/cadastro-garagem"
            linkText="Quero me cadastrar"
          />

          <HomeCard
            title="Sistema para clientes"
            infos={[
              'Aprove ou Rejeite os orçamentos on-line.',
              'Organize todas revisões de seu veículo em um só lugar.',
              'Consulte o histórico de manutenção de outros veículos pela placa.',
            ]}
            price={
              <>
                Preço: <div className="font-bold text-xl text-teal-400">GRÁTIS</div>
              </>
            }
            linkRoute="/cadastro-cliente"
            linkText="Quero me cadastrar"
          />
        </div>
      </div>
    </>
  );
}

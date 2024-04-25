export enum ROUTES_PATH {
  landingPage = '/',
  all = '*',
  login = '/login',
  budgetWithoutLogin = '/orcamento',
  budgetApprovedWithoutLogin = '/orcamento-aprovado',
  budgetRejectedWithoutLogin = '/orcamento-rejeitado',
  clientRegister = '/cadastro-cliente',
  garageRegister = '/cadastro-garagem',
  garageHome = '/garage',
  garageBudget = '/garage/orcamento',
  garageBuggetSearch = '/garage/orcamentos',
  garageConsultationLicense = '/garage/consulta-placa',
  clientHome = '/cliente',
  clientBudgets = '/cliente/orcamentos',
  clientBudgetView = '/cliente/orcamento',
  clientConsultationLicense = '/cliente/consulta-placa',
  clientTransfer = '/cliente/transferir',
  clientRegisterCar = '/cliente/cadastrar-veiculo',
}

export type TRoute = `${ROUTES_PATH}`;

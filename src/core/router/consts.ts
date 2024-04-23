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
  garageDashboard = '/garage/dashboard',
  garageBudget = '/garage/orcamento',
  garageBuggetSearch = '/garage/orcamentos',
  garageConsultationLicense = '/garage/consulta-placa',
  clientHome = '/cliente',
  clientBudgetSearch = '/cliente/orcamentos',
  clientBudgetView = '/cliente/orcamento',
  clientConsultationLicense = '/cliente/consulta-placa',
  clientTransfer = '/cliente/transferir',
}

export type TRoute = `${ROUTES_PATH}`;

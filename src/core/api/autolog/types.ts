export type TDashboardItem = {
  license: string;
  brand: string;
  model: string;
  year: number;
  status: number;
};

export type TDashboardItemToAdd = {
  license: string;
  brand: string;
  model: string;
  year: number;
  status: number;
  observation?: string;
};

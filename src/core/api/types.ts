export type TErrorApiData = {
  message: string;
};

export type TRequestData = {
  noShowError: boolean;
};

export type TPaginationResponse<T> = {
  items: T[];
  totalItems: number;
  totalPages: number;
};

export type TPaginationParams = {
  pageNumber?: number;
  pageSize?: number;
};
